export const { register, component, inject, resolve } = makeContainer();

export const session = Symbol();

export const instance = Symbol();

export function makeContainer() {
  const instances = new Map();
  const factories = new Map();
  const options = new Map();

  const register = (Component, factory, opts) => {
    factories.set(Component, factory || defaultFactory(Component));
    instances.set(Component, createInstance(Component));
    options.set(Component, opts);
  };

  const component = (optionsOrDescriptor = {}) => {
    const makeFinisher = options => Component =>
      register(Component, null, options);

    if (isDescriptor(optionsOrDescriptor)) {
      if (optionsOrDescriptor.kind !== "class")
        throw new Error("component can only be used on classes");

      const descriptor = optionsOrDescriptor;

      return { ...descriptor, finisher: makeFinisher() };
    } else {
      const options = optionsOrDescriptor;

      return descriptor => {
        if (descriptor.kind !== "class")
          throw new Error("component can only be used on classes");

        return {
          ...descriptor,
          finisher: makeFinisher(options)
        };
      };
    }
  };

  component.session = desc => component({ lifetime: session })(desc);
  component.instance = desc => component({ lifetime: instance })(desc);

  const resolve = Component => {
    const opts = options.get(Component) || { lifetime: session };

    switch (opts.lifetime) {
      case session:
        return instances.has(Component)
          ? instances.get(Component)
          : createInstance(Component);
      case instance:
        return createInstance(Component);
      default:
        throw new Error(`Invalid lifetime option: ${opts.lifetime}`);
    }
  };

  const inject = Component => element => {
    const { kind, key, initializer } = element;

    if (kind !== "field") throw new Error("Inject can only be used on fields");

    return {
      key,
      initializer,
      kind: "method",
      placement: "own",
      descriptor: {
        enumerable: true,
        get: () => resolve(Component)
      }
    };
  };

  function isDescriptor(obj) {
    return obj[Symbol.toStringTag] === "Descriptor";
  }

  function defaultFactory(Component) {
    return () => new Component();
  }

  function createInstance(Component) {
    try {
      const component = factories.get(Component).call(null);
      return component.value ? component.value : component;
    } catch (e) {
      throw new Error(`Error when creating instance: ${Component.name}\n${e}`);
    }
  }

  return { register, component, inject, resolve };
}

export const { register, component, inject, resolve } = makeContainer();

export const session = Symbol();

export const instance = Symbol();

export function makeContainer() {
  const instances = new Map();
  const factories = new Map();
  const options = new Map();

  const register = (componentKey, factory, opts) => {
    factories.set(componentKey, factory || defaultFactory(componentKey));
    instances.set(componentKey, createInstance(componentKey));
    options.set(componentKey, opts);
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

  const resolve = componentKey => {
    const opts = options.get(componentKey) || { lifetime: session };

    switch (opts.lifetime) {
      case session:
        return instances.has(componentKey)
          ? instances.get(componentKey)
          : createInstance(componentKey);
      case instance:
        return createInstance(componentKey);
      default:
        throw new Error(`Invalid lifetime option: ${opts.lifetime}`);
    }
  };

  const inject = componentKey => element => {
    const { kind, key, initializer } = element;

    if (kind !== "field") throw new Error("Inject can only be used on fields");

    return {
      key,
      initializer,
      kind: "method",
      placement: "own",
      descriptor: {
        enumerable: true,
        get: () => resolve(componentKey)
      }
    };
  };

  function isDescriptor(obj) {
    return obj[Symbol.toStringTag] === "Descriptor";
  }

  function defaultFactory(Component) {
    return () => new Component();
  }

  function createInstance(componentKey) {
    try {
      const component = factories.get(componentKey).call(null);
      return component.value ? component.value : component;
    } catch (e) {
      throw new Error(`Error when creating instance: ${componentKey}\n${e}`);
    }
  }

  return { register, component, inject, resolve };
}

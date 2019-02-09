export const { register, component, inject, resolve } = makeContainer();

export function makeContainer() {
  const instances = new Map();
  const factories = new Map();

  const register = (Component, factory, options = {}) => {
    factories.set(Component, factory || defaultFactory(Component));
    instances.set(Component, createInstance(Component));
  };

  const component = (optionsOrDescriptor = {}) => {
    const makeFinisher = options => Component => register(Component, options);

    const descriptor = { ...optionsOrDescriptor, finisher: makeFinisher() };

    const decorator = descriptor => {
      if (descriptor.kind !== "class")
        throw new Error("component can only be used on classes");

      return {
        ...descriptor,
        finisher: makeFinisher(optionsOrDescriptor)
      };
    };

    if (isDescriptor(optionsOrDescriptor)) {
      if (optionsOrDescriptor.kind !== "class")
        throw new Error("component can only be used on classes");
      return descriptor;
    } else {
      return decorator;
    }
  };

  const resolve = Component => {
    return instances.has(Component)
      ? instances.get(Component)
      : createInstance(Component);
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
      throw new Error(`Unknown component: ${Component.name}`);
    }
  }

  return { register, component, inject, resolve };
}

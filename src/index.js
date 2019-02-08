export const { register, component, inject, get } = makeContainer();

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

    const decorator = descriptor => ({
      ...descriptor,
      finisher: makeFinisher(optionsOrDescriptor)
    });

    return isDescriptor(optionsOrDescriptor) ? descriptor : decorator;
  };

  const get = Component => {
    if (!instances.has(Component))
      throw new Error(`Unknown component: ${Component.name}`);
    return instances.get(Component);
  };

  const inject = Component => element => {
    const { key, initializer } = element;

    return {
      key,
      initializer,
      kind: "method",
      placement: "own",
      descriptor: {
        enumerable: true,
        get: () =>
          instances.has(Component)
            ? instances.get(Component)
            : createInstance(Component)
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

  return { register, component, inject, get };
}

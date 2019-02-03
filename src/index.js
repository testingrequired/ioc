export const { register, component, inject, get } = makeContainer();

export function makeContainer() {
  const instances = new Map();
  const factories = new Map();

  const register = Component => {
    factories.set(Component, defaultFactory(Component));
    instances.set(Component, createInstance(Component));
  };

  const component = (optionsOrDescriptor = {}) => {
    const finisher = Component => register(Component);

    const descriptor = { ...optionsOrDescriptor, finisher };
    const decorator = descriptor => ({ ...descriptor, finisher });

    return isDescriptor(optionsOrDescriptor) ? descriptor : decorator;
  };

  const get = Component => {
    if (!instances.has(Component))
      throw new Error(`Unknown component: ${Component.name}`);
    return instances.get(Component);
  };

  const inject = Component => descriptor => ({
    ...descriptor,
    initializer: () =>
      instances.has(Component)
        ? instances.get(Component)
        : createInstance(Component)
  });

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

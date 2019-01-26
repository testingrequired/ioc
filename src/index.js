export const { component, inject } = makeContainer();

export function makeContainer() {
  const instances = new Map();
  const factories = new Map();

  const component = descriptor => ({
    ...descriptor,
    finisher: Component => {
      factories.set(Component, defaultFactory(Component));
      instances.set(Component, createInstance(Component));
    }
  });

  const inject = Component => descriptor => ({
    ...descriptor,
    initializer: () =>
      instances.has(Component)
        ? instances.get(Component)
        : createInstance(Component)
  });

  function defaultFactory(Component) {
    return () => new Component();
  }

  function createInstance(Component) {
    const component = factories.get(Component).call(null);
    return component.value ? component.value : component;
  }

  return { component, inject };
}

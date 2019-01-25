const container = new Map();

export const component = descriptor => {
  const finisher = Component => {
    const component = new Component();

    const componentValue = component.value ? component.value : component;

    container.set(Component, componentValue);
  };

  return { ...descriptor, finisher };
};

export const inject = Component => descriptor => {
  const initializer = () => {
    if (container.has(Component)) return container.get(Component);
    throw new Error(`Unknown component: ${Component.name}`);
  };

  return { ...descriptor, initializer };
};

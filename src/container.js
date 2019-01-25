const container = new Map();

export const inject = Component => descriptor => {
  const initializer = () => {
    if (container.has(Component)) return container.get(Component);

    const component = new Component();

    const componentValue = component.value ? component.value : component;

    container.set(Component, componentValue);
    return componentValue;
  };

  return { ...descriptor, initializer };
};

const container = new Map();

export const component = descriptor => descriptor;

export const inject = Component => descriptor => {
  const initializer = () => {
    if (container.has(Component)) return container.get(Component);

    const component = new Component();
    container.set(Component, component);
    return component;
  };

  return { ...descriptor, initializer };
};

const container = new Map();

export const component = descriptor => {
  const { kind, elements } = descriptor;
  const newDescriptor = { kind, elements };
  return newDescriptor;
};

export const inject = Component => descriptor => {
  const initializer = () => {
    if (container.has(Component)) return container.get(Component);

    const component = new Component();
    container.set(Component, component);
    return component;
  };

  const newDescriptor = { ...descriptor, initializer };
  return newDescriptor;
};

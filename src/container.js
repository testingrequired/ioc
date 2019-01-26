const container = new Map();

export const component = descriptor => {
  return {
    ...descriptor,
    finisher: Component => {
      container.set(Component, getComponentOrValue(new Component()));
    }
  };
};

export const inject = Component => descriptor => {
  const initializer = () =>
    container.has(Component)
      ? container.get(Component)
      : getComponentOrValue(new Component());

  return { ...descriptor, initializer };
};

function getComponentOrValue(component) {
  return component.value ? component.value : component;
}

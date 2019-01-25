const container = new Map();

export const component = descriptor => {
  const { kind, elements } = descriptor;
  const newDescriptor = { kind, elements };
  return newDescriptor;
};

export const inject = Component => descriptor => {
  const initializer = () => new Component();
  const newDescriptor = { ...descriptor, initializer };
  return newDescriptor;
};

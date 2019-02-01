import { makeContainer } from "./index";

describe("get", () => {
  test("should return instance of registered component", () => {
    const { component, get } = makeContainer();

    @component
    class TestComponent {}

    expect(get(TestComponent)).toBeInstanceOf(TestComponent);
  });

  test("should throw if component isn't registered", () => {
    const { get } = makeContainer();

    class TestComponent {}

    expect(() => get(TestComponent)).toThrow(
      "Unknown component: TestComponent"
    );
  });
});

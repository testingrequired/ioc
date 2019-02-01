import { makeContainer } from "./index";

describe("container", () => {
  let container;

  beforeEach(() => {
    container = makeContainer();
  });

  describe("get", () => {
    test("should return instance of registered component", () => {
      @container.component
      class TestComponent {}

      expect(container.get(TestComponent)).toBeInstanceOf(TestComponent);
    });

    test("should throw if component isn't registered", () => {
      class TestComponent {}

      expect(() => container.get(TestComponent)).toThrow(
        "Unknown component: TestComponent"
      );
    });
  });
});

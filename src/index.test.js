import { makeContainer } from "./index";

test("should work", () => {
  const { component, get } = makeContainer();

  @component
  class TestComponent {}

  expect(get(TestComponent)).toBeInstanceOf(TestComponent);
});

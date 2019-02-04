import { makeContainer } from "./index";

describe("container", () => {
  let container;

  beforeEach(() => {
    container = makeContainer();
  });

  describe("get", () => {
    class Component {}

    describe("registered component", () => {
      beforeEach(() => {
        container.register(Component);
      });

      it("returns instance of component", () => {
        expect(container.get(Component)).toBeInstanceOf(Component);
      });
    });

    describe("unregistered component", () => {
      it("throws an error", () => {
        expect(() => container.get(Component)).toThrow();
      });
    });
  });

  describe("component", () => {
    it("should make component available to get", () => {
      @container.component
      class Component {}

      expect(container.get(Component)).toBeInstanceOf(Component);
    });
  });

  describe("register", () => {
    it("should make component available to get", () => {
      class Component {}

      container.register(Component);

      expect(container.get(Component)).toBeInstanceOf(Component);
    });
  });

  describe("inject", () => {
    it("should provide instance of child component to parent", () => {
      @container.component
      class Child {}

      @container.component
      class Parent {
        @container.inject(Child) child;
      }

      expect(container.get(Parent).child).toBeInstanceOf(Child);
    });

    it("should work when parent is defined before child", () => {
      class Child {}

      @container.component
      class Parent {
        @container.inject(Child) child;
      }

      container.register(Child);

      expect(container.get(Parent).child).toBeInstanceOf(Child);
    });
  });
});

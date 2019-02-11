import { makeContainer } from "./index";

describe("container", () => {
  let container;

  beforeEach(() => {
    container = makeContainer();
  });

  describe("resolve", () => {
    class Component {}

    describe("registered component", () => {
      beforeEach(() => {
        container.register(Component);
      });

      it("returns instance of component", () => {
        expect(container.resolve(Component)).toBeInstanceOf(Component);
      });

      describe("lifetime", () => {
        describe("session", () => {
          it("should resolve same instance each time", () => {
            @container.component
            class Component {}

            const component = container.resolve(Component);
            const component2 = container.resolve(Component);

            expect(component).toBeInstanceOf(Component);
            expect(component2).toBeInstanceOf(Component);
            expect(component2).toBe(component);
          });
        });

        describe("instance", () => {
          it("should resolve same instance each time", () => {
            @container.component.instance
            class Component {}

            const component = container.resolve(Component);
            const component2 = container.resolve(Component);

            expect(component).toBeInstanceOf(Component);
            expect(component2).toBeInstanceOf(Component);
            expect(component2).not.toBe(component);
          });
        });
      });
    });

    describe("unregistered component", () => {
      it("throws an error", () => {
        expect(() => container.resolve(Component)).toThrow();
      });
    });
  });

  describe("component", () => {
    it("should throw if not used on class", () => {
      expect(() => {
        class Component {
          @container.component child;
        }
      }).toThrow("component can only be used on classes");
    });

    it("should throw if not used on class with options", () => {
      expect(() => {
        class Component {
          @container.component() child;
        }
      }).toThrow("component can only be used on classes");
    });

    it("should make component available to resolve", () => {
      @container.component
      class Component {}

      expect(container.resolve(Component)).toBeInstanceOf(Component);
    });
  });

  describe("register", () => {
    it("should make component available to resolve", () => {
      class Component {}

      container.register(Component);

      expect(container.resolve(Component)).toBeInstanceOf(Component);
    });

    it("should accept a factory function", () => {
      class Component {}

      class OtherComponent {}

      container.register(Component, () => new OtherComponent());

      expect(container.resolve(Component)).toBeInstanceOf(OtherComponent);
    });

    describe("fn", () => {
      it("should register a function with components", () => {
        @container.component
        class Component {}

        const componentFn = container.register.fn(
          [Component],
          component => component
        );

        expect(container.resolve(componentFn).call(null)).toBeInstanceOf(
          Component
        );
      });
    });
  });

  describe("inject", () => {
    it("should throw if not used on fields", () => {
      expect(() => {
        @container.inject()
        class Child {}
      }).toThrow("Inject can only be used on fields");
    });

    it("should provide instance of child component to parent", () => {
      @container.component
      class Child {}

      @container.component
      class Parent {
        @container.inject(Child) child;
      }

      expect(container.resolve(Parent).child).toBeInstanceOf(Child);
    });

    it("should work when parent is defined before child", () => {
      class Child {}

      @container.component
      class Parent {
        @container.inject(Child) child;
      }

      container.register(Child);

      expect(container.resolve(Parent).child).toBeInstanceOf(Child);
    });

    it("should work when overriding register", () => {
      @container.component
      class Child {}

      @container.component
      class Parent {
        @container.inject(Child) child;
      }

      container.resolve(Parent).child;

      expect(container.resolve(Parent).child).toBeInstanceOf(Child);

      class Sibling {}

      container.register(Child, () => new Sibling());

      expect(container.resolve(Parent).child).toBeInstanceOf(Sibling);
    });
  });
});

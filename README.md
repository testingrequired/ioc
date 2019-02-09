# Ject

A simple dependency injection implementation.

## Installation

```bash
$ npm i @testingrequired/ject
```

## API

### component

Register a class as an injectable component.

```javascript
import { component } from "@testingrequired/ject";

@component
class Foo {}
```

#### component(options = {})

Pass options while registering a component.

```javascript
import { component } from "@testingrequired/ject";

@component({})
class Foo {}
```

#### Initialization

Components are initialized once and shared.

### register(Component, [factory, [options = {}]])

Register a class as a component.

```javascript
import { register } from "@testingrequired/ject";

class Foo {}

register(Foo);
```

### resolve(Component)

Return instance of component.

```javascript
import { resolve } from "@testingrequired/ject";

const foo = resolve(Foo);
```

### inject(Component)

Injects initialized component.

```javascript
import { inject } from "@testingrequired/ject";

class Bar {
  @inject(Foo) foo;
}
```

### makeContainer

Create a container to manage components.

```javascript
import { makeContainer } from "@testingrequired/ject";

const container = makeContainer();

@container.component
class Foo {}

class Bar {
  @container.inject(Foo) foo;
}
```

## Testing

A container's register function can be passed a custom factory even after dependency resolution. This factory can return a mock/spy/stub.

```javascript
import { makeContainer } from "@testingrequired/ject";

const container = makeContainer();

@container.component
class Child {}

class Parent {
  @container.inject(Child) child;
}

class Sibling {}

container.register(Child, () => new Sibling());

const parent = containter.resolve(Parent);

parent.child instanceof Sibling === true;
```

## Example

See the [working example](example/README.md)

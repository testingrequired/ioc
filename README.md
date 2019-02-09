# @testingrequired/ioc

A simple dependency injection implementation.

## Installation

```bash
$ npm i @testingrequired/ioc
```

## API

### register(Component, [factory, [options = {}]])

Register a class as a component.

```javascript
import { register } from "@testingrequired/ioc";

class Foo {}

register(Foo);
```

#### Options

##### Lifetime

There are two lifetime options: `session` (one instance for every resolve) & `instance` (new instance on each resolve).

```javascript
import { register, session, instance } from "@testingrequired/ioc";

class Singleton {}

register(Singleton, null, { lifetime: session });

class NewEveryTime {}

register(NewEveryTime, null, { lifetime: instance });
```

### resolve(Component)

Return instance of component.

```javascript
import { resolve } from "@testingrequired/ioc";

const foo = resolve(Foo);
```

### component

Register a class as an injectable component.

```javascript
import { component } from "@testingrequired/ioc";

@component
class Foo {}
```

#### component(options = {})

Pass options while registering a component.

```javascript
import { component } from "@testingrequired/ioc";

@component({})
class Foo {}
```

##### Options

###### Lifetime

There are two lifetime options: `session` (one instance for every resolve) & `instance` (new instance on each resolve).

```javascript
import { component, session, instance } from "@testingrequired/ioc";

@component({ lifetime: session })
class Singleton {}

// same as:

@component.session
class Singleton {}

// ---

@component({ lifetime: instance })
class NewEveryTime {}

// same as:

@component.instance
class NewEveryTime {}
```

### inject(Component)

Injects initialized component.

```javascript
import { inject } from "@testingrequired/ioc";

class Bar {
  @inject(Foo) foo;
}
```

### makeContainer

Create a container to manage components.

```javascript
import { makeContainer } from "@testingrequired/ioc";

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
import { makeContainer } from "@testingrequired/ioc";

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

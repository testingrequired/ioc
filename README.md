[![Build Status](https://travis-ci.org/testingrequired/ioc.svg?branch=master)](https://travis-ci.org/testingrequired/ioc)

# @testingrequired/ioc

A simple dependency injection implementation.

## Installation

```bash
$ npm i @testingrequired/ioc
```

## Getting Started

### Components

Define components with the `component` decorator.

#### Example

```javascript
import { component, register } from "@testingrequired/ioc";

@component
class Component {}
```

#### Register Example

Components can also be defined using the `register` function for more control.

```javascript
import { component, register, instance } from "@testingrequired/ioc";

class RandomEachTime {}

register(
  RandomEachTime,
  () => {
    const component = new RandomEachTime();
    component.value = Math.floor(Math.random() * (10000 - 0) + 0);
    return component;
  },
  { lifetime: instance }
);
```

### Dependencies

The `inject` function defines a dependency to a component.

```javascript
import { component, inject, resolve } from "@testingrequired/ioc";

@component
class Child {}

@component
class Parent {
  @inject(Child) child;
}

const parent = resolve(Parent);

parent.child instanceof Child === true;
```

## Example

See the [working example](example/README.md)

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

## Development

### build

Build project in to `dist`

```bash
$ npm run build
```

#### watch

Build project when files change.

```bash
$ npm run build -- -w
```

### test

Run tests

```bash
npm run test
```

### example

Run example app.

This will use current build in `dist`.

```bash
$ npm run example
```

## API

### register(componentKey, [factory, [options = {}]])

Register a class as a component.

```javascript
import { register } from "@testingrequired/ioc";

class Foo {}

register(Foo);
```

#### component

The class, string or symbol used to identify the component.

#### factory

Function to be called when creating instance of component. This defaults to calling `new` on component.

#### options

##### lifetime

There are two lifetime options: `session` (one instance for every resolve) & `instance` (new instance on each resolve).

```javascript
import { register, session, instance } from "@testingrequired/ioc";

class Singleton {}

register(Singleton, null, { lifetime: session });

class NewEveryTime {}

register(NewEveryTime, null, { lifetime: instance });
```

### resolve(componentKey)

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

### inject(componentKey)

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

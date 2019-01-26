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

#### Initialization

Components are initialized once and shared.

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

## Example

```javascript
// database.js
import { component } from "@testingrequired/ject";

@component
class Database {
  // ... implementation
}

// logger.js
import { component } from "@testingrequired/ject";

@component
class Logger {
  // ... implementation
}

// config.js
import { component } from "@testingrequired/ject";

@component
class Config {
  get value() {
    return import("./config.json");
  }
}

// app.js
import { inject } from "@testingrequired/ject";
import Database from "./database";
import Logger from "./logger";
import Config from "./config";

class App {
  @inject(Database) db;
  @inject(Logger) log;
  @inject(Config) config;

  async start() {
    const results = await this.db.query(/* some query */);
    this.log.info(results);
  }
}
```

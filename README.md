# Ject

## Example

```javascript
// database.js
import { component } from "ject";

@component
class Database {
  // ... implementation
}

// logger.js
import { component } from "ject";

@component
class Logger {
  // ... implementation
}

// config.js
import { component } from "ject";

@component
class Config {
  get value() {
    return import("./config.json");
  }
}

// app.js
import { inject } from "ject";
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

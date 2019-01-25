# Ject

## Example

```javascript
// database.js
class Database {
  // ... implementation
}

// logger.js
class Logger {
  // ... implementation
}

// config.js
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

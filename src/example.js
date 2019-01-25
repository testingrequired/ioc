import { component, inject } from ".";

@component
class Config {
  greeting = "Hello";
  name = "World!!";
}

@component
class Greeting {
  @inject(Config) config;

  get value() {
    return this.config.greeting;
  }
}

@component
class Name {
  @inject(Config) config;

  get value() {
    return this.config.name;
  }
}

class App {
  @inject(Greeting) greeting;
  @inject(Name) name;

  greet() {
    console.log(`${this.greeting.value}, ${this.name.value}`);
  }
}

const app = new App();

app.greet();

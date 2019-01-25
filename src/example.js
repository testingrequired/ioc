import { inject } from ".";

class Greeting {
  get value() {
    return "Hello";
  }
}

class Name {
  get value() {
    return "World";
  }
}

class Message {
  @inject(Greeting) greeting;
  @inject(Name) name;

  get value() {
    return `${this.greeting}, ${this.name}`;
  }
}

class App {
  @inject(Message) message;

  greet() {
    console.log(this.message);
  }
}

const app = new App();

app.greet();

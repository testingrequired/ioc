import { inject, component } from ".";

@component
class RandomNumbers {
  get value() {
    return Math.floor(Math.random() * (10000 - 0) + 0);
  }
}

@component
class Greeting {
  get value() {
    return "Hello";
  }
}

@component
class Name {
  get value() {
    return "World";
  }
}

@component
class Message {
  @inject(Greeting) greeting;
  @inject(Name) name;

  get value() {
    return `${this.greeting}, ${this.name}`;
  }
}

class App {
  @inject(Message) message;
  @inject(RandomNumbers) random;
  @inject(RandomNumbers) random2;

  greet() {
    console.log(this.message, this.random, this.random2);
  }
}

const app = new App();

app.greet();

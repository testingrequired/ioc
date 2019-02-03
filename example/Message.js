import { inject, component } from "../src/index";
import Greeting from "./Greeting";
import Name from "./Name";

@component
export default class Message {
  @inject(Greeting) greeting;
  @inject(Name) name;

  get value() {
    return `${this.greeting}, ${this.name}`;
  }
}

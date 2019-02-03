import { inject, component } from "../src/index";
import RandomNumbers from "./RandomNumbers";
import Message from "./Message";

@component
export default class App {
  @inject(Message) message;
  @inject(RandomNumbers) random;
  @inject(RandomNumbers) random2;

  greet() {
    console.log(this.message, this.random, this.random2);
  }
}

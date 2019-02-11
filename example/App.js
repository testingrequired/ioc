import { inject, component } from "../src/index";
import RandomNumbers from "./RandomNumbers";
import RandomNumber from "./RandomNumber";
import Message from "./Message";

@component
export default class App {
  @inject(Message) message;
  @inject(RandomNumbers) random;
  @inject(RandomNumbers) random2;
  @inject(RandomNumber) randomNumber;
  @inject(RandomNumber) randomNumber2;

  greet() {
    console.log(
      this.message(),
      this.random,
      this.random2,
      this.randomNumber,
      this.randomNumber2
    );
  }
}

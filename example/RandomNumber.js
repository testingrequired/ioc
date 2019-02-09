import { inject, component } from "../src/index";
import RandomNumbers from "./RandomNumbers";

@component
export default class RandomNumber {
  @inject(RandomNumbers) random;

  get value() {
    return this.random;
  }
}

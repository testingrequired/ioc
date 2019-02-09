import { component } from "../src/index";

@component.instance
export default class RandomNumbers {
  get value() {
    return Math.floor(Math.random() * (10000 - 0) + 0);
  }
}

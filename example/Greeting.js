import { component } from "../src/index";

@component
export default class Greeting {
  get value() {
    return "Hello";
  }
}

import { register } from "../src/index";

export default class RandomNumbers {
  get value() {
    return Math.floor(Math.random() * (10000 - 0) + 0);
  }
}

register(RandomNumbers);

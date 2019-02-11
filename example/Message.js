import { register } from "../src/index";
import Greeting from "./Greeting";
import Name from "./Name";

export default register.fn(
  [Greeting, Name],
  (greeting, name) => `${greeting}, ${name}`
);

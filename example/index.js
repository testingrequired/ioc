import { resolve, register } from "../src/index";
import Name from "./Name";
import App from "./App";

class NewName {
  get value() {
    return "Bob";
  }
}

register(Name, () => new NewName());

const app = resolve(App);

app.greet();

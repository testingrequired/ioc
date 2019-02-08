import { get, register } from "../src/index";
import Name from "./Name";
import App from "./App";

class NewName {
  get value() {
    return "Bob";
  }
}

register(Name, { factory: () => new NewName() });

const app = get(App);

app.greet();

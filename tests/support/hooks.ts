import { Before, After } from "@cucumber/cucumber";

Before(async function () {
  await this.init(); // calls init from CustomWorld
});

After(async function () {
  await this.close(); // calls close from CustomWorld
});

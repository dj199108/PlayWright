import { expect, Locator, Page } from "@playwright/test";



export class LoginPageLocator {
  private readonly usernameTextbox: Locator;
  private readonly passwordTextbox: Locator;
  private readonly loginButton: Locator;
  private readonly shoppinCartIcon: Locator;

  constructor(page: Page) {
    this.usernameTextbox = page.getByRole("textbox", { name: "Username" });
    this.passwordTextbox = page.getByRole("textbox", { name: "Password" });
    this.loginButton = page.getByRole("button", { name: "Login" });
    this.shoppinCartIcon = page.locator(".shopping_cart_container")
  }
  
  async fillUsername(username: string) {
    await this.usernameTextbox.fill(username)
  }
  async fillPassword(password: string) {
    await this.passwordTextbox.fill(password)
  }
  async ClickOnLogin() {
    await this.loginButton.click();
  }

  async loginWithCredentials(username: string, password: string) {
    await this.usernameTextbox.fill(username)
    await this.passwordTextbox.fill(password)
    await this.loginButton.click();
  }

  async checkSuccessfulLogin(){
    await expect(this.shoppinCartIcon).toBeVisible()
  }
}

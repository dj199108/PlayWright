import { test, expect } from "@playwright/test";
import exp from "constants";

test("prueba1", async ({ page }) => {
  await page.goto("https://www.mercadolibre.com.co/#from=homecom");
  await page
    .locator("//input[@id='cb1-edit']")
    .fill("Apple iPhone 16 (128 GB) - Verde azulado - Distribuidor Autorizado");
  await page.keyboard.press("Enter");
  await expect(
    page.locator(
      "//a[contains(text(),'Apple iPhone 16 (128 GB) - Verde azulado - Distrib')]"
    )
  ).toBeVisible();
  await page
    .locator(
      "//a[contains(text(),'Apple iPhone 16 (128 GB) - Verde azulado - Distrib')]"
    )
    .click();
  await page.pause();
});


test("prueba de listas", async({page})=>{
await page.goto("https://www.mercadolibre.com.co/#from=homecom");
await page
    .locator("//input[@id='cb1-edit']")
    .fill("iPhone");
  await page.keyboard.press("Enter");


await expect(page.locator("//body/main[@id='root-app']/div[1]/div[3]/section[1]")).toBeVisible();
await page.pause();

const list = await page.locator("//body/main[@id='root-app']/div[1]/div[3]/section[1]/ol[1]").allInnerTexts()

console.log ("the list is: ", list.length);
for(let lista of list){
  console.log("the offer services is: ", list);
}

});
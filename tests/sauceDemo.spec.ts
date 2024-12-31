import { test, expect } from "@playwright/test";
import { get } from "http";
import { LoginPageLocator } from "./pageObjects/Login/LoginPage";

test("carritoCompras", async ({ page }, testInfo) => {
  await page.goto(process.env.URL);
  const Login = new LoginPageLocator(page);
  await testInfo.attach('Login', {
    body: await page.screenshot(),
    contentType: 'image/png'
  })

  await Login.loginWithCredentials("standard_user", "secret_sauce")

  
  await Login.checkSuccessfulLogin()


  /*await Login.fillUsername("sandar_user");
  await Login.fillPassword("secret_sauce");
  await Login.ClickOnLogin();*/



  //Devuelve todos los elementos que aparecen en el contenedor!!!
  const itemsContainer = await page
    .locator("#inventory_container .inventory_item")
    .all();

  //Función para calcuilar un numero Ramdom basado en la longitud del contenedor
  const randomIndex = Math.floor(Math.random() * itemsContainer.length);

  //Enterega el iten encontrado
  const randomProduct = itemsContainer[randomIndex];

  //Obtine el Nonbre del producto
  const expectName = await randomProduct
    .locator(".inventory_item_name ")
    .innerText();

  //Obtine la descripción del producto
  const expectDescriptions = await randomProduct
    .locator(".inventory_item_desc")
    .innerText();

  await testInfo.attach('descripciòn', {
    body: await page.screenshot(),
    contentType: 'image/png'
  })
  /*
  //Captura de pantalla parte visible 
  await page.screenshot({ path: "screenshots/descritions.png" })
  //Captura de pantalla completa
  await page.screenshot({ path: "screenshots/descritions2.png", fullPage: true })
  */

  //Obtine el precio del producto
  const expectPrice = await randomProduct
    .locator(".inventory_item_price")
    .innerText();

  //Imprime el producto y sus descripción
  console.log(
    `Nombre del producto: ${expectName} Descripción del producto: ${expectDescriptions} Precio del producto ${expectPrice}`
  );
  //Agrega el producto al carrito
  await randomProduct.getByRole("button", { name: "Add to cart" }).click();
  //Va al carrito
  await page.locator("#shopping_cart_container").click();

  // Validación que el Btn checkout sea visible
  expect(page.locator("#checkout")).toBeVisible();

  //obtención de productos dentro del carrito
  const actualName = await page.locator(".inventory_item_name").innerText();
  const actualDescriptions = await page
    .locator(".inventory_item_desc")
    .innerText();
  const actualPrice = await page.locator(".inventory_item_price").innerText();

  //comparación de productos
  expect(actualName).toEqual(expectName);
  expect(actualDescriptions).toEqual(expectDescriptions);
  expect(actualPrice).toEqual(expectPrice);
});

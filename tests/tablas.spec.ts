import { test, expect } from "@playwright/test";


test('test para extraer info de tablas', async ({ page }) => {
    await page.goto('https://cosmocode.io/automation-practice-webtable/');

    //captura la tabla que se comvertira en el contenedor 
    const tableContainer = await page.locator("xpath=//table[@id='countries']")

    //saca dentro del contenedor todos los tr que contenga almacenandolos en el rows 
    const rows = await tableContainer.locator("xpath=.//tr").all()

    //Almacena en una lista todos los paises 
    const countries: Country[] = []

    //saca la longitud 
    console.log(rows.length)
    for (let row of rows) {
        let country: Country = {
            name: await row.locator("xpath=.//td[2]").innerText(),
            capital: await row.locator("xpath=.//td[3]").innerText(),
            currency: await row.locator("xpath=.//td[4]").innerText(),
            primaryLanguage: await row.locator("xpath=.//td[5]").innerText()
        }
        countries.push(country)
    }

    /*for (let countiresTotal of countries){
        console.log(countiresTotal)
    }*/


    //filtros 
    const countryWherePeopleSpeakSpanish = countries.filter(country => country.primaryLanguage === "Spanish")

    console.log("los paises que hablan español son: ", countryWherePeopleSpeakSpanish)


    /*
    //sobre cada fila itera y saca el texto 
    for (let row of rows){
        console.log(await row.innerText())
    }*/

    // Saca el primer dato 
    /* const row1 = rows.at(1)
 
     const countryName = await row1?.locator ("xpath=.//td[2]").innerText()
     const countryCapital = await row1?.locator ("xpath=.//td[3]").innerText()
     const countryCurrency = await row1?.locator ("xpath=.//td[4]").innerText()
 
 console.log (countryName,countryCapital,countryCurrency)*/

});

interface Country {
    name: string
    capital: string
    currency: string
    primaryLanguage: string

}

////table[@id='countries']//tr[2]//td[2]




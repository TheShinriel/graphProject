import { test, expect, Locator } from "@playwright/test"

let weightInput: Locator
let hypotheticDosisInput: Locator
let calculateDoseButton: Locator
let calculateDoseResult: Locator
test.beforeEach(async ({ page }) => {
  weightInput = page.locator(".calc-dose__weight")
  hypotheticDosisInput = page.locator(".calc-dose__hypothetic_dosis")
  calculateDoseButton = page.locator(".calc-dose__btn")
  calculateDoseResult = page.locator(".calc-dose__result")

  await page.goto("http://localhost:3000/")
})

test("Calculate dose", async ({ page }) => {
  await expect(weightInput).toBeVisible()
  await weightInput.click()
  await page.keyboard.type("90")

  await expect(hypotheticDosisInput).toBeVisible()
  await hypotheticDosisInput.click()
  await page.keyboard.type("10")

  await expect(calculateDoseButton).toBeVisible()
  await calculateDoseButton.click()

  await expect(calculateDoseResult).toBeVisible()
  await expect(calculateDoseResult).toHaveText(
    "La dose ingérée est donc 111 mg/kg."
  )
})

test("Disabled dose button if no value", async ({ page }) => {
  await expect(calculateDoseButton).toBeDisabled()

  await weightInput.click()
  await page.keyboard.type("50")

  await expect(calculateDoseButton).toBeDisabled()

  await weightInput.click()
  await weightInput.clear()

  await hypotheticDosisInput.click()
  await page.keyboard.type("10")

  await expect(calculateDoseButton).toBeDisabled()

  await weightInput.click()
  await page.keyboard.type("50")

  await expect(calculateDoseButton).toBeEnabled()
})

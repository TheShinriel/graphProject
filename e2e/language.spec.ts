import { test, expect } from "@playwright/test"

test("Calculate dose", async ({ page }) => {
  await page.goto("http://localhost:3000/")

  const mainTitle = page.locator("#jumbotron")

  await expect(mainTitle).toContainText("HopiTox, qu'est ce que c'est ?")

  await page.getByRole("button", { name: "English" }).click()
  await expect(mainTitle).toContainText("HopiTox, what is it ?")

  await page.getByRole("button", { name: "Français" }).click()
  await expect(mainTitle).toContainText("HopiTox, qu'est ce que c'est ?")
})

import { test, expect } from '@playwright/test'

test('has title', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/Russell Saint Cyr/)
})

test('navigation links are visible', async ({ page }) => {
  await page.setViewportSize({ width: 1200, height: 800 })
  await page.goto('/')
  await expect(page.locator('text=Home')).toBeVisible()
  await expect(page.locator('text=Projects')).toBeVisible()
  await expect(page.locator('text=About')).toBeVisible()
})

test('can navigate to projects section', async ({ page }) => {
  await page.setViewportSize({ width: 1200, height: 800 })
  await page.goto('/')
  await page.click('a[href="#projects"]')
  await expect(page.locator('text=Featured Projects')).toBeVisible()
})

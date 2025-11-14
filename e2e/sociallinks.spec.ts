import { test, expect } from '@playwright/test'

test.describe('SocialLinks', () => {
  test('GitHub link has correct href', async ({ page }) => {
    await page.goto('/')
    const githubLink = page.locator('a[href="https://github.com/russellsaintcyr"]')
    await expect(githubLink).toBeVisible()
    await expect(githubLink).toHaveAttribute('target', '_blank')
    await expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  test('LinkedIn link has correct href', async ({ page }) => {
    await page.goto('/')
    const linkedinLink = page.locator('a[href="https://www.linkedin.com/in/russellsaintcyr/"]')
    await expect(linkedinLink).toBeVisible()
    await expect(linkedinLink).toHaveAttribute('target', '_blank')
    await expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  test('social links open in new tab', async ({ context, page }) => {
    await page.goto('/')
    
    // Listen for new page (popup)
    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      page.click('a[href="https://github.com/russellsaintcyr"]'),
    ])
    
    // Verify the new page opened with correct URL
    expect(newPage.url()).toContain('github.com/russellsaintcyr')
    await newPage.close()
  })

  test('all social links are present in header', async ({ page }) => {
    await page.goto('/')
    const header = page.locator('header')
    expect(await header.locator('a[href="https://github.com/russellsaintcyr"]').count()).toBe(1)
    expect(await header.locator('a[href="https://www.linkedin.com/in/russellsaintcyr/"]').count()).toBe(1)
  })

  test('all social links are present in footer', async ({ page }) => {
    await page.goto('/')
    const footer = page.locator('footer')
    expect(await footer.locator('a[href="https://github.com/russellsaintcyr"]').count()).toBe(1)
    expect(await footer.locator('a[href="https://www.linkedin.com/in/russellsaintcyr/"]').count()).toBe(1)
  })
})

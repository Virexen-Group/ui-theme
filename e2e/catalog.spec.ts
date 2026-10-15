import {test,expect} from '@playwright/test';
test('homepage links to canonical categories',async({page})=>{await page.goto('/');for(const route of ['/forms.html','/navigation.html','/data.html','/layout.html','/commerce.html','/foundations.html'])await expect(page.locator(`a[href="${route}"]`).first()).toBeVisible();});
test('smart and validation redirects to forms',async({page})=>{await page.goto('/smart.html');await expect(page).toHaveURL(/forms\.html/);await page.goto('/validation.html');await expect(page).toHaveURL(/forms\.html/);});
test('uploader renders full drop zone',async({page})=>{await page.goto('/forms.html');await expect(page.locator('text=File upload').first()).toBeVisible();await expect(page.locator('.vx-filemanager__drop').first()).toBeVisible();});

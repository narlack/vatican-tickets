import {test, expect, Page} from '@playwright/test';

const NUMBER_OF_TICKETS = 2;

function getURLToVatican(date: string): string {
  const timestamp = new Date(date).valueOf()
  return `https://tickets.museivaticani.va/home/fromtag/${NUMBER_OF_TICKETS}/${timestamp}/Biglietti-Musei`
}

async function checkTickets(page: Page, date: string): void {
  await page.goto(getURLToVatican(date));

  const admissionTicketsButton = await page.getByTestId("bookTicket_26");

  await expect(admissionTicketsButton).toBeDisabled();
}

test('Vatican tickets for 1 August', async ({ page }) => {
  await checkTickets(page, '2023-08-01T24:00:00');
});

test('Vatican tickets for 2 August', async ({ page }) => {
  await checkTickets(page, '2023-08-02T24:00:00');
});

test('Vatican tickets for 3 August', async ({ page }) => {
  await page.goto(getURLToVatican('2023-08-03T24:00:00'));
});


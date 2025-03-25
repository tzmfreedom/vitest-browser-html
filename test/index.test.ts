import { expect, test } from 'vitest';
import { render, renderString, renderFile } from '../src';
import { page } from '@vitest/browser/context';
import "@vitest/browser/matchers";

test('renderString', async () => {
  const screen = renderString('<div>String</div>');
  await expect.element(screen.getByText('String')).toBeVisible();
  expect(screen.container).toMatchSnapshot();
});

test('renderFile', async () => {
  const screen = await renderFile('./fixtures/index.html');
  await expect.element(screen.getByText('HTMLFile')).toBeVisible();
  expect(screen.container).toMatchSnapshot();
});

test('render: string', async () => {
  const screen = await render('<div>String</div>');
  await expect.element(screen.getByText('String')).toBeVisible();
  expect(screen.container).toMatchSnapshot();
});

test('render: file', async () => {
  const screen = await render('./fixtures/index.html');
  await expect.element(screen.getByText('HTMLFile')).toBeVisible();
  expect(screen.container).toMatchSnapshot();
});

test('page.render: file', async () => {
  const screen = await page.render('./fixtures/index.html');
  await expect.element(screen.getByText('HTMLFile')).toBeVisible();
  expect(screen.container).toMatchSnapshot();
});
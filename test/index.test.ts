import { expect, test } from 'vitest';
import { renderString, renderFile } from '../src';
import "@vitest/browser/matchers";

test('render html string', async () => {
  const screen = renderString('<div>String</div>');
  await expect.element(screen.getByText('String')).toBeVisible();
  expect(screen.container).toMatchSnapshot();
});

test('render html file', async () => {
  const screen = await renderFile('./fixtures/index.html');
  await expect.element(screen.getByText('HTMLFile')).toBeVisible();
  expect(screen.container).toMatchSnapshot();
});

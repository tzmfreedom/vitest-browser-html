# vitest-browser-html

Render HTML in Vitest Browser Mode.

```javascript
import { render } from 'vitest-browser-html'
import { page } from '@vitest/browser/context'
import { expect, test } from 'vitest'

test('When string param start with `<`, it render as HTML string.', async () => {
  const screen = await render('<div>String</div>');
  await expect.element(screen.getByText('String')).toBeVisible();
});

test('When string param start without `<`, it render as HTML file.', async () => {
  const screen = await render('/path/to/file');
  await expect.element(screen.getByText('File')).toBeVisible();
});

test('You can call page.render() method.', async () => {
  const screen = await page.render('/path/to/file');
  await expect.element(screen.getByText('File')).toBeVisible();
});
```

`vitest-browser-html` performs cleanup of the component before the test begins, allowing you to see the rendered result in your UI. If you prefer to disable auto-cleanup, you can import the render function from `vitest-browser-html/pure`.

## Install

```
npm install -D vitest-browser-html
```

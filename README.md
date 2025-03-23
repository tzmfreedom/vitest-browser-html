# vitest-browser-html

Render HTML in Vitest Browser Mode.

```javascript
import { renderString, renderFile } from 'vitest-browser-html'
import { expect, test } from 'vitest'

test('render string', async () => {
  const screen = renderString('<div>String</div>');
  await expect.element(screen.getByText('String')).toBeVisible();
})

test('render html', async () => {
  const screen = await renderFile('/path/to/file');
  await expect.element(screen.getByText('File')).toBeVisible();
})
```

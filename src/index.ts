import { beforeEach } from 'vitest';
import { page } from '@vitest/browser/context';
import { cleanup, render } from './pure';

export { render, renderString, renderFile, cleanup } from './pure';
export type { RenderResult } from './pure'

page.extend({
  render,
  [Symbol.for('vitest:component-cleanup')]: cleanup,
})

beforeEach(() => {
  cleanup();
});


declare module '@vitest/browser/context' {
  interface BrowserPage {
    render: typeof render
  }
}

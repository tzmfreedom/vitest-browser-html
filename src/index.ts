import { beforeEach } from 'vitest';
import {
  debug,
  getElementLocatorSelectors,
  type PrettyDOMOptions,
} from '@vitest/browser/utils';
import {
  type FsOptions,
  type LocatorSelectors,
  server,
} from '@vitest/browser/context';

const { readFile } = server.commands;

const mountedContainers = new Set<Element>();

export interface RenderResult extends LocatorSelectors {
  container: Element;
  debug(maxLength?: number, options?: PrettyDOMOptions): void;
}

beforeEach(() => {
  cleanup();
});

export function renderString(html: string): RenderResult {
  const template = document.createElement('template');
  template.innerHTML = html;
  const container = template.content.firstElementChild;
  if (container === null) {
    throw new Error('failed rendering with document.createElement');
  }
  document.body.appendChild(container);
  mountedContainers.add(container);

  return {
    container,
    debug: (maxLength, options) => debug(container, maxLength, options),
    ...getElementLocatorSelectors(container),
  };
}

export async function renderFile(
  file: string,
  options?: BufferEncoding | FsOptions,
): Promise<RenderResult> {
  const body = await readFile(file, options);
  return renderString(body.toString());
}

function cleanup() {
  for (const mountedContainer of mountedContainers) {
    if (mountedContainer.parentNode === document.body) {
      document.body.removeChild(mountedContainer);
    }
  }
}

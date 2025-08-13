import {
  type FsOptions,
  type LocatorSelectors,
  server,
} from '@vitest/browser/context';
import {
  debug,
  getElementLocatorSelectors,
  type PrettyDOMOptions,
} from '@vitest/browser/utils';

const { readFile } = server.commands;

const mountedContainers = new Set<Element>();

export interface RenderResult extends LocatorSelectors {
  container: Element;
  debug(maxLength?: number, options?: PrettyDOMOptions): void;
}

export function render(html: string): RenderResult {
  const container = document.createElement('div');
  container.innerHTML = html;
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
  return render(body.toString());
}

export function cleanup() {
  for (const mountedContainer of mountedContainers) {
    if (mountedContainer.parentNode === document.body) {
      document.body.removeChild(mountedContainer);
    }
  }
}

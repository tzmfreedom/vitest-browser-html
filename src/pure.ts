import { type FsOptions, type LocatorSelectors, server } from "@vitest/browser/context";
import { debug, getElementLocatorSelectors, type PrettyDOMOptions } from "@vitest/browser/utils";

const { readFile } = server.commands;

const mountedContainers = new Set<Element>();

export interface RenderResult extends LocatorSelectors {
  container: Element;
  debug(maxLength?: number, options?: PrettyDOMOptions): void;
}

export async function render(src: string): Promise<RenderResult> {
  if (src.trim().startsWith('<')) {
    return renderString(src);
  }
  return await renderFile(src)
}

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

export function cleanup() {
  for (const mountedContainer of mountedContainers) {
    if (mountedContainer.parentNode === document.body) {
      document.body.removeChild(mountedContainer);
    }
  }
}


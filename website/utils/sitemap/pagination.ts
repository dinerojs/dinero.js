import { Sitemap } from './Sitemap';

export function getPrevious(sitemap: Sitemap) {
  if (sitemap?.previous) {
    return sitemap?.previous;
  }

  const parent = sitemap?.parent?.previous ? sitemap?.parent : sitemap?.root;

  if (parent?.previous?.last?.children.length === 0) {
    return parent?.previous?.last;
  }

  return parent?.previous?.last?.last;
}

export function getNext(sitemap: Sitemap) {
  if (sitemap?.next) {
    return sitemap?.next;
  }

  const parent = sitemap?.parent?.next ? sitemap?.parent : sitemap?.root;

  if (parent?.next?.first?.children.length === 0) {
    return parent?.next?.first;
  }

  return parent?.next?.first?.first;
}

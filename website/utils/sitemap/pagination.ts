import { Sitemap } from './Sitemap';

export function getPrevious(sitemap: Sitemap) {
  if (sitemap?.previous) {
    return sitemap?.previous;
  }

  const ancestor = sitemap?.parent?.previous ? sitemap?.parent : sitemap?.root;

  if (ancestor?.previous?.last?.children.length === 0) {
    return ancestor?.previous?.last;
  }

  return ancestor?.previous?.last?.last || ancestor?.parent?.last;
}

export function getNext(sitemap: Sitemap) {
  if (sitemap?.next) {
    return sitemap?.next;
  }

  const ancestor = sitemap?.parent?.next ? sitemap?.parent : sitemap?.root;

  if (ancestor?.next?.first?.children.length === 0) {
    return ancestor?.next?.first;
  }

  return (
    ancestor?.next?.first?.first ||
    ancestor?.children[0]?.children[0]?.children[0]
  );
}

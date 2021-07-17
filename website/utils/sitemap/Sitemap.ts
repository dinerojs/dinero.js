import { Resource } from '.';

function addParts(
  tree: Sitemap,
  parts: string[],
  usedParts: string[],
  resource: Resource
) {
  if (parts.length <= 0) {
    tree.resource = resource;

    return;
  }

  const [currentPart, ...otherParts] = parts;
  const newUsedParts = [...usedParts, currentPart];

  let node = tree.children.find(({ urlPart }) => urlPart === currentPart);

  if (!node) {
    node = new Sitemap(currentPart, tree.allUrls);
    node.parent = tree;
    node.url = newUsedParts.join('/');
    node.index = tree.children.length;

    tree.allUrls[node.url] = node;
    tree.children.push(node);
  }

  addParts(node, otherParts, newUsedParts, resource);
}

export class Sitemap {
  /**
   * The attached resource.
   */
  resource: Resource | null;
  /**
   * The parent of the sitemap tree.
   */
  parent: Sitemap | null;
  /**
   * The children of the sitemap tree.
   */
  children: Sitemap[];
  /**
   * The URL of the sitemap tree.
   */
  url: string | null;
  /**
   * All URLs in the sitemap tree.
   */
  allUrls: Record<string, Sitemap>;
  /**
   * The URL part of the sitemap tree.
   */
  urlPart: string | null;
  /**
   * The index of the sitemap tree relative to its siblings.
   */
  index: number | null;

  constructor(urlPart: string | null, urls: Record<string, Sitemap>) {
    this.resource = null;
    this.parent = null;
    this.children = [];
    this.url = null;
    this.allUrls = urls;
    this.urlPart = urlPart;
    this.index = null;
  }

  /**
   * The siblings of the sitemap tree, including itself.
   */
  get siblings() {
    return this.parent?.children || [this];
  }

  /**
   * The sibling that comes right before the sitemap tree.
   */
  get previous(): Sitemap | null | undefined {
    return this.index !== null ? this.parent?.children[this.index - 1] : null;
  }

  /**
   * The sibling that comes right after the sitemap tree.
   */
  get next(): Sitemap | null | undefined {
    return this.index !== null ? this.parent?.children[this.index + 1] : null;
  }

  /**
   * The first child of the sitemap tree.
   */
  get first() {
    const index = 0;

    return this.children[index];
  }

  /**
   * The last child of the sitemap tree.
   */
  get last() {
    const index = (this.children.length || 0) - 1;

    return this.children[index];
  }

  /**
   * The top parent of the sitemap tree.
   */
  get root() {
    let root = this.parent;

    while (root?.parent?.resource) {
      root = root.parent;
    }

    return root;
  }

  /**
   * Add a resource to the sitemap tree.
   *
   * @param resource The resource to add.
   */
  add(resource: Resource) {
    const parts = resource.path.split('/').filter(Boolean);

    addParts(this, parts, [], resource);
  }

  /**
   * Retrieve a sub-tree in a sitemap tree from a URL.
   *
   * @param url The URL to retrieve the sub-tree from.
   */
  fromUrl(url: string) {
    return this.allUrls[url];
  }

  /**
   * Retrieve a sub-tree in a sitemap tree from a resource.
   *
   * @param resource The resource to retrieve the sub-tree from.
   */
  fromResource(resource: Resource) {
    return this.fromUrl(resource.path.replace(/^\/|\/$/g, ''));
  }

  /**
   * Create a sitemap tree.
   */
  static create() {
    return new Sitemap(null, {});
  }
}

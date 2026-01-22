export class Resource {
  label: string;
  path: string;

  constructor(label: string, path: string) {
    this.label = label;
    this.path = path;
  }

  static create({ label, path }: { label: string; path: string }) {
    return new Resource(label, path);
  }
}

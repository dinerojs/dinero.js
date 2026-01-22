import type { ImageProps } from 'next/image';
import Image from 'next/image';

type FigureProps = {
  readonly alt: React.ReactNode;
  readonly children: React.ReactElement;
};

type FullWidthImageProps = Pick<ImageProps, 'alt' | 'src'>;

export function CustomFigure({ alt, children }: FigureProps) {
  return (
    <figure>
      {children}
      <figcaption className="mt-4 text-center text-gray-400">{alt}</figcaption>
    </figure>
  );
}

export function FullWidthImage({ src, alt }: FullWidthImageProps) {
  return (
    <div className="block p-2 bg-white border border-gray-100">
      <Image alt={alt} width="1280" height="720" src={src} />
    </div>
  );
}

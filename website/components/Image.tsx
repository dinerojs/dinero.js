import Image, { ImageProps } from 'next/image';

type FigureProps = {
  alt: React.ReactNode;
  children: React.ReactElement;
};

type FullWidthImageProps = Pick<ImageProps, 'src' | 'alt'>;

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

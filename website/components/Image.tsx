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
      <figcaption>{alt}</figcaption>
    </figure>
  );
}

export function FullWidthImage({ src, alt }: FullWidthImageProps) {
  return <Image alt={alt} width="1280" height="720" src={src} />;
}

import Image, { ImageProps } from 'next/image';
import { FC } from 'react';
import { getImagePath } from '../lib/utils';

interface ImageWrapperProps extends Omit<ImageProps, 'src'> {
  src: string;
}

const ImageWrapper: FC<ImageWrapperProps> = ({ src, ...props }) => {
  return <Image src={getImagePath(src)} {...props} />;
};

export default ImageWrapper;

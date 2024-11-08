import React, { HTMLAttributes } from 'react';
import { theme, TypographyVariant } from '../common/theme';

interface Props extends HTMLAttributes<HTMLSpanElement> {
  children?: string;
  variant?: TypographyVariant;
}

export default function Text({ children, variant, ...props }: Props) {
  const element = theme.typography[variant || 'body'].element;

  return React.createElement(
    element,
    {
      ...props,
      style: {
        ...theme.typography[variant || 'body'],
        ...props.style,
      },
    },
    children,
  );
}

import React, { CSSProperties, HTMLProps, ReactNode } from 'react';

interface Props extends HTMLProps<HTMLDivElement> {
  children?: ReactNode;
  axis?: 'x' | 'y';
  align?: CSSProperties['alignItems'];
  justify?: CSSProperties['justifyContent'];
  spacing?: number;
}

export function Stack({
  children,
  axis,
  align,
  justify,
  spacing,
  ...props
}: Props) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: axis === 'x' ? 'row' : 'column',
        justifyContent: justify,
        alignItems: align,
        gap: spacing,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

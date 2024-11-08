import React, { HTMLProps, ReactNode } from 'react';

interface Props extends HTMLProps<HTMLDivElement> {
  children?: ReactNode;
  axis?: 'x' | 'y';
}

export function Stack({ children, axis, ...props }: Props) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: axis === 'x' ? 'row' : 'column',
      }}
      {...props}
    >
      {children}
    </div>
  );
}

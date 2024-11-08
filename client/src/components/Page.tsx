import React from 'react';

interface Props {
  children?: React.ReactNode;
}

export function Page({ children }: Props) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: 800,
      }}
    >
      {children}
    </div>
  );
}

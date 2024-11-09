import React from 'react';
export const Chip = ({
  styles,
  children,
}: {
  styles?: React.CSSProperties;
  children: React.ReactNode;
}) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#736565',
        borderRadius: 30,
        padding: 8,
        gap: 8,
        ...styles,
      }}
    >
      {children}
    </div>
  );
};

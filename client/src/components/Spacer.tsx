import React from 'react';

export const Spacer = ({ axis, size }: { axis: 'x' | 'y'; size?: number }) => {
  if (axis === 'x') {
    return <div style={{ minWidth: size || '100%' }}></div>;
  }
  if (axis === 'y') {
    return <div style={{ minHeight: size || '100%' }}></div>;
  }
};

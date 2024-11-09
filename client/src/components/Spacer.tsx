import React from 'react';

export const Spacer = ({ axis, size }: { axis: 'x' | 'y'; size?: number }) => {
  if (axis === 'x') {
    return <div style={{ width: size || '100%' }}></div>;
  }
  if (axis === 'y') {
    return <div style={{ height: size || '100%' }}></div>;
  }
};

import React from 'react';
import { theme } from '../common/theme';

export const Divider = () => {
  return (
    <div
      style={{
        marginBlock: 16,
        width: '100%',
        borderRadius: 20,
        border: `0.5px solid ${theme.colors.muted}`,
      }}
    />
  );
};

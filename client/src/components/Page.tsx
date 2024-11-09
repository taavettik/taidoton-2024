import React, { ReactNode } from 'react';
import frame from '../../assets/frame.png';
import Text from './Text';

interface Props {
  children?: React.ReactNode;
}

export function Page({ children }: Props) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 20 }}>
      <div style={{ position: 'absolute', top: 0 }}>
        <img src={frame} alt="frame" style={{ width: 400, height: '100vh' }} />
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: 350,
          height: 770,
          backgroundColor: '#111418',
          borderRadius: 40,
          paddingTop: 20,
          zIndex: 20,
          gap: 8,
        }}
      >
        {children}
      </div>
    </div>
  );
}

export function PageHeader({
  title,
  subtitle,
}: {
  title?: ReactNode;
  subtitle?: ReactNode;
}) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderBottom: '2px solid #736565',
        width: 'calc(100% - 64px)',
        marginBottom: 28,
        marginLeft: 32,
        marginRight: 32,
      }}
    >
      <Text variant="h1">{title}</Text>

      <Text variant="body">{subtitle}</Text>
    </div>
  );
}

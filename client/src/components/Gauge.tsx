import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
  progress: number;
  score?: ReactNode;
  size?: 'small' | 'large';
}

export function Gauge({ progress, score, size }: Props) {
  const width = size === 'large' ? 120 : 60;
  const borderSize = size === 'large' ? 20 : 10;

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Background width={width} borderSize={borderSize}></Background>

      <Arc
        width={width}
        borderSize={borderSize}
        deg={(progress / 100) * 360}
      ></Arc>

      {score !== undefined && (
        <div
          style={{ position: 'absolute', fontSize: size === 'large' ? 20 : 16 }}
        >
          {score}
        </div>
      )}
    </div>
  );
}

const Background = styled.div<{ width: number; borderSize: number }>`
  width: ${(p) => p.width}px;
  border-radius: 50%;
  aspect-ratio: 1;
  border: ${(p) => p.borderSize}px solid #d9d9d9;
  position: absolute;
`;

const Arc = styled.div<{ deg: number; width: number; borderSize: number }>`
  /* HTML: <div class="arc"></div> */
  --b: ${(p) => p.borderSize}px; /* the boder thickness */
  --a: ${(p) => p.deg}deg; /* control the progression */

  width: ${(p) => p.width}px;
  aspect-ratio: 1;
  padding: var(--b);
  border-radius: 50%;
  background: #f54765;
  transition: all;
  --_g: /var(--b) var(--b) no-repeat radial-gradient(50% 50%, #000 97%, #0000);
  mask:
    top var(--_g),
    calc(50% + 50% * sin(var(--a))) calc(50% - 50% * cos(var(--a))) var(--_g),
    linear-gradient(#0000 0 0) content-box intersect,
    conic-gradient(#000 var(--a), #0000 0);
`;

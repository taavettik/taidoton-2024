import styled from 'styled-components';
import { Stack } from './Stack';
import React, { ReactNode } from 'react';
import Text from './Text';

interface Props {
  endLabel?: ReactNode;
  startLabel?: ReactNode;
  progress: number;
}

export function LinearGauge({ progress, startLabel, endLabel }: Props) {
  return (
    <Stack axis="y" spacing={8} width="100%">
      <Stack axis="x" justify="space-between">
        <Text variant="body">{startLabel}</Text>

        <Text variant="body">{endLabel}</Text>
      </Stack>

      <div style={{ position: 'relative' }}>
        <Backdrop></Backdrop>

        <Line progress={progress}></Line>

        <Circle style={{ left: `calc(${progress}% - 5px)` }}></Circle>
      </div>
    </Stack>
  );
}

const Backdrop = styled.div`
  background-color: rgba(228, 230, 236, 1);
  border-radius: 999px;
  width: 100%;
  height: 10px;
`;

const Line = styled.div<{ progress?: number }>`
  background-color: #f54765;
  border-radius: 999px;
  width: ${(p) => p.progress}%;
  height: 10px;
  position: absolute;
  top: 0;
`;

const Circle = styled.div`
  background-color: #f54765;
  border-radius: 999px;
  width: 20px;
  height: 20px;
  position: absolute;
  top: -5px;
`;

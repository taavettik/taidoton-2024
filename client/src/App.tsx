import React from 'react';
import { Stack } from './components/Stack';
import Text from './components/Text';
import { Page } from './components/Page';

export function App() {
  return <Page>
    <Stack axis="y">
  <Text variant="h1">
    Taidot on
  </Text>
</Stack>
    </Page>
}
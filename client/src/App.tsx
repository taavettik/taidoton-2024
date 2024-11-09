import React from 'react';
import { Stack } from './components/Stack';
import Text from './components/Text';
import { Page, PageHeader } from './components/Page';
import { Button } from './components/Button';

export function App() {
  return (
    <Page>
      <PageHeader>
        <Text variant="h1">Burneroo</Text>
      </PageHeader>

      <Text variant="body">Much data</Text>

      <Text variant="body">Such wow</Text>

      <Button>Go wow</Button>
    </Page>
  );
}

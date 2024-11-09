import React from 'react';
import { Page, PageHeader } from '../../components/Page';
import { Stack } from '../../components/Stack';
import tenor from '../../../assets/tenor.gif';
import { Button } from '../../components/Button';

export function HomePage() {
  return (
    <Page>
      <PageHeader
        title={'Välkommen till hemplatsen'}
        subtitle={`Dashboard`}
      ></PageHeader>
      <Button onClick={() => (window.location.href = '/sandra')}>Sandra</Button>
      <Button onClick={() => (window.location.href = '/taavetti')}>
        Taavetti
      </Button>
      <Stack axis="y">
        <img src={tenor} style={{ borderRadius: 8 }} />
      </Stack>
    </Page>
  );
}

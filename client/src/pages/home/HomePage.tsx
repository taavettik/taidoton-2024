import React from 'react';
import { Page, PageHeader } from '../../components/Page';
import { Stack } from '../../components/Stack';
import tenor from '../../../assets/tenor.gif';

export function HomePage() {
  return (
    <Page>
      <PageHeader
        title={'Välkommen till hemplatsen'}
        subtitle={`Dashboard`}
      ></PageHeader>
      <Stack axis="y">
        <img src={tenor} style={{ borderRadius: 8 }} />
      </Stack>
    </Page>
  );
}

import React, { useEffect, useState } from 'react';
import Text from './components/Text';
import { Page, PageHeader } from './components/Page';
import { Button } from './components/Button';
import { Gauge } from './components/Gauge';
import { Stack } from './components/Stack';
import { EmployerData } from './api';
import { api } from './common/api';

export function App() {
  const [data, setData] = useState<EmployerData>();

  useEffect(() => {
    (async () => {
      const response = await api.getCompanyData('taidoton');
      setData(response);
    })();
  }, []);

  return (
    <Page>
      <PageHeader title={data?.name} subtitle={`Dashboard`}></PageHeader>

      <Stack axis="y" spacing={16} align="center">
        <Text variant="body" align="center">
          <b>Burneroo</b> goes stopperoo!
        </Text>

        <Stack axis="x">
          <Gauge progress={60} score={data?.connectedness} size="small" />
        </Stack>

        <Button>Go wow</Button>
      </Stack>
    </Page>
  );
}

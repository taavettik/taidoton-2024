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

  if (!data) {
    return <Page>Loading...</Page>;
  }

  return (
    <Page>
      <PageHeader title={data?.name} subtitle={`Dashboard`}></PageHeader>

      <Stack width="100%" axis="y" spacing={16} align="center">
        <Text variant="body" align="center">
          <b>Burneroo</b> goes stopperoo!
        </Text>

        <Stack width="100%" axis="x" align="center" spacing={16}>
          <Gauge
            progress={60}
            score={`${data?.connectedness * 100}%`}
            size="small"
          />

          <Text variant="body">Connectedness</Text>
        </Stack>

        <Button>Go wow</Button>
      </Stack>
    </Page>
  );
}

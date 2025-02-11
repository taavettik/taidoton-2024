import React, { useEffect, useState } from 'react';
import { EmployerData } from '../../api';
import { api } from '../../common/api';
import { Button } from '../../components/Button';
import { Gauge } from '../../components/Gauge';
import { LinearGauge } from '../../components/LinearGauge';
import { Page, PageHeader } from '../../components/Page';
import { Stack } from '../../components/Stack';
import Text from '../../components/Text';
import tenor from '../../../assets/tenor.gif';

export function TaavettiPage() {
  const [data, setData] = useState<EmployerData>();

  useEffect(() => {
    (async () => {
      const response = await api.getCompanyData('taidot_on');
      setData(response);
    })();
  }, []);

  if (!data) {
    return <Page>Loading...</Page>;
  }

  return (
    <Page>
      <PageHeader title={data?.name} subtitle={`Dashboard`}></PageHeader>

      <Stack width="100%" axis="y" spacing={24} align="center">
        <Text variant="body" align="center">
          <b>Burneroo</b> goes stopperoo!
        </Text>

        <Stack axis="x">
          <Stack width="100%" axis="y" align="center" spacing={16}>
            <Gauge
              progress={data.connectedness * 100}
              score={`${data?.connectedness * 100}%`}
              size="small"
            />

            <Text variant="body">Connectedness</Text>
          </Stack>

          <Stack width="100%" axis="y" align="center" spacing={16}>
            <Gauge
              progress={data.afterHourEmailsRatio * 100}
              score={`${data?.afterHourEmailsRatio * 100}%`}
              size="small"
            />

            <Text align="center" variant="body">
              After hours email ratio
            </Text>
          </Stack>
        </Stack>

        <Stack width="100%" axis="y" align="center">
          <Text variant="body">Salary range</Text>

          <LinearGauge
            startLabel={`${data.salaryRange[0] * 1000}€`}
            endLabel={`${data.salaryRange[1] * 1000}€`}
            progress={50}
          ></LinearGauge>
        </Stack>

        <Button>Go wow</Button>

        <Stack axis="y">
          <img src={tenor} style={{ borderRadius: 8 }} />
        </Stack>
      </Stack>
    </Page>
  );
}

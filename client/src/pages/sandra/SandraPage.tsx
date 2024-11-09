import React, { useEffect, useState } from 'react';
import { EmployerData } from '../../api';
import { api } from '../../common/api';
import { Button } from '../../components/Button';
import { Gauge } from '../../components/Gauge';
import { LinearGauge } from '../../components/LinearGauge';
import { Page, PageHeader } from '../../components/Page';
import { Stack } from '../../components/Stack';
import Text from '../../components/Text';
import logo from '../../../assets/logo.jpeg';
import { Chip } from '../../components/Chip';
import { CiCircleCheck } from 'react-icons/ci';

export function SandraPage() {
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
      <Stack width="100%" axis="y" spacing={24} align="center">
        <ProgressBar sections={3} progress={1} />
        <Chip
          styles={{
            backgroundColor: 'white',
            position: 'absolute',
            top: 90,
            right: 'calc(50% + 50px)',
            width: '100px',
            height: '20px',
          }}
        >
          <CiCircleCheck fill="#FF6036" size={24} />
          <Text variant="body" align="center" style={{ color: 'black' }}>
            82%
          </Text>
        </Chip>
        <Text
          style={{
            color: 'white',
            position: 'absolute',
            marginRight: '-20px',
            top: 450,
            fontSize: 30,
            fontFamily: 'inter',
            letterSpacing: 21,
          }}
        >
          HATCHED
        </Text>
        <Text
          style={{
            color: 'white',
            position: 'absolute',
            top: 490,
            fontSize: 10,
            fontFamily: 'inter',
            letterSpacing: 10,
          }}
        >
          CONSULTING
        </Text>
        <Stack axis="y">
          <img
            src={logo}
            style={{ width: '370px', height: '500px', objectFit: 'cover' }}
          />
        </Stack>

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
      </Stack>
    </Page>
  );
}

const ProgressBar = ({
  sections,
  progress,
}: {
  sections: number;
  progress: number;
}) => {
  return (
    <Stack axis="x" justify="space-between" width="350px" spacing={4}>
      {[...Array(sections)].map((_, i) => (
        <div
          key={i}
          style={{
            width: `calc(100% / ${sections})`,
            height: '4px',
            backgroundColor: i < progress ? 'white' : '#515A66',
            borderRadius: 20,
          }}
        ></div>
      ))}
    </Stack>
  );
};

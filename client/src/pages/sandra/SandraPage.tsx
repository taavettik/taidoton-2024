import React, { useEffect, useState } from 'react';
import { ClientCompanyData, EmployerData } from '../../api';
import { api } from '../../common/api';
import { Button } from '../../components/Button';
import { Gauge } from '../../components/Gauge';
import { LinearGauge } from '../../components/LinearGauge';
import { Page } from '../../components/Page';
import { Stack } from '../../components/Stack';
import Text from '../../components/Text';
import logo from '../../../assets/logo.jpeg';
import { Chip } from '../../components/Chip';
import { CiCircleCheck } from 'react-icons/ci';
import { Spacer } from '../../components/Spacer';
import { theme } from '../../common/theme';
import { useQuery } from '@tanstack/react-query';
import { Divider } from '../../components/Divider';
import { LikeButtonsEtc } from './LikeButtonsEtc';

export function SandraPage() {
  const { data: companies } = useQuery<ClientCompanyData[]>({
    queryKey: ['companies'],
    queryFn: () => {
      return api.getCompanies();
    },
  });

  const [index, setIndex] = useState(0);

  console.log('companies', companies);

  const company = companies?.[index];

  if (!company) {
    return <Page>Loading...</Page>;
  }
  return (
    <CompanyProfile
      company={company}
      goNext={() => setIndex((index + 1) % companies.length)}
    />
  );
}

function CompanyProfile({
  company,
  goNext,
}: {
  company: ClientCompanyData;
  goNext: () => void;
}) {
  const data = company;
  // const [data, setData] = useStateborderSize<EmployerData>();

  // useEffect(() => {
  //   (async () => {
  //     const response = await api.getCompanyData('taidot_on');
  //     setData(response);
  //   })();
  // }, []);

  if (!company) {
    return <Page>Loading...</Page>;
  }

  return (
    <Page>
      <ProgressBar sections={3} progress={1} />
      <Stack
        width="100%"
        axis="y"
        spacing={24}
        align="center"
        style={{
          position: 'relative',
          objectFit: 'cover',
          minHeight: '500px',
          zIndex: -1,
          minWidth: '370px',
          backgroundImage: `url(${logo})`,
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: -1,
            background: `linear-gradient(180deg, rgba(0, 0, 0, 0) 10%, ${theme.colors.background} 85%, ${theme.colors.background} 90%)`,
          }}
        />
        <Chip
          styles={{
            marginTop: '20px',
            marginLeft: '20px',
            backgroundColor: 'white',
            width: '80px',
            height: '20px',
            justifyContent: 'flex-start',
          }}
        >
          <CiCircleCheck fill="#FF6036" size={24} />
          <Text
            variant="body"
            align="center"
            style={{ color: 'black', marginLeft: '10px' }}
          >
            82%
          </Text>
        </Chip>
        <Spacer axis="y" size={340} />

        <Stack width="100%" axis="y" align="center" spacing={6}>
          <Text
            style={{
              color: 'white',
              marginRight: '-20px',
              fontSize: 30,
              fontFamily: 'inter',
              letterSpacing: 15,
            }}
          >
            {data.name.split(' ')[0].toUpperCase()}
          </Text>
          <Text
            style={{
              color: 'white',
              fontSize: 10,
              fontFamily: 'inter',
              letterSpacing: 10,
            }}
          >
            {data.name.split(' ')?.[1]?.toUpperCase() ?? 'COMPANY'}
          </Text>
        </Stack>
        <Spacer axis="y" size={20} />

        <Stack width="100%" axis="y" align="center" spacing={6}>
          <Text
            variant="body"
            style={{
              fontSize: '12px',
              color: theme.colors.secondary,
            }}
          >
            Banking • Business Consultant • Espoo
          </Text>
        </Stack>
      </Stack>

      <div
        style={{
          width: '100%',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 6,
        }}
      >
        <Chip styles={chipStyles}>
          <Text
            variant="bodySmall"
            align="center"
            style={{ color: theme.colors.secondary }}
          >
            Integrity
          </Text>
        </Chip>
        <Chip styles={chipStyles}>
          <Text
            variant="bodySmall"
            align="center"
            style={{ color: theme.colors.secondary }}
          >
            Integrity
          </Text>
        </Chip>
        <Chip styles={chipStyles}>
          <Text
            variant="bodySmall"
            align="center"
            style={{ color: theme.colors.secondary }}
          >
            Integrity
          </Text>
        </Chip>
        <Chip styles={chipStyles}>
          <Text
            variant="bodySmall"
            align="center"
            style={{ color: theme.colors.secondary }}
          >
            Integrity
          </Text>
        </Chip>
        <Chip styles={chipStyles}>
          <Text
            variant="bodySmall"
            align="center"
            style={{ color: theme.colors.secondary }}
          >
            Integrity
          </Text>
        </Chip>
      </div>

      <Divider />

      <Stack axis="x">
        <Stack width="100%" axis="y" align="center" spacing={16}>
          <Metric title="Connectedness" value={data.connectedness * 100} />

          <Text variant="body">Connectedness</Text>
        </Stack>
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
            progress={data.burnoutRisk * 100}
            score={`${data?.burnoutRisk * 100}%`}
            size="small"
          />

          <Text align="center" variant="body">
            Burnout risk ratio
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

      <LikeButtonsEtc onClick={() => goNext()} />
      <div style={{ height: '100px' }} />
    </Page>
  );
}

const Metric = ({ title, value }: { title: string; value: number }) => {
  return (
    <Stack axis="x" justify="space-between" width="350px" spacing={4}>
      <Text variant="body">{title}</Text>
      <Text variant="body">{value}</Text>
    </Stack>
  );
};

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
            backgroundColor: i < progress ? 'white' : theme.colors.secondary,
            borderRadius: 20,
          }}
        ></div>
      ))}
    </Stack>
  );
};

const chipStyles = {
  border: '1px solid #939BA7',
  height: '12px',
  backgroundColor: 'transparent',
};

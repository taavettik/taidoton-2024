import React, { useEffect, useState } from 'react';
import { ClientCompanyData, EmployerData } from '../../api';
import { api } from '../../common/api';
import { Button } from '../../components/Button';
import { Gauge } from '../../components/Gauge';
import { LinearGauge } from '../../components/LinearGauge';
import { Page } from '../../components/Page';
import { Stack } from '../../components/Stack';
import Text from '../../components/Text';
import company0 from '../../../assets/company0.jpeg';
import company1 from '../../../assets/company1.jpeg';
import company2 from '../../../assets/company2.jpeg';
import { Chip } from '../../components/Chip';
import { CiCircleCheck } from 'react-icons/ci';
import { Spacer } from '../../components/Spacer';
import { theme } from '../../common/theme';
import { useQuery } from '@tanstack/react-query';
import { Divider } from '../../components/Divider';
import { LikeButtonsEtc } from './LikeButtonsEtc';

const images = [company0, company1, company2];

export function SandraPage() {
  const { data: companies } = useQuery<ClientCompanyData[]>({
    queryKey: ['companies'],
    queryFn: () => {
      return api.getCompanies();
    },
  });

  const [index, setIndex] = useState(0);

  const company = companies?.[index];

  if (!company) {
    return <Page>Loading...</Page>;
  }
  return (
    <CompanyProfile
      company={company}
      index={index}
      goNext={() => setIndex((index + 1) % companies.length)}
    />
  );
}

function CompanyProfile({
  company,
  index,
  goNext,
}: {
  company: ClientCompanyData;
  index: number;
  goNext: () => void;
}) {
  const data = company;

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
          objectPosition: 'center',
          minHeight: '500px',
          zIndex: -1,
          minWidth: '370px',
          backgroundImage: `url(${images?.[index] ?? images[0]})`,
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
            {Math.ceil(Math.random() * 50 + 50)} %
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
        {data.tags.map((tag) => (
          <Chip key={tag} styles={chipStyles}>
            <Text
              variant="bodySmall"
              align="center"
              style={{ color: theme.colors.secondary }}
            >
              {tag}
            </Text>
          </Chip>
        ))}
      </div>
      <Divider />
      <Metric
        title="Communication tone"
        value={data.seriousOrRelaxed * 100}
        minName="Serious"
        maxName="Relaxed"
      />

      <Spacer axis="y" size={8} />
      <Metric
        title="Connectedness"
        value={data.connectedness * 100}
        minName="Hierarchical"
        maxName="Flat"
      />

      <Spacer axis="y" size={8} />
      <Metric
        title="Grindset"
        value={data.burnoutRisk * 100}
        minName="Chill"
        maxName="Sigma"
      />
      <Divider />

      <Text
        variant="body"
        align="center"
        style={{ color: theme.colors.secondary }}
      >
        {data.description}
      </Text>

      <Spacer axis="y" size={80} />
      <LikeButtonsEtc onClick={() => goNext()} />
    </Page>
  );
}

const Metric = ({
  title,
  minName,
  maxName,
  value,
}: {
  title: string;
  value: number;
  minName: string;
  maxName: string;
}) => {
  return (
    <Stack axis="y" justify="space-between" width="100%" spacing={8}>
      <Text variant="bodySmall" style={{ color: theme.colors.secondary }}>
        {title}
      </Text>
      <MetricBar minName={minName} maxName={maxName} percentage={value} />
    </Stack>
  );
};
const MetricBar = ({
  minName,
  maxName,
  percentage,
}: {
  minName: string;
  maxName: string;
  percentage: number;
}) => {
  return (
    <Stack axis="y" spacing={4} justify="center" align="center">
      <Stack axis="x" justify="space-between" width="100%" spacing={4}>
        <Text variant="body" style={{ color: theme.colors.secondary }}>
          {minName}
        </Text>
        <Text variant="body" style={{ color: theme.colors.secondary }}>
          {maxName}
        </Text>
      </Stack>
      <Spacer axis="y" size={8} />
      <div
        style={{
          width: '100%',
          height: '8px',
          backgroundColor: 'white',
          borderRadius: '4px',
        }}
      >
        <div
          style={{
            width: `${percentage}%`,
            height: '8px',
            backgroundColor: theme.colors.tinderRed,
            borderRadius: '4px',
          }}
        />
      </div>
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

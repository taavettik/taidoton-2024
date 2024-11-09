import React, { useEffect, useState } from 'react';
import { EmployerData } from '../../api';
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
              letterSpacing: 21,
            }}
          >
            HATCHED
          </Text>
          <Text
            style={{
              color: 'white',
              fontSize: 10,
              fontFamily: 'inter',
              letterSpacing: 10,
            }}
          >
            CONSULTING
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

const chipStyles = {
  border: '1px solid #939BA7',
  height: '12px',
  backgroundColor: 'transparent',
};

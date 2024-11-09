import React, { useEffect } from 'react';
import { Page, PageHeader } from '../../components/Page';
import { Stack } from '../../components/Stack';
import tenor from '../../../assets/tenor.gif';
import { Button } from '../../components/Button';
import { Spacer } from '../../components/Spacer';
import styled from 'styled-components';

export function HomePage() {
  const [imageVisible, setImageVisible] = React.useState(false);
  useEffect(() => {
    setTimeout(() => {
      setImageVisible(true);
    }, 1000);
  });
  return (
    <Page>
      <Spacer axis="y" size={40} />
      <PageHeader
        title={'Burneroo'}
        subtitle={`Find the right employer for you.`}
      ></PageHeader>
      <Button onClick={() => (window.location.href = '/sandra')}>
        Get started
      </Button>
      {/* <Button onClick={() => (window.location.href = '/taavetti')}>
        Go crazy
      </Button> */}
      <Spacer axis="y" size={40} />
      <Stack axis="y">
        <AppearingImg
          src={tenor}
          $appear={imageVisible}
          style={{ borderRadius: 8 }}
        />
      </Stack>
    </Page>
  );
}
const AppearingImg = styled.img<{ $appear: boolean }>`
  opacity: ${(props) => (props.$appear ? 1 : 0)};
  transform: rotate(${(props) => (props.$appear ? '720deg' : '0deg')});
  scale: ${(props) => (props.$appear ? '1' : '0')};
  transition:
    opacity 0.5s ease-in-out,
    scale 1.5s ease-in,
    transform 1.5s ease-in-out;
`;

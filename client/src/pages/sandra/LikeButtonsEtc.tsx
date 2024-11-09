import React from 'react';
import { CiHeart, CiStar, CiTrash } from 'react-icons/ci';
import styled from 'styled-components';
import { Stack } from '../../components/Stack';

export const LikeButtonsEtc = ({ onClick }: { onClick: () => void }) => {
  return (
    <Stack
      justify="space-between"
      style={{
        position: 'absolute',
        bottom: 32,
        display: 'flex',
        flexDirection: 'row',
        gap: 12,
      }}
    >
      <IconButton onClick={onClick}>
        <CiTrash size={48} />
      </IconButton>
      <IconButton onClick={onClick}>
        <CiStar size={48} />
      </IconButton>
      <IconButton onClick={onClick}>
        <CiHeart size={48} />
      </IconButton>
    </Stack>
  );
};

const IconButton = styled.button`
  background-color: #333; /* Dark background color */
  border-radius: 50%; /* Round shape */
  display: flex;
  aspect-ratio: 1;
  justify-content: center;
  align-items: center;
  color: white; /* Text or icon color */
  border: none; /* No border */
  cursor: pointer;
  transition: transform 0.1s ease-in-out;

  &:hover {
    transform: scale(1.05); /* Slightly enlarge on hover */
  }
  &:active {
    transform: scale(0.95) rotate(10deg); /* Slightly shrink and rotate on click */
  }
`;

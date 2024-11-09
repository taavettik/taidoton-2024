import React from 'react';
import styled from 'styled-components';

export const Button = styled.button`
  background: linear-gradient(
    90deg,
    rgba(255, 96, 54, 1) 0%,
    rgba(253, 38, 122, 1) 100%
  );
  border-radius: 999px;
  font-size: 19px;
  padding: 8px 16px;
  color: white;
  border: none;
  cursor: pointer;
  transition: transform 0.1s ease-in-out;

  &:hover {
    transform: translateY(-2px);
  }
  &:active {
    transform: translateY(2px);
  }
`;

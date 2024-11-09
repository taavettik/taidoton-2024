import { SourceData } from "../types/algos";

export const calculateBurnoutRisk = (data: SourceData) => {
  return 0.8;
};

export const calculateSeriousOrRelaxed = (data: SourceData) => {
  return 0.2;
};

export const calculateConnectedness = (data: SourceData) => {
  return 0.3;
};

export type ClientCompanyData = {
  name: string;
  salaryRange: [number, number];
  description: string;
  /** 0-1 percentage of how serious risk there is to burn out */
  burnoutRisk: number;
  /** 0-1 percentage of how serious or relaxed the environment is */
  seriousOrRelaxed: number;
  /** 0-1 percentage of how much inter-personnel communications there is (excluding bosses) */
  connectedness: number;
};

export type EmployerData = {
  name: string;
  salaryRange: [number, number];
  description: string;
  afterHourEmailsRatio: number;
  managementTone: string;
  employeeTone: string;
  connectedness: number;
};

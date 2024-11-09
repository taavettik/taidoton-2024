import {
  calculateBurnoutRisk,
  calculateConnectedness,
  calculateSeriousOrRelaxed,
} from "../common/algos";
import { getDb } from "../common/db";
import { SourceData } from "../types/algos";
import { CompanyData } from "../types/company";

export const getCompanies = async () => {
  const db = await getDb();
  const emails = db.data.emails;
  const companies = db.data.companies ?? [];

  const companiesWithInsights: CompanyData[] = [];

  const sourceData: SourceData = {
    emails: [],
    emailsSummary: [],
    slack: [],
  };

  for (const company of companies) {
    const burnoutRisk = calculateBurnoutRisk(sourceData);
    const seriousOrRelaxed = calculateSeriousOrRelaxed(sourceData);
    const connectedness = calculateConnectedness(sourceData);

    companiesWithInsights.push({
      ...company,
      burnoutRisk,
      seriousOrRelaxed,
      connectedness,
    });
  }

  return companiesWithInsights;
};

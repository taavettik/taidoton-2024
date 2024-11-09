import {
  calculateBurnoutRisk,
  calculateConnectedness,
  calculateSeriousOrRelaxed,
} from "../common/algos";
import { getDb } from "../common/db";
import { SourceData } from "../types/algos";
import { ClientCompanyData } from "../types/company";

export const getCompanies = async () => {
  const db = await getDb();
  const emails = db.data.emails;
  const slack = db.data.slack;
  const companies = db.data.companies ?? [];

  const companiesWithInsights: ClientCompanyData[] = [];

  for (const company of companies) {
    const sourceData: SourceData = {
      emails: emails.filter((e) => e.company === company.slug),
      slack: slack.filter((s) => s.company === company.slug),
    };
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

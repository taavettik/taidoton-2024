import { getDb } from "../common/db";

export const getEmployerDashboardData = async (slug: string) => {
  const db = await getDb();

  const company = db.data.companies.find((c) => c.slug === slug);
  if (!company) throw new Error("Company not found");

  const afterHourEmailsRatio = 0.7;
  const connectedness = 0.1;
  const managementTone = "informative";
  const employeeTone = "informative";

  return {
    name: company.name,
    salaryRange: company.salaryRange,
    description: company.description,
    afterHourEmailsRatio,
    managementTone,
    employeeTone,
    connectedness,
  };
};

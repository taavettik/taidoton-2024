import { getDb } from "../common/db";

export const getEmployerDashboardData = async (slug: string) => {
  const db = await getDb();

  const company = db.data.companies.find((c) => c.slug === slug);
  if (!company) throw new Error("Company not found");

  const companyEmails = db.data.emails.filter(
    (e) => e.company === company.slug
  );

  let afterHourEmails = 0;
  const totalEmails = companyEmails.length;
  for (const email of companyEmails) {
    console.log(email);
    afterHourEmails += email.afterHoursSent;
  }

  const afterHourEmailsRatio = afterHourEmails / totalEmails;

  const slackMessages = db.data.slack.filter((s) => s.company === company.slug);

  // collect counts on all diffferent tones
  const tones: Record<string, number> = {};
  for (const message of slackMessages) {
    if (!tones[message.tone]) {
      tones[message.tone] = 0;
    }
    tones[message.tone] += 1;
  }

  console.log(tones);

  // find the most common tone
  let max = 0;
  let messageTone = "";
  for (const tone in tones) {
    if (tones[tone] > max) {
      max = tones[tone];
      messageTone = tone;
    }
  }

  const connectedness = 0.1;

  return {
    name: company.name,
    salaryRange: company.salaryRange,
    description: company.description,
    tags: company.tags,
    afterHourEmailsRatio,
    messageTone,
    connectedness,
  };
};

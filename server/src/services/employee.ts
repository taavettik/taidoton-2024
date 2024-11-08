import { getDb } from "../common/db";

export const getCompanyInsights = async () => {
  const db = await getDb();
  const emails = db.data.emails;

  let numOfAfterHoursEmails = 0;
  for (const email of emails) {
    const timestamp = new Date(email.timestamp);
    if (timestamp.getHours() >= 12) {
      numOfAfterHoursEmails += 1;
    }
  }

  const ratioOfAfterHoursEmails = numOfAfterHoursEmails / emails.length;

  return {
    ratioOfAfterHoursEmails,
  };
};

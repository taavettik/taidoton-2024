import { SourceData } from "../types/algos";

/** Calculate burnout risk based on how many after hour emails are sent */
export const calculateBurnoutRisk = (data: SourceData) => {
  const afterHourEmails = data.emails.reduce(
    (acc, email) => (acc += email.afterHoursSent),
    0
  );

  const sentEmails = data.emails.reduce((acc, email) => (acc += email.sent), 0);
  const afterHourEmailRatio = afterHourEmails / sentEmails;
  return afterHourEmailRatio;
};

// invitation / funny / neutral / serious / concerned / aggressive / threatening / informative,
export const calculateSeriousOrRelaxed = (data: SourceData) => {
  const seriousTones = [
    "invitation",
    "serious",
    "concerned",
    "aggressive",
    "threatening",
    "informative",
  ];
  const relaxedTones = ["funny", "neutral"];

  const seriousCount = data.slack.reduce((acc, slack) => {
    if (seriousTones.includes(slack.tone)) {
      return acc + 1;
    }
    return acc;
  }, 0);

  const relaxedCount = data.slack.reduce((acc, slack) => {
    if (relaxedTones.includes(slack.tone)) {
      return acc + 1;
    }
    return acc;
  }, 0);

  return seriousCount / (seriousCount + relaxedCount);
};

export const calculateConnectedness = (data: SourceData) => {
  return 0.3;
};

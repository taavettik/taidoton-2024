import * as fs from "fs";

interface EmailEntry {
  timestamp: string;
  numberOfRecipients: number;
  numberOfCCs: number;
  numberOfBCCs: number;
  recipientType: string;
  lengthOfThread: number;
  responseTime: number;
  titleTone: string;
  titleLength: number;
  messageTone: string;
  messageLength: number;
  recipientRoleLevel: string;
}

interface SummaryEntry {
  date: string;
  employeeID: string;
  department: string;
  sent: number;
  received: number;
  internalSent: number;
  externalSent: number;
  avgResponseTime: number;
  afterHoursSent: number;
  avgRecipients: number;
  avgThreadLength: number;
}

const readEmailData = (filePath: string): EmailEntry[] => {
  const data = fs
    .readFileSync(filePath, "utf8")
    .split("\n")
    .map((row) => row.split(","))
    .slice(1)
    .map((row) => ({
      timestamp: row[0],
      numberOfRecipients: parseInt(row[1]),
      numberOfCCs: parseInt(row[2]),
      numberOfBCCs: parseInt(row[3]),
      recipientType: row[4],
      lengthOfThread: parseInt(row[5]),
      responseTime: parseInt(row[6]),
      titleTone: row[7],
      titleLength: parseInt(row[8]),
      messageTone: row[9],
      messageLength: parseInt(row[10]),
      recipientRoleLevel: row[11],
    }));
  return data;
};

export function analyzeEmailData(filePath: string): SummaryEntry[] {
  // read csv data
  const emailData = readEmailData(filePath);

  const summaryMap: { [key: string]: SummaryEntry } = {};

  // Process each email entry
  emailData.forEach((email) => {
    const date = email.timestamp.split("T")[0];
    const employeeID =
      email.recipientRoleLevel === "same"
        ? "E001"
        : email.recipientRoleLevel === "above"
        ? "E002"
        : "E003";
    const department =
      employeeID === "E001"
        ? "Product Dev"
        : employeeID === "E002"
        ? "Marketing"
        : "Sales";

    const key = `${date}-${employeeID}`;

    if (!summaryMap[key]) {
      summaryMap[key] = {
        date,
        employeeID,
        department,
        sent: 0,
        received: 0,
        internalSent: 0,
        externalSent: 0,
        avgResponseTime: 0,
        afterHoursSent: 0,
        avgRecipients: 0,
        avgThreadLength: 0,
      };
    }

    const summary = summaryMap[key];

    // Update the summary entry
    summary.sent += 1;
    summary.received += 1; // Assuming one received email per entry
    if (email.recipientType === "internal") {
      summary.internalSent += 1;
    } else {
      summary.externalSent += 1;
    }
    summary.avgResponseTime += email.responseTime;
    summary.afterHoursSent +=
      email.timestamp.includes("T22") || email.timestamp.includes("T23")
        ? 1
        : 0;
    summary.avgRecipients += email.numberOfRecipients;
    summary.avgThreadLength += email.lengthOfThread;
  });

  // Calculate averages
  Object.values(summaryMap).forEach((summary) => {
    summary.avgResponseTime = Math.round(
      summary.avgResponseTime / summary.sent
    );
    summary.avgRecipients = parseFloat(
      (summary.avgRecipients / summary.sent).toFixed(1)
    );
    summary.avgThreadLength = parseFloat(
      (summary.avgThreadLength / summary.sent).toFixed(1)
    );
  });

  return Object.values(summaryMap);
}

export const getEmployeeInsights = async () => {
  const filePath = "./utils/emailData.csv";
  const analysis = analyzeEmailData(filePath);

  return { analysis };
};

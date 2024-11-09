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
  employeeID: string;
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
      timestamp: row[1],
      numberOfRecipients: parseInt(row[2]),
      numberOfCCs: parseInt(row[3]),
      numberOfBCCs: parseInt(row[4]),
      recipientType: row[5],
      lengthOfThread: parseInt(row[6]),
      responseTime: parseInt(row[7]),
      titleTone: row[8],
      titleLength: parseInt(row[9]),
      messageTone: row[10],
      messageLength: parseInt(row[11]),
      recipientRoleLevel: row[12],
      employeeID: row[13],
    }));
  return data;
};

export function analyzeEmailData(filePath: string): SummaryEntry[] {
  // read csv data
  const emailData = readEmailData(filePath);

  const summaryMap: { [key: string]: SummaryEntry } = {};

  emailData.forEach((email) => {
    const date = email.timestamp.split("T")[0];
    const employeeID = email.employeeID;
    const department =
      employeeID === "E001"
        ? "Product Dev"
        : employeeID === "E002"
        ? "Marketing"
        : "Sales";

    const key = `${date}-${employeeID}`;

    if (!summaryMap[key]) {
      summaryMap[key] = {
        date: date,
        employeeID: employeeID,
        department: department,
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
  const filePath = "./sandrahihii/emailData.csv";
  const analysis = analyzeEmailData(filePath);

  return { analysis };
};

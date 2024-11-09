import type { Low } from "lowdb";
import { JSONFilePreset } from "lowdb/node";

interface Db {
  // TODO
  emails: Array<{
    employeeID: string;
    company: string;
    timestamp: string;
    numberOfRecipients: number;
    numberOfCCs: number;
    numberOfBCCs: number;
    recipientType: "internal" | "external";
    lengthOfThread: number;
    responseTime: number;
    titleTone: string;
    titleLength: number;
    messageTone: string;
    messageLength: number;
    recipientRoleLevel: "below" | "same" | "above";
  }>;
  emailsSummary: Array<{
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
  }>;
  companies: Array<{
    slug: string; // unique id
    name: string;
    salaryRange: [number, number];
    description: string;
    tags: string[];
  }>;
}

const defaultData: Db = { emails: [], emailsSummary: [], companies: [] };

let db: Low<typeof defaultData> | null = null;

export async function getDb() {
  if (db) {
    return db;
  }
  db = await JSONFilePreset("db.json", defaultData);

  return db;
}

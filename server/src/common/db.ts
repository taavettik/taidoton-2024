import type { Low } from "lowdb";
import { JSONFilePreset } from "lowdb/node";

interface Db {
  // TODO
  emails: Array<{
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
}

const defaultData: Db = { emails: [] };

let db: Low<typeof defaultData> | null = null;

export async function getDb() {
  if (db) {
    return db;
  }
  db = await JSONFilePreset("db.json", defaultData);

  return db;
}

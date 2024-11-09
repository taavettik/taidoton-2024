import type { Low } from "lowdb";
import { JSONFilePreset } from "lowdb/node";
import { Company, EmailSummary, SlackSummary } from "../types/db";

interface Db {
  emails: Array<EmailSummary>;
  slack: Array<SlackSummary>;
  companies: Array<Company>;
}

const defaultData: Db = { emails: [], slack: [], companies: [] };

let db: Low<typeof defaultData> | null = null;

export async function getDb() {
  if (db) {
    return db;
  }
  db = await JSONFilePreset("db.json", defaultData);

  return db;
}

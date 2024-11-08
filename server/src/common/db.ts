import type { Low } from 'lowdb';
import { JSONFilePreset } from 'lowdb/node'

interface Db {
  // TODO
}

const defaultData: Db = {}

let db: Low<typeof defaultData> | null = null;

export async function getDb() {
  if (db) {
    return db;
  }
  db = await JSONFilePreset('db.json', {});

  return db;
}

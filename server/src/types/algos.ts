import { EmailSummary, SlackSummary } from "./db";

export type SourceData = {
  emails: EmailSummary[];
  slack: SlackSummary[];
};

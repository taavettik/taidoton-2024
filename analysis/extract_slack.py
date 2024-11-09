import csv
import json
from typing import List
from pydantic import BaseModel


class RawData(BaseModel):
    ts: str
    user: str
    text: str
    type: str
    subtype: str


class MessageEntry(BaseModel):
    timestamp: str
    employeeID: str
    text: str = None
    isChannel: bool
    numberOfRecipients: int = 0
    messageTone: str = ""
    messageLength: int = 0
    responseTime: int = 0


def read_slack_data(file_path: str) -> List[MessageEntry]:
    slack_data: List[MessageEntry] = []

    with open(file_path, mode="r", encoding="utf-8") as file:
        reader = csv.DictReader(file)

        slack_data = [
            MessageEntry(
                timestamp=row["ts"],
                employeeID=row["user"],
                text=row.get("text", ""),
                isChannel=row["type"] == "message",
            )
            for row in reader
            if row.get("subtype") != "channel_join"
        ]

    with open("./results/parsed_slack_messages.json", "w", encoding="utf-8") as f:
        json.dump(
            [entry.dict() for entry in slack_data], f, ensure_ascii=False, indent=4
        )

    return slack_data


read_slack_data("./data/slack_example/messages.csv")

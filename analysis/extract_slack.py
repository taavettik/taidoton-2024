import csv
import json
from typing import Dict, List
from pydantic import BaseModel
import os
from dotenv import load_dotenv

load_dotenv()

yap = print
from datetime import datetime

OPENAI_API_KEY = os.environ["OPENAI_API_KEY"]

from openai import OpenAI

client = OpenAI(api_key=OPENAI_API_KEY)


def process_messages(msgs: str):
    chat_conpletion_response = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": """
Generate a JSON response analyzing the tone of each person based on specified traits. For each person, provide a score from 0 to 1 for each trait, where:
- 1 represents a strong presence of the trait
- 0 represents no presence of the trait

The traits to analyze are: ["toxic", "friendly", "supportive", "funny", "inspiring", "bossy"]. You may include decimal values (e.g., 0.25, 0.75) for nuanced ratings.

Format the JSON strictly as shown below, and do not include any additional text. Follow this structure for each person:

{
  "Person_A": {
    "toxic": [toxicity_score],
    "friendly": [friendliness_score],
    ...
  },
  "Person_B": {
    "toxic": [toxicity_score],
    "friendly": [friendliness_score],
    ...
  }
}

Messages for analysis:
[Insert messages here]

"""
                + msgs,
            }
        ],
        model="gpt-3.5-turbo",
    )
    return chat_conpletion_response.choices[0].message.content


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


class SummaryEntry(BaseModel):
    date: str
    employeeID: str
    sent: int
    afterHoursSent: int


# Function to format the timestamp
def format_timestamp(ts):
    dt = datetime.fromtimestamp(float(ts))
    return dt.strftime("%Y-%m-%d %H:%M")


# Function to parse and transform data
def transform_data(data):
    output = []
    for entry in data:
        # Only process message entries (skip channel join or other types)
        if entry.get("type") == "message" and "text" in entry:
            timestamp = format_timestamp(entry["ts"])
            channel = "#general"  # Assuming fixed channel as "#general"
            # Extract user display name or fallback to "Unknown"
            user = entry.get("user_profile", {}).get("name", "Unknown")
            # Extract message text
            text = entry["text"]
            # Format the message
            formatted_message = f"[{timestamp}, {channel}] {user}: {text}"
            output.append(formatted_message)
    return output


def transform_analysis_data(data) -> List[MessageEntry]:
    output = []
    for entry in data:
        # Only process message entries (skip channel join or other types)
        if entry.get("type") == "message" and "text" in entry:
            timestamp = format_timestamp(entry["ts"])
            channel = "#general"  # Assuming fixed channel as "#general"
            # Extract user display name or fallback to "Unknown"
            user = entry.get("user_profile", {}).get("name", "Unknown")
            # Extract message text
            text = entry["text"]
            # Format the message
            formatted_message = MessageEntry(
                timestamp=timestamp,
                employeeID=user,
                text=text,
            )
            output.append(formatted_message)
    return output


def hugo_hihii_slack_gpt_thing():
    with open(
        "./data/slack/all-taidoton/2024-11-09.json", mode="r", encoding="utf-8"
    ) as file:
        data = json.load(file)
        formatted_messages = transform_data(data)
        for message in formatted_messages:
            yap(message)
        human_readable_messages_str = "\n".join(formatted_messages)
        scores = process_messages(human_readable_messages_str)
        yap(scores)


def read_slack_data(file_path: str) -> List[MessageEntry]:
    slack_data: List[MessageEntry] = []
    # hugo_hihii_slack_gpt_thing()
    # return

    with open(file_path, mode="r", encoding="utf-8") as file:
        data = json.load(file)
        formatted_messages = transform_analysis_data(data)
        for message in formatted_messages:
            yap(message)

        slack_data = [
            MessageEntry(
                timestamp=row.timestamp, employeeID=row.employeeID, text=row.text
            )
            for row in formatted_messages
        ]

    return slack_data


def analyze_slack_data(file_path: str) -> List[SummaryEntry]:
    slack_data = read_slack_data(file_path)
    summary_map: Dict[str, SummaryEntry] = {}

    for message in slack_data:
        date = message.timestamp.split(" ")[0]
        employee_id = message.employeeID
        department = "department"

        key = f"{date}-{employee_id}"

        if key not in summary_map:
            summary_map[key] = SummaryEntry(
                date=date,
                employeeID=employee_id,
                department=department,
                sent=0,
                received=0,
                internalSent=0,
                externalSent=0,
                avgResponseTime=0.0,
                afterHoursSent=0,
                avgRecipients=0.0,
                avgThreadLength=0.0,
            )
        summary = summary_map[key]

        summary.sent += 1

        hour_sent = message.timestamp.split(" ")[1].split(":")[0]
        if int(hour_sent) > 17 or int(hour_sent) < 7:
            summary.afterHoursSent += 1

    result = list(summary_map.values())

    return json.dumps(result, default=lambda o: o.__dict__)


def get_slack_insights() -> List[SummaryEntry]:
    file_path = "./data/slack/all-taidoton/2024-11-09.json"

    analysis = analyze_slack_data(file_path)
    with open("./results/slack_analysis_result.json", "w") as f:
        f.write(str(analysis))
    return analysis


get_slack_insights()

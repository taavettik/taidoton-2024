import csv
import json
from typing import Dict, List
from pydantic import BaseModel
import os

OPENAI_API_KEY = os.environ["OPENAI_API_KEY"]

from openai import OpenAI

client = OpenAI(api_key=OPENAI_API_KEY)

resp = client.chat.completions.create(
    messages=[
        {
            "role": "user",
            "content": "Say this is a test",
        }
    ],
    model="gpt-3.5-turbo",
)

print("resp", resp)


def process_messages(msgs: str):
    chat_conpletion_response = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": """
Generate a JSON response with toxicity scores for each individual based on their messages. Rate each person on a scale of 0 to 1, where 1 represents high toxicity and 0 represents no toxicity. Provide scores as floating-point values (e.g., 0.25, 0.75) for nuanced results. Follow this format exactly:

{
  "Person_A": {"toxic": 1.0},
  "Person_B": {"toxic": 0.0},
  "Person_C": {"toxic": 0.45}
}

Do not include any additional text; respond with JSON only.

Messages for analysis:
"""
                + msgs,
            }
        ],
        model="gpt-3.5-turbo",
    )
    return chat_conpletion_response.choices[0].message.content


# # list engines
# engines = openai.Engine.list()

# # print the first engine's id
# # print(engines.data)

# # create a completion
# completion = openai.chat.completions.create(
#     engine="gpt-3.5-turbo", prompt="Moi miten menee"
# )

# # print the completion
# print(completion.choices[0].text)


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


class SummaryEntry(BaseModel):
    date: str
    employeeID: str
    department: str
    sent: int
    received: int
    internalSent: int
    externalSent: int
    avgResponseTime: float
    afterHoursSent: int
    avgRecipients: float
    avgThreadLength: float


def read_slack_data(file_path: str) -> List[MessageEntry]:
    slack_data: List[MessageEntry] = []

    scores = process_messages(
        """
    Taavetti: "I hate you Hugo! You are the worst person I have ever seen!",
    Hugo: "Sorry :( That was my mistake. I am so sorry.",
    Taavetti: "I will not forget this! I will kick you out of the company and eat your lunchbox!",
    Sandra: "Perkele mennään pelaa padelia. Teidän tappelut ei kiinnosta. Perkele!",
    Late: "Moi taavetti :))) Mä oon AI divisioonan johtaja",
    Ella: "Moi mä designaan",
    """
    )
    print(scores)
    return

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
        summary.avgResponseTime += message.responseTime

        hour_sent = message.timestamp.split(" ")[1].split(":")[0]
        if int(hour_sent) > 17 or int(hour_sent) < 7:
            summary.afterHoursSent += 1
        summary.avgRecipients += message.numberOfRecipients
        summary.avgThreadLength += message.messageLength

        # Calculate averages
        for summary in summary_map.values():
            if summary.sent > 0:
                summary.avgResponseTime = round(summary.avgResponseTime / summary.sent)
                summary.avgRecipients = round(summary.avgRecipients / summary.sent, 1)
                summary.avgThreadLength = round(
                    summary.avgThreadLength / summary.sent, 1
                )

    result = list(summary_map.values())

    return json.dumps(result, default=lambda o: o.__dict__)


def get_slack_insights() -> List[SummaryEntry]:
    file_path = "./data/slack_example/messages.csv"
    analysis = analyze_slack_data(file_path)
    with open("./results/slack_analysis_result.json", "w") as f:
        f.write(str(analysis))
    return analysis


get_slack_insights()

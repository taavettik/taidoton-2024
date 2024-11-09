import csv
from pydantic import BaseModel
import json
from typing import List, Dict


class Tone:
    aggressive = "aggressive"
    concerned = "concerned"
    neutral = "neutral"


class Role:
    management = "management"
    non_management = "non-management"
    trainee = "trainee"


class EmailEntry(BaseModel):
    timestamp: str
    numberOfRecipients: int
    numberOfCCs: int
    numberOfBCCs: int
    recipientType: str
    lengthOfThread: int
    responseTime: int
    recipientRoleLevel: str
    titleContent: str
    messageContent: str
    employeeID: str


class SummaryEntry(BaseModel):
    date: str
    employeeID: str
    role: Role
    department: str
    sent: int
    received: int
    internalSent: int
    externalSent: int
    avgResponseTime: float
    afterHoursSent: int
    avgRecipients: float
    avgThreadLength: float
    avgMessageTone: Tone  # TODO: implement this hihii


def read_email_data(file_path: str) -> List[EmailEntry]:
    email_data = []
    with open(file_path, mode="r", encoding="utf-8") as file:
        reader = csv.DictReader(file)

        email_data = [
            EmailEntry(
                timestamp=row["timestamp"],
                numberOfRecipients=int(row["numberOfRecipients"]),
                numberOfCCs=int(row["numberOfCCs"]),
                numberOfBCCs=int(row["numberOfBCCs"]),
                recipientType=row["recipientType"],
                lengthOfThread=int(row["lengthOfThread"]),
                responseTime=int(row["responseTime"]),
                recipientRoleLevel=row["recipientRoleLevel"],
                titleContent=row["titleContent"],
                messageContent=row["messageContent"],
                employeeID=row["employeeID"],
            )
            for row in reader
        ]
    return email_data


def analyze_email_data(file_path: str) -> List[SummaryEntry]:
    email_data = read_email_data(file_path)
    summary_map: Dict[str, SummaryEntry] = {}

    for email in email_data:
        date = email.timestamp.split(" ")[0]
        employee_id = email.employeeID
        department = (
            "Product Dev"
            if employee_id == "E001"
            else "Marketing" if employee_id == "E002" else "Sales"
        )

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

        # Update the summary entry
        summary.sent += 1
        summary.received += 1  # Assuming one received email per entry
        if email.recipientType == "internal":
            summary.internalSent += 1
        else:
            summary.externalSent += 1
        summary.avgResponseTime += email.responseTime
        hour_sent = email.timestamp.split(" ")[1].split(":")[0]
        if int(hour_sent) > 17 or int(hour_sent) < 7:
            summary.afterHoursSent += 1
        summary.avgRecipients += email.numberOfRecipients
        summary.avgThreadLength += email.lengthOfThread

    # Calculate averages
    for summary in summary_map.values():
        if summary.sent > 0:
            summary.avgResponseTime = round(summary.avgResponseTime / summary.sent)
            summary.avgRecipients = round(summary.avgRecipients / summary.sent, 1)
            summary.avgThreadLength = round(summary.avgThreadLength / summary.sent, 1)

    result = list(summary_map.values())

    return json.dumps(result, default=lambda o: o.__dict__)


def get_employee_insights(company_name: str) -> Dict:
    file_path = f"./data/email/{company_name}.csv"
    analysis = analyze_email_data(file_path)

    # save the result as a json to email_analysis_result.json
    with open(f"./results/email_analysis_result_{company_name}.json", "w") as f:
        f.write(str(analysis))

    return {"analysis": analysis}


company_name = "taidot_on"
get_employee_insights(company_name)

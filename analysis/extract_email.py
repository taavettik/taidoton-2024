import csv
from pydantic import BaseModel
import json
from typing import List, Dict


class EmailEntry(BaseModel):
    timestamp: str
    numberOfRecipients: int
    numberOfCCs: int
    numberOfBCCs: int
    recipientType: str
    lengthOfThread: int
    responseTime: int
    titleTone: str
    titleLength: int
    messageTone: str
    messageLength: int
    recipientRoleLevel: str
    employeeID: str


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


def read_email_data(file_path: str) -> List[EmailEntry]:
    email_data = []
    with open(file_path, mode="r", encoding="utf-8") as file:
        reader = csv.reader(file)
        next(reader)  # Skip header row
        for row in reader:
            email_data.append(
                EmailEntry(
                    timestamp=row[1],
                    numberOfRecipients=int(row[2]),
                    numberOfCCs=int(row[3]),
                    numberOfBCCs=int(row[4]),
                    recipientType=row[5],
                    lengthOfThread=int(row[6]),
                    responseTime=int(row[7]),
                    titleTone=row[8],
                    titleLength=int(row[9]),
                    messageTone=row[10],
                    messageLength=int(row[11]),
                    recipientRoleLevel=row[12],
                    employeeID=row[13],
                )
            )
    return email_data


def analyze_email_data(file_path: str) -> List[SummaryEntry]:
    email_data = read_email_data(file_path)
    summary_map: Dict[str, SummaryEntry] = {}

    for email in email_data:
        date = email.timestamp.split("T")[0]
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
        if "T22" in email.timestamp or "T23" in email.timestamp:
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


def get_employee_insights() -> Dict:
    file_path = "./data/email/generated_mock_data.csv"
    analysis = analyze_email_data(file_path)

    # save the result as a json to email_analysis_result.json
    with open("./results/email_analysis_result.json", "w") as f:
        f.write(str(analysis))

    return {"analysis": analysis}


get_employee_insights()

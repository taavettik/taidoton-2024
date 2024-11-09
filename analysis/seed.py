import json

TARGET_DB = "../server/db.json"
EMAIL_INPUT_FILES = ["./results/email_analysis_result_taidot_on.json"]
SLACK_INPUT_FILES = ["./results/slack_analysis_result.json"]

db = None
with open(TARGET_DB, "r") as f:
    db = json.loads(f.read())

for input_file in EMAIL_INPUT_FILES:
    with open(input_file, "r") as f:
        emails = json.loads(f.read())
        for email in emails:
            db["emails"].append(email)


for input_file in SLACK_INPUT_FILES:
    with open(input_file, "r") as f:
        emails = json.loads(f.read())
        for email in emails:
            db["slack"].append(email)


with open(TARGET_DB, "w") as f:
    f.write(json.dumps(db))

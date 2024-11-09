import json

TARGET_DB = "./db.json"
EMAIL_INPUT_FILES = ["./results/email_analysis_result_taidot_on.json"]

db = None
with open(TARGET_DB, "r") as f:
    db = json.loads(f.read())

for input_file in EMAIL_INPUT_FILES:
    with open(input_file, "r") as f:
        emails = json.loads(f.read())
        for email in emails:
            db["emails"].append(email)

with open(TARGET_DB, "w") as f:
    f.write(json.dumps(db))

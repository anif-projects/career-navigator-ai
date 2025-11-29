import csv
import json
import os

def csv_to_json(csv_path, json_path):
    data = []
    try:
        with open(csv_path, 'r', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                data.append(row)
        
        os.makedirs(os.path.dirname(json_path), exist_ok=True)
        
        with open(json_path, 'w', encoding='utf-8') as jsonfile:
            json.dump(data, jsonfile, indent=4)
        print(f"Successfully converted {csv_path} to {json_path}")
    except Exception as e:
        print(f"Error converting {csv_path}: {e}")

base_path = "d:/PROJECT_WORKSPACE/GITHUB_WORKSPACE/anif"
csv_files = [
    (f"{base_path}/career-navigator/data/ssc_cbse_schools_list.csv", f"{base_path}/career-navigator-ai/frontend/src/data/schools_cbse.json"),
    (f"{base_path}/career-navigator/data/ssc_state_schools_list.csv", f"{base_path}/career-navigator-ai/frontend/src/data/schools_state.json"),
    (f"{base_path}/career-navigator/data/secondary_college_list.csv", f"{base_path}/career-navigator-ai/frontend/src/data/schools_secondary.json"),
    (f"{base_path}/career-navigator/data/undergraduate_college_list.csv", f"{base_path}/career-navigator-ai/frontend/src/data/schools_undergraduate.json"),
    (f"{base_path}/career-navigator/data/postgraduate_college_list.csv", f"{base_path}/career-navigator-ai/frontend/src/data/schools_postgraduate.json")
]

for csv_in, json_out in csv_files:
    csv_to_json(csv_in, json_out)

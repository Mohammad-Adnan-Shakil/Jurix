import requests
import os
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("IK_API_KEY")

response = requests.post(
    "https://api.indiankanoon.org/search/",
    data={"formInput": "Article 21 personal liberty", "pagenum": 0},
    headers={"Authorization": f"Token {API_KEY}"}
)

print(f"Status: {response.status_code}")
print(response.json())
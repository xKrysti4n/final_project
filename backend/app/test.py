from datetime import datetime
from time import strptime


data1 = datetime.strptime("2025-06-05", "%Y-%m-%d")
data2 = datetime.strptime("2025-06-01", "%Y-%m-%d")

diff = (data1-data2).days

print(diff)

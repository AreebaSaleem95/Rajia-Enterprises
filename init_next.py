import subprocess
import sys

cmd = [
    "npx.cmd",
    "create-next-app@14.2.15",
    ".",
    "--typescript",
    "--tailwind",
    "--eslint",
    "--app",
    "--src-dir=false",
    "--import-alias=@/*",
    "--use-npm"
]

print("Running create-next-app...")
res = subprocess.run(cmd, shell=True)
print(f"Exited with code: {res.returncode}")

import os
import glob

downloads = r"C:\Users\786\Downloads"
patterns = ["*WhatsApp*.*", "*Gemini*.*", "*VESTO*.*", "*Rajia*.*", "*.jpeg", "*.jpg", "*.png"]

found = []
for p in patterns:
    for f in glob.glob(os.path.join(downloads, p)):
        if f.lower().endswith(('.jpg', '.jpeg', '.png', '.webp')):
            size = os.path.getsize(f)
            found.append((os.path.basename(f), size, f))

found = list(set(found))
found.sort(key=lambda x: x[1], reverse=True)

print(f"Total matching images found: {len(found)}")
for name, size, path in found[:25]:
    print(f"{name} ({size} bytes)")

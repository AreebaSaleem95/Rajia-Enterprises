import re
import os
import base64

html_path = r"C:\Rajia Enterprises\Rajia-Professional-Corporate-Final.html"
out_dir = r"C:\Rajia Enterprises\extracted_images"
os.makedirs(out_dir, exist_ok=True)

with open(html_path, "r", encoding="utf-8", errors="ignore") as f:
    content = f.read()

pattern = re.compile(r'data:image/([a-zA-Z]+);base64,([A-Za-z0-9+/=]+)')
matches = pattern.findall(content)

print(f"Total base64 images found: {len(matches)}")

for i, (ext, data_b64) in enumerate(matches):
    try:
        raw_bytes = base64.b64decode(data_b64)
        ext = "jpg" if ext.lower() in ["jpeg", "jpg"] else ext.lower()
        filepath = os.path.join(out_dir, f"asset_{i}.{ext}")
        with open(filepath, "wb") as img_f:
            img_f.write(raw_bytes)
        print(f"Saved asset_{i}.{ext} ({len(raw_bytes)} bytes)")
    except Exception as e:
        print(f"Error saving {i}: {e}")

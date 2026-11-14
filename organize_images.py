import os
import zipfile
import shutil

dest_dir = r"C:\Rajia Enterprises\public\images\products"
os.makedirs(dest_dir, exist_ok=True)

zip_path = r"C:\Users\786\Downloads\WhatsApp Unknown 2026-10-30 at 9.22.08 AM.zip"
with zipfile.ZipFile(zip_path, 'r') as z:
    z.extractall(dest_dir)

print(f"Extracted {len(os.listdir(dest_dir))} photos into {dest_dir}")
for f in os.listdir(dest_dir):
    print(f"  {f} ({os.path.getsize(os.path.join(dest_dir, f))} bytes)")

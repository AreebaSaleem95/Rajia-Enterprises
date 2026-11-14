import zipfile
import os

zip_path = r"C:\Users\786\Downloads\WhatsApp Unknown 2026-10-30 at 9.22.08 AM.zip"
if os.path.exists(zip_path):
    with zipfile.ZipFile(zip_path, 'r') as z:
        print("ZIP entries:")
        for info in z.infolist():
            print(f"  {info.filename} ({info.file_size} bytes)")
else:
    print("ZIP not found")

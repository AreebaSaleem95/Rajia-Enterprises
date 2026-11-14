import os
import shutil

src_dir = r"C:\Rajia Enterprises\public\images\products"
extracted_dir = r"C:\Rajia Enterprises\extracted_images"

# Asset 1, 2, 3 from extract.py:
# asset_0: 2719 bytes (logo or small icon)
# asset_1: 178270 bytes (trio/banner image)
# asset_2: 110478 bytes (features / packaging image)
# asset_3: 365789 bytes (fabric / vest image)

# Let's inspect the files in public/images/products:
files = sorted([f for f in os.listdir(src_dir) if f.endswith(('.jpeg', '.jpg', '.png', '.webp'))])

# Map into clean, semantic filenames:
# We will create directories:
# /public/images/products/jet-black/
# /public/images/products/heather-grey/
# /public/images/products/optic-white/
# /public/images/factory/
# /public/images/branding/

base_dir = r"C:\Rajia Enterprises\public\images"
for d in ["products/jet-black", "products/heather-grey", "products/optic-white", "factory", "branding", "packaging"]:
    os.makedirs(os.path.join(base_dir, d), exist_ok=True)

# Copy asset_0 as logo
if os.path.exists(os.path.join(extracted_dir, "asset_0.png")):
    shutil.copy(os.path.join(extracted_dir, "asset_0.png"), os.path.join(base_dir, "branding", "logo.png"))

# Copy extracted assets into branding/banners
if os.path.exists(os.path.join(extracted_dir, "asset_1.webp")):
    shutil.copy(os.path.join(extracted_dir, "asset_1.webp"), os.path.join(base_dir, "branding", "vesto-trio.webp"))
if os.path.exists(os.path.join(extracted_dir, "asset_2.webp")):
    shutil.copy(os.path.join(extracted_dir, "asset_2.webp"), os.path.join(base_dir, "packaging", "bulk-packaging.webp"))
if os.path.exists(os.path.join(extracted_dir, "asset_3.png")):
    shutil.copy(os.path.join(extracted_dir, "asset_3.png"), os.path.join(base_dir, "factory", "fabric-quality.png"))

# Map the WhatsApp product photos
# The 8 photos contain front, back, packaging, close-up, and folded views
for idx, f in enumerate(files):
    src = os.path.join(src_dir, f)
    # create copies for black, grey, white variants with specific angles
    if idx == 0: # front view
        shutil.copy(src, os.path.join(base_dir, "products", "jet-black", "front.jpg"))
        shutil.copy(src, os.path.join(base_dir, "products", "heather-grey", "front.jpg"))
        shutil.copy(src, os.path.join(base_dir, "products", "optic-white", "front.jpg"))
    elif idx == 1: # back view
        shutil.copy(src, os.path.join(base_dir, "products", "jet-black", "back.jpg"))
        shutil.copy(src, os.path.join(base_dir, "products", "heather-grey", "back.jpg"))
        shutil.copy(src, os.path.join(base_dir, "products", "optic-white", "back.jpg"))
    elif idx == 2: # side / angle
        shutil.copy(src, os.path.join(base_dir, "products", "jet-black", "side.jpg"))
        shutil.copy(src, os.path.join(base_dir, "products", "heather-grey", "side.jpg"))
        shutil.copy(src, os.path.join(base_dir, "products", "optic-white", "side.jpg"))
    elif idx == 3: # fabric texture
        shutil.copy(src, os.path.join(base_dir, "products", "jet-black", "fabric-texture.jpg"))
        shutil.copy(src, os.path.join(base_dir, "products", "heather-grey", "fabric-texture.jpg"))
        shutil.copy(src, os.path.join(base_dir, "products", "optic-white", "fabric-texture.jpg"))
    elif idx == 4: # stitching / overlock
        shutil.copy(src, os.path.join(base_dir, "products", "jet-black", "stitching.jpg"))
        shutil.copy(src, os.path.join(base_dir, "products", "heather-grey", "stitching.jpg"))
        shutil.copy(src, os.path.join(base_dir, "products", "optic-white", "stitching.jpg"))
    elif idx == 5: # folded / pack
        shutil.copy(src, os.path.join(base_dir, "products", "jet-black", "folded.jpg"))
        shutil.copy(src, os.path.join(base_dir, "products", "heather-grey", "folded.jpg"))
        shutil.copy(src, os.path.join(base_dir, "products", "optic-white", "folded.jpg"))
    elif idx == 6: # packaging box
        shutil.copy(src, os.path.join(base_dir, "packaging", "box-pack.jpg"))
    elif idx == 7: # bulk dispatch
        shutil.copy(src, os.path.join(base_dir, "factory", "cutting-stitching.jpg"))

print("Organized image galleries successfully!")

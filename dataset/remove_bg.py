from PIL import Image
import os

input_path = r"C:\Users\Acer\.gemini\antigravity\brain\23f20a9f-917c-48f8-bb97-a0e001b796b3\media__1784194558254.png"
output_dir = r"C:\Users\Acer\Desktop\Projects\Skillsync\src\assets"
output_path = os.path.join(output_dir, "logo.png")

os.makedirs(output_dir, exist_ok=True)

# Open image and convert to RGBA
img = Image.open(input_path).convert("RGBA")
pixels = img.load()
width, height = img.size

# Process pixels to remove checkerboard background
for y in range(height):
    for x in range(width):
        r, g, b, a = pixels[x, y]
        
        # Check if pixel is grey/white checkerboard:
        # 1. Pixel is near-greyscale (R, G, B are very close)
        # 2. Pixel is light/bright (intensity >= 190)
        is_grey = abs(r - g) <= 3 and abs(g - b) <= 3 and abs(r - b) <= 3
        is_bright = r >= 190
        
        if is_grey and is_bright:
            # Set pixel to fully transparent
            pixels[x, y] = (r, g, b, 0)

# Save processed image
img.save(output_path, "PNG")
print(f"Background removed successfully. Cleaned logo saved to: {output_path}")

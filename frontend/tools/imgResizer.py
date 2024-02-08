import os
from PIL import Image

def resize_image(input_path, output_path, target_width, target_height):
    img = Image.open(input_path)
    resized_image = img.resize((target_width, target_height))
    resized_image.save(output_path)

script_dir = os.path.dirname(os.path.realpath(__file__))
input_img_path = os.path.join(script_dir, "rawImgs", "carousel4.png")
output_dir = os.path.join(script_dir, "imgs")
output_img_file = "carousel4.png"
output_img_path = os.path.join(output_dir, output_img_file)

print("Current working directory:", os.getcwd().replace("\\\\", "\\"))
print(output_img_path, input_img_path)

resize_image(input_img_path, output_img_path, 1000, 500)

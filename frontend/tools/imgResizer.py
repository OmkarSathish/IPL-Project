from PIL import Image
import os

def resize_image(input_path, output_path, target_width, target_height):
    # Open the image file
    img = Image.open(input_path)

    # Resize the image
    resized_img = img.resize((target_width, target_height))

    # Save the resized image
    resized_img.save(output_path)

# Example usage
script_directory = os.path.dirname(os.path.realpath(__file__))
input_image_path = os.path.join(script_directory, "rawImgs", "carousel1.jpg").replace("\\\\", "\\")
output_directory = os.path.join(script_directory, "resizedImgs")
output_image_filename = "carousel1.jpg"
output_image_path = os.path.join(output_directory, output_image_filename)

print("Current working directory:", os.getcwd().replace("\\\\", "\\"))

resize_image(input_image_path, output_image_path, 1000, 500)

// Class definition for ImageGenerator
class ImageGenerator {
  constructor() {
    // Initialize any necessary properties
  }

  generatePNG(elementId, callback) {
    const element = document.getElementById(elementId);
    if (!element) {
      console.error('Element not found');
      return;
    }

    html2canvas(element).then(canvas => {
      const dataURL = canvas.toDataURL('image/png');
      callback(dataURL);
    }).catch(error => {
      console.error('Error generating PNG:', error);
    });
  }
}

// Export the class for use in other scripts
window.ImageGenerator = ImageGenerator;

// Function to upload the image to Bubble
function uploadImageToBubble(dataURL) {
  const apiUrl = 'https://comparateur-82079.bubbleapps.io/version-test/api/1.1/wf/save_image'; // URL de votre workflow API
  const payload = {
    image: dataURL
  };

  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
  .then(response => response.json())
  .then(data => {
    console.log('Image uploaded successfully:', data);
  })
  .catch((error) => {
    console.error('Error uploading image:', error);
  });
}

// Function to generate and upload the PNG
function generateAndUploadPNG() {
  const imgGen = new ImageGenerator();
  imgGen.generatePNG('group-to-export', uploadImageToBubble);
}

// You can trigger this function from a button click or other event
generateAndUploadPNG();



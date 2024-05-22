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

window.ImageGenerator = ImageGenerator;

function dataURLToBlob(dataURL) {
  const parts = dataURL.split(',');
  const byteString = atob(parts[1]);
  const mimeString = parts[0].split(':')[1].split(';')[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ab], {type: mimeString});
}

function uploadImageToBubble(dataURL) {
  const apiUrl = 'https://comparateur-82079.bubbleapps.io/version-test/api/1.1/wf/save_image'; // URL de votre workflow API
  const blob = dataURLToBlob(dataURL);
  const formData = new FormData();
  formData.append('file', blob, 'image.png');

  fetch(apiUrl, {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    console.log('Image uploaded successfully:', data);
  })
  .catch((error) => {
    console.error('Error uploading image:', error);
  });
}

function generateAndUploadPNG() {
  const imgGen = new ImageGenerator();
  imgGen.generatePNG('group-to-export', uploadImageToBubble);
}

// You can trigger this function from a button click or other event
generateAndUploadPNG();

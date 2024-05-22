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

  return new Blob([ab], { type: mimeString });
}

function uploadImageToBubble(dataURL) {
  const apiUrl = 'https://comparateur-82079.bubbleapps.io/version-test/api/1.1/wf/save_image'; // URL de votre workflow API
  const blob = dataURLToBlob(dataURL);
  const formData = new FormData();
  formData.append('file', blob, 'image.png');

  // Vérifiez que le fichier est bien ajouté au FormData
  for (let pair of formData.entries()) {
    console.log(pair[0] + ', ' + pair[1]);
  }

  fetch(apiUrl, {
    method: 'POST',
    body: formData
  })
    .then(response => {
      if (!response.ok) {
        return response.text().then(text => { throw new Error('Network response was not ok: ' + response.status + ' ' + response.statusText + '\n' + text); });
      }
      return response.json();
    })
    .then(data => {
      console.log('Image uploaded successfully:', data);
      alert('Image uploaded successfully: ' + JSON.stringify(data));
    })
    .catch(error => {
      console.error('Error uploading image:', error);
      alert('Error uploading image: ' + error.message);
    });
}

function generateAndUploadPNG() {
  const imgGen = new ImageGenerator();
  imgGen.generatePNG('group-to-export', uploadImageToBubble);
}

window.generateAndUploadPNG = generateAndUploadPNG;

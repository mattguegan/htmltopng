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

  for (let i = 0; i < byteString.length; i

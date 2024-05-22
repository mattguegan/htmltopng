class ImageGenerator {
  constructor() {
    // Initialisation des propriétés nécessaires
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

// Exportation de la classe pour une utilisation dans d'autres scripts
window.ImageGenerator = ImageGenerator;


class ImageGenerator {
  constructor() {
    // Initialize any necessary properties
  }

  generatePNG(elementId, filename = 'output.png') {
    const element = document.getElementById(elementId);
    if (!element) {
      console.error('Element not found');
      return;
    }

    html2canvas(element).then(canvas => {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = filename;
      link.click();
    }).catch(error => {
      console.error('Error generating PNG:', error);
    });
  }
}

// Export the class for use in other scripts
window.ImageGenerator = ImageGenerator;

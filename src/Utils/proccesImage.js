const processImages = (imageFiles) => {
    //('Ajustando fotos para subir en processImages');
  
    // Dimensiones deseadas de la imagen final (relación 2:1)
    const TARGET_WIDTH = 1866;  // 2:1 (1866px de ancho y 933px de alto)
    const TARGET_HEIGHT = 933;
    const TARGET_ASPECT_RATIO = TARGET_WIDTH / TARGET_HEIGHT; // 2:1
  
    const processingPromises = imageFiles.map((imageFile) => {
      return new Promise((resolve, reject) => {
        if (!(imageFile instanceof Blob || imageFile instanceof File)) {
          reject(new TypeError('El argumento no es un archivo de imagen válido.'));
          return;
        }
  
        const img = new Image();
        img.onload = () => {
          URL.revokeObjectURL(img.src); // Liberar URL temporal
  
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
  
          canvas.width = TARGET_WIDTH;
          canvas.height = TARGET_HEIGHT;
  
          // Relación de aspecto de la imagen original
          const imageAspectRatio = img.width / img.height;
  
          let cropWidth, cropHeight, offsetX, offsetY;
  
          // Ajustar el recorte para que la imagen tenga la relación de aspecto 2:1
          if (imageAspectRatio > TARGET_ASPECT_RATIO) {
            // La imagen es más ancha que la relación de aspecto objetivo
            cropHeight = img.height;
            cropWidth = cropHeight * TARGET_ASPECT_RATIO;
            offsetX = (img.width - cropWidth) / 2;
            offsetY = 0;
          } else {
            // La imagen es más alta que la relación de aspecto objetivo
            cropWidth = img.width;
            cropHeight = cropWidth / TARGET_ASPECT_RATIO;
            offsetX = 0;
            offsetY = (img.height - cropHeight) / 2;
          }
  
          // Dibujar la imagen recortada en el lienzo
          ctx.drawImage(
            img,
            offsetX, offsetY, cropWidth, cropHeight, // Área recortada
            0, 0, canvas.width, canvas.height       // Escalar al tamaño objetivo
          );
  
          // Convertir el canvas a un Blob y crear un nuevo archivo
          canvas.toBlob(
            (blob) => {
              if (blob) {
                const processedImage = new File([blob], 'image.webp', { type: 'image/webp' });
                resolve(processedImage);
              } else {
                reject(new Error('Error al procesar la imagen.'));
              }
            },
            'image/webp',
            0.8 // Calidad del archivo .webp
          );
        };
  
        img.onerror = () => reject(new Error('Error al cargar la imagen.'));
        img.src = URL.createObjectURL(imageFile);
      });
    });
  
    return Promise.all(processingPromises);
  };
  
  export default processImages;
  
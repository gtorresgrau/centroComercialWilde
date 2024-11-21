const processImages = (imageFiles) => {
  console.log('Ajustando fotos para subir en processImages');

  const processingPromises = imageFiles.map((imageFile) => {
      return new Promise((resolve, reject) => {
          if (!(imageFile instanceof Blob || imageFile instanceof File)) {
              reject(new TypeError('El argumento no es un archivo de imagen válido.'));
              return;
          }

          const img = new Image();
          img.onload = () => {
              URL.revokeObjectURL(img.src); // Release temporary URL

              const canvas = document.createElement('canvas');
              const ctx = canvas.getContext('2d');

              canvas.width = 1024;
              canvas.height = 731;

              const aspectRatio = 7 / 5;
              const side = Math.min(img.width, img.height / aspectRatio);
              const offsetX = (img.width - side * aspectRatio) / 2;
              const offsetY = (img.height - side) / 2;

              ctx.drawImage(
                  img,
                  offsetX, offsetY, side * aspectRatio, side,
                  0, 0, canvas.width, canvas.height
              );

              canvas.toBlob(
                  (blob) => {
                      if (blob) {
                          const imgRetocada = new File([blob], 'image.webp', { type: 'image/webp' });
                          resolve(imgRetocada);
                      } else {
                          reject(new Error('Error al procesar la imagen.'));
                      }
                  },
                  'image/webp',
                  0.8
              );
          };

          img.onerror = () => reject(new Error('Error al cargar la imagen.'));
          img.src = URL.createObjectURL(imageFile);
      });
  });

  return Promise.all(processingPromises);
};

export default processImages;

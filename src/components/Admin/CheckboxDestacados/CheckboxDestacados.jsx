import React from 'react';

function Checkbox({ product, onToggleDestacados }) {
    
  const handleCheckboxChange = async () => {
    try {
      const updatedProduct = { ...product, destacados: !product.destacados };
      await fetch(`/api/updateDestacados`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProduct),
      });
      onToggleDestacados(updatedProduct); // Actualiza el estado local después de la respuesta exitosa
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <input
      type="checkbox"
      checked={product.destacados}
      onChange={handleCheckboxChange}
    />
  );
}

export default Checkbox;

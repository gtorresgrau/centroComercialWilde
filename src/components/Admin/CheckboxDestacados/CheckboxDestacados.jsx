import React, { useState, useEffect } from 'react';

const CheckboxDestacados = ({ email, handleCheckboxChange }) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    // Initialize checkbox state if needed (if you fetch checked state from a server)
  }, []);

  const handleChange = () => {
    setIsChecked(prev => !prev);
    handleCheckboxChange(email, !isChecked);
  };

  return (
    <input
      type="checkbox"
      checked={isChecked}
      onChange={handleChange}
    />
  );
};

export default CheckboxDestacados;

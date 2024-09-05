import React from 'react';

const CheckboxDestacados = ({ email, handleCheckboxChange, isChecked }) => {
  return (
    <input
      type="checkbox"
      checked={isChecked}
      onChange={() => handleCheckboxChange(email)}
      className="form-checkbox h-4 w-4 text-primary"
    />
  );
};

export default CheckboxDestacados;
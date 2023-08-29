import React, { useState } from 'react';

const FilterForm = ({ onFilterSubmit }) => {
  const [selectedTypes, setSelectedTypes] = useState([]);

  const handleCheckboxChange = (types) => {
    if (types === 'All') {
      setSelectedTypes(selectedTypes.length === 0 ? ['All'] : []);
    } else {
      const updatedSelectedTypes = selectedTypes.includes(types)
        ? selectedTypes.filter(selectedType => selectedType !== types)
        : [...selectedTypes, types];
      setSelectedTypes(updatedSelectedTypes);
    }
  };

  const handleSubmit = () => {
    // Panggil fungsi onFilterSubmit dari parent dengan nilai filter yang dipilih
    onFilterSubmit(selectedTypes);
  };

  return (
    <div className="mb-4">
      <label className="font-semibold">Filter by Type:</label>
      <div className="flex space-x-4">
      <label>
          <input
            type="checkbox"
            value="All"
            checked={selectedTypes.includes('All')}
            onChange={() => handleCheckboxChange('All')}
            onClick={handleSubmit}
          />
          All
        </label>
        <label>
          <input
            type="checkbox"
            value="Voucher"
            checked={selectedTypes.includes('Voucher')}
            onChange={() => handleCheckboxChange('Voucher')}
            onClick={handleSubmit}
          />
          Voucher
        </label>
        <label>
          <input
            type="checkbox"
            value="Product"
            checked={selectedTypes.includes('Product')}
            onChange={() => handleCheckboxChange('Product')}
            onClick={handleSubmit}
          />
          Product
        </label>
        <label>
          <input
            type="checkbox"
            value="Giftcard"
            checked={selectedTypes.includes('Giftcard')}
            onChange={() => handleCheckboxChange('Giftcard')}
            onClick={handleSubmit}
          />
          Giftcard
        </label>
      </div>
    </div>
  );
};

export default FilterForm;

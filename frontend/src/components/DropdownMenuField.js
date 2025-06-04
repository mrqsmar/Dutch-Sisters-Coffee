import React, { useState } from 'react';

function DropdownMenuField({ ids, onSelect }) {
  const [selectedId, setSelectedId] = useState('');

  const handleSelect = (event) => {
    const selectedId = event.target.value;
    setSelectedId(selectedId);
    onSelect(selectedId); // Call the callback function with the selected ID
  };

  return (
    <div>
      <select className='select-field' value={selectedId} onChange={handleSelect}>
        <option value="">Select an ID</option>
        {ids.map((id) => (
          <option key={id} value={id}>
            {id}
          </option>
        ))}
      </select>
    </div>
  );
}

export default DropdownMenuField;
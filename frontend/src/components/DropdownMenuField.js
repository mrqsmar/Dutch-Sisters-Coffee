import React, { useState } from 'react';

function DropdownMenuField({ ids }) {
	console.log(ids);

  const [selectedId, setSelectedId] = useState('');

  const handleSelect = (event) => {
    setSelectedId(event.target.value);
  };

  return (
    <div>
      <select value={selectedId} onChange={handleSelect}>
        <option value="">Select an ID</option>
        {ids.map((id) => (
          <option key={id} value={id}>
            {id}
          </option>
        ))}
      </select>
      <p>Selected ID: {selectedId}</p>
    </div>
  );
}

export default DropdownMenuField;


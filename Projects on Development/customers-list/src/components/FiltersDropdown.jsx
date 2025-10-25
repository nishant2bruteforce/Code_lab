import React, { useState } from 'react'

export default function FiltersDropdown({ onChange }) {
  const [selected, setSelected] = useState('Filter 1')

  const handleChange = e => {
    setSelected(e.target.value)
    if (onChange) onChange(e.target.value)
  }

  return (
    <select value={selected} onChange={handleChange} className="filters-dropdown">
      <option value="Filter 1">Filter 1</option>
      <option value="Filter 2">Filter 2</option>
      <option value="Filter 3">Filter 3</option>
    </select>
  )
}

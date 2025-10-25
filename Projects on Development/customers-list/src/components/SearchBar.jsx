import React from 'react'

export default function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Search by name, email or phone..."
      value={value}
      onChange={e => onChange(e.target.value)}
      style={{
        padding: '8px 12px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        width: '250px'
      }}
    />
  )
}

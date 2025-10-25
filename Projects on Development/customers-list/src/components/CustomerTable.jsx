import React, { useState } from 'react'

export default function CustomerTable({ data, onSort, sortConfig }) {
  const [selectedRows, setSelectedRows] = useState([])

  const toggleRow = index => {
    setSelectedRows(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    )
  }

  const getSortIndicator = key => {
    if (sortConfig.key !== key) return ''
    return sortConfig.direction === 'asc' ? ' 🔼' : ' 🔽'
  }

  return (
    <table>
      <thead>
        <tr>
          <th>
            <input
              type="checkbox"
              checked={selectedRows.length === data.length && data.length > 0}
              onChange={e =>
                setSelectedRows(e.target.checked ? data.map((_, i) => i) : [])
              }
            />
          </th>
          <th onClick={() => onSort('name')}>Customer Name {getSortIndicator('name')}</th>
          <th onClick={() => onSort('score')}>Score {getSortIndicator('score')}</th>
          <th onClick={() => onSort('email')}>Email {getSortIndicator('email')}</th>
          <th onClick={() => onSort('lastMessage')}>Last Message Sent At {getSortIndicator('lastMessage')}</th>
          <th onClick={() => onSort('addedBy')}>Added By {getSortIndicator('addedBy')}</th>
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan="6" style={{ textAlign: 'center' }}>No records found</td>
          </tr>
        ) : (
          data.map((customer, index) => (
            <tr key={index}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedRows.includes(index)}
                  onChange={() => toggleRow(index)}
                />
              </td>
              <td className="customer-name">
                <img src="/rahul.svg" alt="profile" />
                <div>
                  <strong>{customer.name}</strong>
                  <div style={{ fontSize: '12px', color: '#555' }}>{customer.phone}</div>
                </div>
              </td>
              <td className="score">{customer.score}</td>
              <td className="email">{customer.email}</td>
              <td className="lastMessage">{customer.lastMessage}</td>
              <td className="addedBy">{customer.addedBy}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  )
}

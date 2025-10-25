export default function TableHeader({ onSort, sortConfig }) {
  const headers = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'score', label: 'Score' },
    { key: 'lastMessageAt', label: 'Last Message' },
    { key: 'addedBy', label: 'Added By' }
  ]

  return (
    <thead>
      <tr>
        {headers.map(h => (
          <th key={h.key} onClick={() => onSort(h.key)}>
            {h.label}
            {sortConfig.key === h.key ? (sortConfig.direction === 'asc' ? ' ↑' : ' ↓') : ''}
          </th>
        ))}
      </tr>
    </thead>
  )
}

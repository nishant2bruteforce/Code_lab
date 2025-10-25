import { useEffect, useMemo, useState } from 'react'
import CustomerTable from './components/CustomerTable.jsx'
import SearchBar from './components/SearchBar.jsx'
import FiltersDropdown from './components/FiltersDropdown.jsx'
import { generateData } from './utils/dataGenerator.js'
import './styles/table.css'
import './App.css'

export default function App() {
  const [data, setData] = useState([])
  const [search, setSearch] = useState('')
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null })

  useEffect(() => {
    const records = generateData(1000)
    setData(records)
  }, [])

  const filteredData = useMemo(() => {
    if (!search) return data
    const lower = search.toLowerCase()
    return data.filter(
      d =>
        d.name.toLowerCase().includes(lower) ||
        d.email.toLowerCase().includes(lower) ||
        d.lastMessage.includes(lower)
    )
  }, [data, search])

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData
    return [...filteredData].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1
      return 0
    })
  }, [filteredData, sortConfig])

  const handleSort = key => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }))
  }

  return (
    <div className="container">
      <div className="header-section">
        <h1 className="main-header">
          <img src="/tt.jpg" alt="icon" className="header-icon" />
          Double Tick
        </h1>
        <h3 className="sub-header">All Customers</h3>
      </div>

      <div className="controls">
        <SearchBar value={search} onChange={setSearch} />
        <FiltersDropdown />
      </div>

      <CustomerTable data={sortedData} onSort={handleSort} sortConfig={sortConfig} />
    </div>
  )
}

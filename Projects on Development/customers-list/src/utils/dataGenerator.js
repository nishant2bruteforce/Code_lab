

function randomDate(start, end) {
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
  return date.toISOString().split('T')[0]
}

export function generateData(count = 1000) {
  const records = []

  for (let i = 1; i <= count; i++) {
    records.push({
      name: `Customer ${i}`,
      profile: '/rahul.svg',
      phone: '+917600000001',
      score: Math.floor(Math.random() * 100),
      email: `customer${i}@example.com`,
      lastMessage: randomDate(new Date(2023, 0, 1), new Date()),
      addedBy: 'Kartikey Mishra'
    })
  }

  return records
}

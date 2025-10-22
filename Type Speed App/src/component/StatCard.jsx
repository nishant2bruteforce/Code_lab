function StatCard({ label, value }) {
     return (
          <div className="flex-1 bg-white border rounded p-3 text-center">
               <div className="text-xs text-gray-500">{label}</div>
               <div className="text-2xl font-mono">{value}</div>
          </div>
     );
}

export default StatCard;
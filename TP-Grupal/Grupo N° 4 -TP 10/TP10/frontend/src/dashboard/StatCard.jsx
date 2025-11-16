export default function StatCard({ title = 'Título', value = '0' }) {
  return (
    <div className="border rounded p-3 mb-3 text-center bg-light">
      <h5>{title}</h5>
      <p className="fw-bold">{value}</p>
    </div>
  )
}
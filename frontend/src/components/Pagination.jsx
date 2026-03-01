export default function Pagination({
  total,
  filters,
  setFilters,
}) {

  const totalPages = Math.ceil(total / 12);

  return (
    <div className="flex gap-2 justify-center mt-8">
      {Array.from({ length: totalPages }).map((_, i) => (
        <button
          key={i}
          onClick={() =>
            setFilters({ ...filters, page: i + 1 })
          }
          className="px-3 py-1 border rounded"
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
}
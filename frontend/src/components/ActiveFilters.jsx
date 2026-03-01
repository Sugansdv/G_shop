export default function ActiveFilters({ filters, setFilters }) {

  const removeFilter = key =>
    setFilters({ ...filters, [key]: "" });

  return (
    <div className="flex gap-2 mb-4">

      {Object.entries(filters).map(
        ([k, v]) =>
          v && k !== "page" && (
            <span
              key={k}
              className="bg-yellow-400 px-3 py-1 rounded"
            >
              {k}:{v}
              <button onClick={() => removeFilter(k)}>
                ✕
              </button>
            </span>
          )
      )}
    </div>
  );
}
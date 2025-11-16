// Pagination.jsx — controles simples de paginación
import { Pagination } from "react-bootstrap";

export default function PaginationControls({
  page = 1,
  pageSize = 10,
  total = 0,
  onChange,
}) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  // Ventana de páginas (máx 7 botones numéricos)
  const windowSize = 7;
  const half = Math.floor(windowSize / 2);
  let start = Math.max(1, page - half);
  let end = Math.min(totalPages, start + windowSize - 1);
  if (end - start + 1 < windowSize) start = Math.max(1, end - windowSize + 1);

  const pages = [];
  for (let p = start; p <= end; p++) pages.push(p);

  return (
    <Pagination className="mb-0">
      <Pagination.First disabled={page === 1} onClick={() => onChange(1)} />
      <Pagination.Prev disabled={page === 1} onClick={() => onChange(page - 1)} />

      {start > 1 && <Pagination.Ellipsis disabled />}
      {pages.map((p) => (
        <Pagination.Item
          key={p}
          active={p === page}
          onClick={() => onChange(p)}
        >
          {p}
        </Pagination.Item>
      ))}
      {end < totalPages && <Pagination.Ellipsis disabled />}

      <Pagination.Next disabled={page === totalPages} onClick={() => onChange(page + 1)} />
      <Pagination.Last disabled={page === totalPages} onClick={() => onChange(totalPages)} />
    </Pagination>
  );
}

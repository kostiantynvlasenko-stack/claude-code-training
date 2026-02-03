interface TableProps {
  data: Array<{ id: number; [key: string]: unknown }>;
  columns: string[];
}

// ISSUE #7: Duplicated rendering logic - same empty state check as in List.tsx
// Should extract to shared component or utility
export function Table({ data, columns }: TableProps) {
  if (!data || data.length === 0) {
    return <div className="empty">No data available</div>;
  }

  return (
    <table className="data-table">
      <thead>
        <tr>
          {columns.map(col => (
            <th key={col}>{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map(item => (
          <tr key={item.id}>
            {columns.map(col => (
              <td key={col}>{String(item[col] ?? '')}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

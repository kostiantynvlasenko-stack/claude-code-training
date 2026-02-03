interface ListProps {
  data: Array<{ id: number; [key: string]: unknown }>;
  fields: string[];
}

// ISSUE #7: Same logic as Table.tsx - should be refactored
// Both components have identical empty state handling
export function List({ data, fields }: ListProps) {
  if (!data || data.length === 0) {
    return <div className="empty">No data available</div>;
  }

  return (
    <ul className="data-list">
      {data.map(item => (
        <li key={item.id} className="list-item">
          {fields.map(field => (
            <span key={field} className="field">
              <strong>{field}:</strong> {String(item[field] ?? '')}
            </span>
          ))}
        </li>
      ))}
    </ul>
  );
}

// Should refactor to:
// 1. Extract empty state to shared component: <EmptyState message="No data available" />
// 2. Or create a shared hook/utility for data rendering

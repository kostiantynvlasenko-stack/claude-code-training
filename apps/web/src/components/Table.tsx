import React from 'react';

export type TableProps = {
  items: string[];
};

export function Table({ items }: TableProps) {
  return (
    <table className="table">
      <tbody>
        {items.map((item) => (
          <tr key={item}>
            <td>{item}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

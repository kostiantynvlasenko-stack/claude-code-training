import React from 'react';

export type ListProps = {
  items: string[];
};

export function List({ items }: ListProps) {
  return (
    <ul className="list">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

import { useState, useEffect } from 'react';

// ISSUE #8 (MEDIUM): No error handling in fetch hook
// Errors are silently swallowed, making debugging difficult
export function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  // Missing: const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // No try-catch, no error state
    // If fetch fails, component has no way to know
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      });
    // Missing: .catch(err => { setError(err); setLoading(false); });
  }, [url]);

  return { data, loading };
  // Should return: { data, loading, error }
}

// Fixed version:
// export function useFetchSafe<T>(url: string) {
//   const [data, setData] = useState<T | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<Error | null>(null);
//
//   useEffect(() => {
//     setLoading(true);
//     setError(null);
//
//     fetch(url)
//       .then(res => {
//         if (!res.ok) throw new Error(`HTTP ${res.status}`);
//         return res.json();
//       })
//       .then(setData)
//       .catch(setError)
//       .finally(() => setLoading(false));
//   }, [url]);
//
//   return { data, loading, error };
// }

import React, { useEffect, useState } from "react";

// React component that fetches EscuelaJS products and logs to console
// Usage: import and render <FetchEscuelaProducts /> anywhere; it will fetch on mount.
export default function FetchEscuelaProducts({ limit = 50, offset = 0, categoryId, fetchAll = false, maxPages = 50 }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams();
    params.set("limit", String(limit));
    params.set("offset", String(offset));
    if (categoryId) params.set("categoryId", String(categoryId));

    const baseUrl = `https://api.escuelajs.co/api/v1/products`;

    (async () => {
      try {
        if (!fetchAll) {
          const url = `${baseUrl}?${params.toString()}`;
          const res = await fetch(url);
          if (!res.ok) {
            const msg = `EscuelaJS fetch failed: ${res.status} ${res.statusText}`;
            console.error(msg);
            setError(msg);
            return;
          }
          const data = await res.json();
        } else {
          // Fetch all pages sequentially until a page returns fewer than limit items
          const all = [];
          let page = 0;
          for (; page < maxPages; page++) {
            const pageParams = new URLSearchParams();
            pageParams.set("limit", String(limit));
            pageParams.set("offset", String(page * limit));
            if (categoryId) pageParams.set("categoryId", String(categoryId));
            const url = `${baseUrl}?${pageParams.toString()}`;
            const res = await fetch(url);
            if (!res.ok) {
              const msg = `EscuelaJS fetch failed at page ${page}: ${res.status} ${res.statusText}`;
              console.error(msg);
              setError(msg);
              break;
            }
            const data = await res.json();
            if (!Array.isArray(data) || data.length === 0) {
              break;
            }
            all.push(...data);
            if (data.length < limit) {
              // Last page reached
              break;
            }
          }
        }
      } catch (err) {
        console.error("EscuelaJS fetch error:", err);
        setError(String(err));
      } finally {
        setLoading(false);
      }
    })();
  }, [limit, offset, categoryId]);

  return (
    <div className="element">
      {loading && <p>Fetching EscuelaJS products…</p>}
      {error && <p className="text_color03">Error: {error}</p>}
      {!loading && !error && (
        <p>
          {fetchAll ? 'Fetched all pages. ' : 'Fetched one page. '}Check console for products.
        </p>
      )}
    </div>
  );
}

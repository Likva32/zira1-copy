import { useState, useEffect, useRef } from 'react';

export interface PlaceSuggestion {
  name: string;
  city: string;
  country: string;
  displayName: string;
  lat: number;
  lng: number;
}

function parseFeature(f: any): PlaceSuggestion {
  const p = f.properties ?? {};
  const name = p.name ?? '';
  const city = p.city ?? p.town ?? p.village ?? p.county ?? '';
  const country = p.country ?? '';
  const street = p.street ?? '';

  let display = '';
  if (name && name !== city) display = name;
  if (street && street !== name) display = display ? `${display}, ${street}` : street;
  if (city) display = display ? `${display}, ${city}` : city;
  if (country && country !== 'Israel') display = display ? `${display}, ${country}` : country;

  return {
    name: name || city,
    city,
    country,
    displayName: display || p.display_name || name,
    lat: f.geometry?.coordinates?.[1] ?? 0,
    lng: f.geometry?.coordinates?.[0] ?? 0,
  };
}

export function usePlacesSearch(query: string, debounceMs = 300) {
  const [suggestions, setSuggestions] = useState<PlaceSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const controllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (!query.trim() || query.length < 2) {
      setSuggestions([]);
      setLoading(false);
      return;
    }

    timerRef.current = setTimeout(async () => {
      if (controllerRef.current) controllerRef.current.abort();
      controllerRef.current = new AbortController();

      setLoading(true);
      try {
        // Bias results toward Israel (lat/lng center of Israel)
        const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=8&lat=31.5&lon=34.75&lang=en`;
        const res = await fetch(url, { signal: controllerRef.current.signal });
        const data = await res.json();
        const features: any[] = data.features ?? [];

        // Filter to Israel results and deduplicate by displayName
        const seen = new Set<string>();
        const results: PlaceSuggestion[] = [];
        for (const f of features) {
          if (f.properties?.country !== 'Israel' && f.properties?.country !== 'ישראל') continue;
          const s = parseFeature(f);
          if (!seen.has(s.displayName)) {
            seen.add(s.displayName);
            results.push(s);
          }
          if (results.length >= 6) break;
        }

        // If fewer than 3 Israel results, also include non-Israel with lower priority
        if (results.length < 3) {
          for (const f of features) {
            const s = parseFeature(f);
            if (!seen.has(s.displayName)) {
              seen.add(s.displayName);
              results.push(s);
            }
            if (results.length >= 6) break;
          }
        }

        setSuggestions(results);
      } catch (e: any) {
        if (e.name !== 'AbortError') setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }, debounceMs);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [query, debounceMs]);

  return { suggestions, loading };
}

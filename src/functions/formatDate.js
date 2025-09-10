// lib/formatDate.js
export function formatDate(input, opts = {}) {
  const {
    utc = false,              // format in UTC instead of local time
    assumeDayFirst = true,    // for "01-02-2025" → true: 01=day, false: 01=month
  } = opts;

  const d = toDate(input, { assumeDayFirst });
  if (!d || Number.isNaN(d.getTime())) return ""; // or return null / throw

  const year  = utc ? d.getUTCFullYear() : d.getFullYear();
  const month = (utc ? d.getUTCMonth() : d.getMonth()) + 1;
  const day   = utc ? d.getUTCDate() : d.getDate();

  return [pad2(day), pad2(month), String(year)].join("-");
}

function pad2(n) {
  return String(n).padStart(2, "0");
}

function toDate(value, { assumeDayFirst }) {
  if (!value && value !== 0) return null;

  // Already a Date
  if (value instanceof Date) return new Date(value.getTime());

  // Numeric timestamps
  if (typeof value === "number") {
    // 10-digit seconds vs 13-digit millis
    const ms = value < 1e12 ? value * 1000 : value;
    const d = new Date(ms);
    return isValid(d) ? d : null;
  }

  // Strings
  if (typeof value === "string") {
    const s = value.trim();
    if (!s) return null;

    // Pure numeric string → timestamp
    if (/^\d+$/.test(s)) {
      const num = Number(s);
      const ms = s.length <= 10 ? num * 1000 : num; // seconds vs millis
      const d = new Date(ms);
      return isValid(d) ? d : null;
    }

    // Try native parser first (handles ISO like 2025-09-10T12:30:00Z)
    const guess = new Date(s);
    if (isValid(guess)) return guess;

    // Manual parse for common patterns using non-digits as separators
    const parts = s.split(/\D+/).filter(Boolean).map(Number);
    if (parts.length >= 3) {
      // Y-M-D (e.g., 2025-09-10, 2025.9.10)
      if (/^\s*\d{4}\D/.test(s)) {
        const [y, m, d] = parts;
        return buildExactDate(y, m, d);
      }

      // D-M-Y or M-D-Y (e.g., 10/09/2025 or 09-10-25)
      let [a, b, c] = parts;
      // normalize 2-digit year → 2000-2099 (adjust if you want a different window)
      if (c < 100) c += 2000;

      let day, month, year;
      if (assumeDayFirst) {
        // Heuristics to auto-correct when obvious
        // If first > 12 → definitely day-first
        if (a > 12) { day = a; month = b; year = c; }
        // If second > 12 → definitely month is first, so day-second
        else if (b > 12) { month = a; day = b; year = c; }
        else { day = a; month = b; year = c; }
      } else {
        // Assume month-first unless second > 12
        if (b > 12) { day = a; month = b; year = c; }
        else { month = a; day = b; year = c; }
      }

      return buildExactDate(year, month, day);
    }
  }

  return null;
}

function buildExactDate(y, m, d) {
  const dt = new Date(y, (m || 1) - 1, d || 1);
  // Validate (avoid 2025-02-31 rolling to March)
  return (dt.getFullYear() === y && dt.getMonth() === (m - 1) && dt.getDate() === d)
    ? dt
    : null;
}

function isValid(d) {
  return d instanceof Date && !Number.isNaN(d.getTime());
}

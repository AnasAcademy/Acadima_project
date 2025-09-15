"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useApiClient } from "@/hooks/useApiClient";

function toTitle(str) {
  return String(str)
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (m) => m.toUpperCase());
}

const isBooleanLike = (v) => {
  if (typeof v === "boolean") return true;
  if (typeof v === "number") return v === 0 || v === 1;
  if (typeof v === "string")
    return v === "0" || v === "1" || v === "true" || v === "false";
  return false;
};

// Normalize for component state
const normalizeForState = (v) => {
  if (isBooleanLike(v)) {
    if (v === true || v === "true") return "1";
    if (v === false || v === "false") return "0";
    return String(Number(v)); // "1"/"0"
  }
  return v == null ? "" : String(v);
};

// Pick translation object for the current locale, with fallbacks
function pickTranslation(setting, locale) {
  const list = Array.isArray(setting.translations) ? setting.translations : [];
  let hit =
    list.find((t) => t?.locale === locale) ||
    list.find((t) => t?.locale?.startsWith(locale?.split("-")[0])) ||
    list[0];

  const valueObj =
    (hit && typeof hit.value === "object" && hit.value) ||
    (typeof setting.value === "object" && setting.value) ||
    {};

  return valueObj;
}

// special select fields (key: allowed options)
const SELECT_FIELDS = {
  installment_plans_position: ["top_of_page", "bottom_of_page"],
};

export default function InstallmentSettingsForm({ initialData }) {
  const locale = useLocale();
  const { request } = useApiClient();
  const tf = useTranslations("tables"); // labels live here

  // sections: [{ name, page, values (raw), valuesState (normalized) }]
  const [sections, setSections] = useState([]);
  const [originalByName, setOriginalByName] = useState({});
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState(null);

  // Build sections on mount/prop change
  useEffect(() => {
    const built = (Array.isArray(initialData) ? initialData : []).map((s) => {
      const valueObj = pickTranslation(s, locale);
      const normalized = Object.fromEntries(
        Object.entries(valueObj).map(([k, v]) => [k, normalizeForState(v)])
      );
      return {
        id: s.id,
        page: s.page,
        name: s.name,
        values: valueObj,
        valuesState: normalized,
      };
    });

    const originals = {};
    built.forEach((sec) => {
      originals[sec.name] = { ...sec.values };
    });

    setSections(built);
    setOriginalByName(originals);
  }, [initialData, locale]);

  // isDirty per section
  const dirtyMap = useMemo(() => {
    const res = {};
    sections.forEach((sec) => {
      const orig = originalByName[sec.name] || {};
      const changed = Object.entries(sec.valuesState).some(([k, v]) => {
        const ov = normalizeForState(orig[k]);
        return String(v) !== String(ov);
      });
      res[sec.name] = changed;
    });
    return res;
  }, [sections, originalByName]);

  const anyDirty = Object.values(dirtyMap).some(Boolean);

  const labelFor = (key) => {
    try {
      const msg = tf(key);
      return msg === key ? toTitle(key) : msg; // fallback to title-case if missing
    } catch {
      return toTitle(key);
    }
  };

  const updateValue = (name, key, value) => {
    setSections((prev) =>
      prev.map((sec) =>
        sec.name === name
          ? { ...sec, valuesState: { ...sec.valuesState, [key]: value } }
          : sec
      )
    );
  };

  const handleToggleChange = (name, key, checked) => {
    updateValue(name, key, checked ? "1" : "0");
  };

  const handleTextareaChange = (name, key, value) => {
    updateValue(name, key, value);
  };

  const handleSelectChange = (name, key, value) => {
    updateValue(name, key, value);
  };

  const handleReset = () => {
    setSections((prev) =>
      prev.map((sec) => {
        const orig = originalByName[sec.name] || {};
        const normalized = Object.fromEntries(
          Object.entries(orig).map(([k, v]) => [k, normalizeForState(v)])
        );
        return { ...sec, valuesState: normalized };
      })
    );
    setStatus(null);
  };

  // Send only changed keys per section (POST-only)
  const handleSave = async () => {
    setSaving(true);
    setStatus(null);

    try {
      const payloads = sections
        .map((sec) => {
          const orig = originalByName[sec.name] || {};
          const changedEntries = Object.entries(sec.valuesState).filter(
            ([k, v]) => String(v) !== String(normalizeForState(orig[k]))
          );

          if (changedEntries.length === 0) return null;

          const value = {};
          changedEntries.forEach(([k, v]) => {
            value[k] = v; // keep as strings ("1"/"0" or text/select values)
          });

          return { name: sec.name, locale, value };
        })
        .filter(Boolean);

      if (payloads.length === 0) {
        setStatus(tf("no_changes_to_save") || "No changes to save.");
        setSaving(false);
        return;
      }

      for (const body of payloads) {
        const res = await request({
          method: "POST",
          urlPath: "/financial/installments/settings",
          body,
        });

        if (res?.errors || res?.error) {
          throw new Error(
            typeof res.errors === "object"
              ? Object.values(res.errors).join(" | ")
              : res.error || "Unknown error"
          );
        }
      }

      // update originals to current state
      const newOriginals = {};
      sections.forEach((sec) => {
        const fresh = {};
        Object.entries(sec.valuesState).forEach(([k, v]) => {
          fresh[k] = v;
        });
        newOriginals[sec.name] = fresh;
      });
      setOriginalByName(newOriginals);
      setStatus(tf("saved_successfully") || "Saved successfully.");
    } catch (err) {
      console.error(err);
      setStatus(
        (tf("save_failed") || "Save failed") + `: ${String(err.message || err)}`
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="rounded-4 shadow-sm p-4 container-fluid cardbg">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="m-0">Installment Settings</h4>
        <div className="d-flex gap-2">
          {/* Uncomment if you want reset */}
          {/* <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={handleReset}
            disabled={!anyDirty || saving}
          >
            {tf("reset") || "Reset"}
          </button> */}
          <button
            className="btn custfontbtn rounded-2 mb-3"
            type="button"
            onClick={handleSave}
            disabled={!anyDirty || saving}
          >
            {saving ? (tf("saving") || "Saving...") : (tf("save") || "Save")}
          </button>
        </div>
      </div>

      {status && (
        <div
          className={`alert ${
            String(status).toLowerCase().startsWith("save failed")
              ? "alert-danger"
              : "alert-success"
          }`}
          role="alert"
        >
          {status}
        </div>
      )}

      {/* Sections */}
      <div className="d-flex flex-column gap-4">
        {sections.map((sec) => {
          const entries = Object.entries(sec.valuesState || {});
          return (
            <div key={sec.name} className="border rounded-3 p-3">
              <div className="mb-3">
                <strong className="me-2">{toTitle(sec.name)}</strong>
                <span className="text-muted">({sec.page})</span>
              </div>

              <div className="row g-3">
                {entries.length === 0 && (
                  <div className="col-12 text-muted fst-italic">No fields.</div>
                )}

                {entries.map(([key, val]) => {
                  const orig = normalizeForState(
                    (originalByName[sec.name] || {})[key]
                  );
                  const dirty = String(val) !== String(orig);

                  // 1) special SELECT field
                  if (SELECT_FIELDS[key]) {
                    const opts = SELECT_FIELDS[key];
                    return (
                      <div
                        key={`${sec.name}-${key}`}
                        className="col-12 col-md-6"
                      >
                        <label className="form-label">{labelFor(key)}</label>
                        <select
                          className="form-select p-0"
                          value={val}
                          onChange={(e) =>
                            handleSelectChange(sec.name, key, e.target.value)
                          }
                        >
                          {opts.map((o) => (
                            <option key={o} value={o}>
                              {labelFor(o)}
                            </option>
                          ))}
                        </select>
                        {dirty && (
                          <span className="badge text-bg-warning mt-1">
                            {tf("modified") || "modified"}
                          </span>
                        )}
                      </div>
                    );
                  }

                  // 2) boolean-like → TOGGLE (switch)
                  if (isBooleanLike(val)) {
                    return (
                      <div
                        key={`${sec.name}-${key}`}
                        className="col-12 d-flex align-items-center justify-content-start gap-2"
                      >
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            id={`${sec.name}-${key}-switch`}
                            checked={val === "1"}
                            onChange={(e) =>
                              handleToggleChange(
                                sec.name,
                                key,
                                e.target.checked
                              )
                            }
                          />
                        </div>
                        <label
                          className="form-label m-0"
                          htmlFor={`${sec.name}-${key}-switch`}
                        >
                          {labelFor(key)}
                        </label>
                        {dirty && (
                          <span className="badge text-bg-warning">
                            {tf("modified") || "modified"}
                          </span>
                        )}
                      </div>
                    );
                  }

                  // 3) everything else → textarea
                  return (
                    <div key={`${sec.name}-${key}`} className="col-12">
                      <label className="form-label">{labelFor(key)}</label>
                      <textarea
                        className="form-control"
                        rows={
                          key.toLowerCase().includes("description") ? 6 : 3
                        }
                        value={val}
                        onChange={(e) =>
                          handleTextareaChange(sec.name, key, e.target.value)
                        }
                      />
                      {dirty && (
                        <span className="badge text-bg-warning mt-1">
                          {tf("modified") || "modified"}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

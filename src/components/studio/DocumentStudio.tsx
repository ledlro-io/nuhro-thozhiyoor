"use client";

import React, { useEffect, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, Download, Pencil, Printer, Trash2, Upload } from "lucide-react";
import {
  CATEGORIES,
  DEFAULT_SIGNATORIES,
  FIELDS,
  expandDocuments,
  initialValues,
  isBig,
  labelFor,
  normKey,
  pageSize,
  todayLabel,
  type FieldKey,
  type Signatory,
  type Values,
} from "@/lib/studio/data";
import { buildPages } from "./DocumentPages";
import SignaturePad from "./SignaturePad";
import { studioFontVars } from "./fonts";
import "./studio.css";

/* ---------- shared look (uses the admin theme colours) ---------- */
const card = "rounded-xl border border-gold-primary/20 bg-surface p-4";
const cardTitle = "text-[11px] font-bold uppercase tracking-widest text-gold-primary";
const label = "mt-3 mb-1 block text-xs font-medium text-mutedText";
const input =
  "w-full rounded-lg border border-gold-primary/20 bg-background px-3 py-2 text-sm text-parchment placeholder:text-mutedText focus:border-gold-primary focus:outline-none";
const btn =
  "inline-flex items-center gap-1.5 rounded-lg border border-gold-primary/20 px-3 py-1.5 text-xs font-semibold text-parchment transition-colors hover:bg-gold-primary/10 cursor-pointer";

/* ---------- a page scaled down to fit the preview column ---------- */
function ScaledPage({ stageW, children }: { stageW: number; children: ReactNode }) {
  const inner = useRef<HTMLDivElement>(null);
  const [nat, setNat] = useState({ w: 0, h: 0 });

  useLayoutEffect(() => {
    const el = inner.current;
    if (el) setNat((n) => (n.w === el.offsetWidth && n.h === el.offsetHeight ? n : { w: el.offsetWidth, h: el.offsetHeight }));
  });

  const s = nat.w && stageW ? Math.min(1, stageW / nat.w) : 1;
  return (
    <div
      className="mx-auto overflow-hidden rounded-sm bg-white shadow-[0_6px_24px_rgba(0,0,0,0.35)]"
      style={{ width: nat.w ? nat.w * s : undefined, height: nat.h ? nat.h * s : undefined }}
    >
      <div ref={inner} style={{ transform: `scale(${s})`, transformOrigin: "0 0", width: "max-content" }}>
        {children}
      </div>
    </div>
  );
}

export default function DocumentStudio() {
  const [cat, setCat] = useState(0);
  const [tplIdx, setTplIdx] = useState(0);
  const tpl = CATEGORIES[cat].templates[tplIdx];

  const [today, setToday] = useState("");
  const [values, setValues] = useState<Values>(() => initialValues(CATEGORIES[0].templates[0], ""));
  const [rows, setRows] = useState<Partial<Values>[]>([]);
  const [idx, setIdx] = useState(0);
  const [sigs, setSigs] = useState<Signatory[]>(DEFAULT_SIGNATORIES);
  const [sigsReady, setSigsReady] = useState(false);
  const [padFor, setPadFor] = useState<number | null>(null);
  const [tab, setTab] = useState<"edit" | "preview">("edit");
  const [msg, setMsg] = useState("");
  const [cutOff, setCutOff] = useState(false);
  const [printing, setPrinting] = useState(false);
  const [stageW, setStageW] = useState(0);

  const stageRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  /* first load: today's date + saved signatories */
  useEffect(() => {
    const t = todayLabel();
    setToday(t);
    setValues((v) => ({ ...v, date: t }));
    try {
      const saved = JSON.parse(localStorage.getItem("ntsig") || "null");
      if (Array.isArray(saved)) setSigs(saved);
    } catch {}
    setSigsReady(true);
  }, []);

  useEffect(() => {
    if (!sigsReady) return;
    try {
      localStorage.setItem("ntsig", JSON.stringify(sigs));
    } catch {}
  }, [sigs, sigsReady]);

  /* measure the preview column */
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setStageW(el.clientWidth));
    ro.observe(el);
    setStageW(el.clientWidth);
    return () => ro.disconnect();
  }, [tab]);

  const docs = useMemo(() => expandDocuments(values, rows), [values, rows]);
  const cur = Math.min(idx, docs.length - 1);
  const pages = useMemo(() => buildPages(tpl, docs[cur], sigs), [tpl, docs, cur, sigs]);
  const [pw, ph] = pageSize(tpl);

  /* warn when text overflows the page */
  useEffect(() => {
    const check = () => {
      const bodies = stageRef.current?.querySelectorAll<HTMLElement>(".bd");
      setCutOff(!!bodies && Array.from(bodies).some((b) => b.scrollHeight > b.clientHeight + 3));
    };
    check();
    document.fonts?.ready.then(check);
  }, [pages, stageW]);

  /* ---------- handlers ---------- */
  const selectTemplate = (c: number, t: number) => {
    setCat(c);
    setTplIdx(t);
    setValues(initialValues(CATEGORIES[c].templates[t], today));
    setRows([]);
    setIdx(0);
    setMsg("");
    if (fileRef.current) fileRef.current.value = "";
  };

  const setField = (k: FieldKey, val: string) => setValues((v) => ({ ...v, [k]: val }));
  const setSig = (i: number, patch: Partial<Signatory>) =>
    setSigs((all) => all.map((s, j) => (j === i ? { ...s, ...patch } : s)));

  const uploadSignature = (i: number, file?: File) => {
    if (!file) return;
    const r = new FileReader();
    r.onload = () => setSig(i, { img: String(r.result) });
    r.readAsDataURL(file);
  };

  const clearSheet = () => {
    setRows([]);
    setIdx(0);
    setMsg("");
    if (fileRef.current) fileRef.current.value = "";
  };

  const onSheet = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    try {
      const XLSX = await import("xlsx");
      const wb = XLSX.read(await f.arrayBuffer(), { type: "array" });
      const json = XLSX.utils.sheet_to_json<Record<string, unknown>>(wb.Sheets[wb.SheetNames[0]], {
        defval: "",
        raw: false,
      });
      const map: Record<string, FieldKey> = {};
      FIELDS[tpl.type].forEach((k) => {
        map[normKey(k)] = k;
        map[normKey(labelFor(tpl.type, k))] = k;
      });
      const parsed = json
        .map((r) => {
          const o: Partial<Values> = {};
          for (const h in r) {
            const k = map[normKey(h)];
            if (k && String(r[h]).trim() !== "") o[k] = String(r[h]);
          }
          return o;
        })
        .filter((o) => Object.keys(o).length);
      setRows(parsed);
      setIdx(0);
      setMsg(parsed.length ? "" : "No matching columns. Use Sample sheet for the right headings.");
    } catch {
      setMsg("Could not read that file.");
    }
  };

  const downloadSample = () => {
    const keys = FIELDS[tpl.type];
    const q = (s: string) => '"' + String(s).replace(/"/g, '""') + '"';
    const csv =
      "\ufeff" +
      keys.map((k) => q(labelFor(tpl.type, k))).join(",") +
      "\n" +
      keys.map((k) => q(values[k] || "")).join(",") +
      "\n";
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    a.download = tpl.name.replace(/\s+/g, "-") + "-sample.csv";
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  /* ---------- PDF: render every page into a hidden print root, then window.print() ---------- */
  useEffect(() => {
    if (!printing) return;
    let cancelled = false;
    const style = document.createElement("style");
    style.textContent = `@page{size:${pw}mm ${ph}mm;margin:0}`;
    document.head.appendChild(style);
    document.body.classList.add("nts-printing");
    const oldTitle = document.title;
    document.title = tpl.name.replace(/\s+/g, "-") + (docs.length > 1 ? "-bulk" : "");

    const finish = () => {
      style.remove();
      document.body.classList.remove("nts-printing");
      document.title = oldTitle;
      setPrinting(false);
    };
    window.addEventListener("afterprint", finish, { once: true });

    (async () => {
      await document.fonts?.ready;
      const imgs = Array.from(document.querySelectorAll<HTMLImageElement>("#nts-print-root img"));
      await Promise.all(imgs.map((i) => i.decode().catch(() => {})));
      if (!cancelled) setTimeout(() => window.print(), 100);
    })();

    return () => {
      cancelled = true;
      window.removeEventListener("afterprint", finish);
      style.remove();
      document.body.classList.remove("nts-printing");
      document.title = oldTitle;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [printing]);

  const fields = FIELDS[tpl.type];

  return (
    <div className={`${studioFontVars} flex flex-col gap-4`}>
      {/* toolbar */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex gap-2 lg:hidden">
          {(["edit", "preview"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`rounded-lg border px-3.5 py-2 text-xs font-bold uppercase ${
                tab === t
                  ? "border-gold-primary bg-gold-primary text-background"
                  : "border-gold-primary/20 text-parchment"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setPrinting(true)}
          className="ml-auto flex items-center gap-1.5 rounded-lg bg-gold-primary px-4 py-2 text-xs font-bold uppercase text-background shadow-gold-glow transition-all hover:brightness-110"
        >
          <Download size={14} /> {docs.length > 1 ? `Save PDF (${docs.length})` : "Save PDF"}
        </button>
      </div>

      <div className="grid items-start gap-6 lg:grid-cols-[380px_minmax(0,1fr)]">
        {/* ================= EDITOR ================= */}
        <div className={`${tab === "edit" ? "flex" : "hidden"} flex-col gap-4 lg:flex`}>
          <div className={card}>
            <label className={label.replace("mt-3", "mt-0")}>Category</label>
            <select className={input} value={cat} onChange={(e) => selectTemplate(+e.target.value, 0)}>
              {CATEGORIES.map((c, i) => (
                <option key={c.name} value={i}>
                  {c.name}
                </option>
              ))}
            </select>
            <label className={label}>Document</label>
            <select className={input} value={tplIdx} onChange={(e) => selectTemplate(cat, +e.target.value)}>
              {CATEGORIES[cat].templates.map((t, i) => (
                <option key={t.name} value={i}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          <div className={card}>
            <h3 className={cardTitle}>Details</h3>
            {fields.map((k) => (
              <div key={k}>
                <label className={label}>{labelFor(tpl.type, k)}</label>
                {isBig(k) ? (
                  <textarea
                    className={`${input} resize-y`}
                    style={{ minHeight: k === "body" || k === "rows" ? 170 : 64 }}
                    value={values[k]}
                    onChange={(e) => setField(k, e.target.value)}
                  />
                ) : (
                  <input className={input} value={values[k]} onChange={(e) => setField(k, e.target.value)} />
                )}
              </div>
            ))}
          </div>

          <div className={card}>
            <h3 className={cardTitle}>Bulk from Excel / CSV</h3>
            <p className="mt-1.5 text-xs text-mutedText">
              Each row becomes one document. Columns left out use the details above, and reference numbers count up
              automatically.
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <label className={btn}>
                <Upload size={13} /> Upload sheet
                <input ref={fileRef} type="file" accept=".xlsx,.xls,.csv" hidden onChange={onSheet} />
              </label>
              <button type="button" className={btn} onClick={downloadSample}>
                Sample sheet
              </button>
              <button type="button" className={btn} onClick={clearSheet}>
                Clear
              </button>
            </div>
            <p className="mt-2 text-xs text-mutedText">
              {rows.length ? `${rows.length} documents ready` : ""}
              {msg}
            </p>
          </div>

          <div className={card}>
            <h3 className={cardTitle}>Signatories</h3>
            {sigs.map((s, i) => (
              <div key={i} className="mt-3 border-t border-gold-primary/10 pt-2">
                <label className="mt-1 mb-2 flex items-center gap-2 text-sm text-parchment">
                  <input
                    type="checkbox"
                    className="h-4 w-4 accent-[#d4a24a]"
                    checked={s.on}
                    onChange={(e) => setSig(i, { on: e.target.checked })}
                  />
                  Signatory {i + 1}
                </label>
                <input
                  className={input}
                  placeholder="Name"
                  value={s.name}
                  onChange={(e) => setSig(i, { name: e.target.value })}
                />
                <input
                  className={`${input} mt-1.5`}
                  placeholder="Designation"
                  value={s.des}
                  onChange={(e) => setSig(i, { des: e.target.value })}
                />
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  {s.img && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={s.img} alt="" className="h-8 rounded bg-white" />
                  )}
                  <label className={btn}>
                    <Upload size={13} /> Upload
                    <input type="file" accept="image/*" hidden onChange={(e) => uploadSignature(i, e.target.files?.[0])} />
                  </label>
                  <button type="button" className={btn} onClick={() => setPadFor(i)}>
                    <Pencil size={13} /> Draw
                  </button>
                  <button type="button" className={btn} onClick={() => setSig(i, { img: "" })}>
                    <Trash2 size={13} /> Clear
                  </button>
                </div>
              </div>
            ))}
            <p className="mt-3 text-xs text-mutedText">Signatures are saved in this browser only.</p>
          </div>
        </div>

        {/* ================= PREVIEW ================= */}
        <div className={`${tab === "preview" ? "block" : "hidden"} min-w-0 lg:block`}>
          <p className="mb-3 flex items-start gap-1.5 text-xs text-mutedText">
            <Printer size={14} className="mt-0.5 shrink-0 text-gold-primary" />
            Save PDF opens the print dialog. Choose <b className="text-parchment">Save as PDF</b>, margins{" "}
            <b className="text-parchment">None</b>, scale <b className="text-parchment">100%</b>. The PDF keeps real,
            searchable text.
          </p>

          {docs.length > 1 && (
            <div className="mb-3 flex items-center gap-3">
              <button type="button" className={btn} onClick={() => setIdx(Math.max(0, cur - 1))}>
                <ChevronLeft size={14} />
              </button>
              <b className="text-sm text-parchment">
                {cur + 1} / {docs.length}
              </b>
              <button type="button" className={btn} onClick={() => setIdx(Math.min(docs.length - 1, cur + 1))}>
                <ChevronRight size={14} />
              </button>
            </div>
          )}

          <div ref={stageRef} className={`nts ${studioFontVars} flex flex-col gap-4`}>
            {pages.map((p, i) => (
              <ScaledPage key={`${tpl.name}-${i}`} stageW={stageW}>
                {p}
              </ScaledPage>
            ))}
          </div>

          {cutOff && <p className="mt-2 text-xs text-red-400">Content is cut off. Shorten the text.</p>}
        </div>
      </div>

      {padFor !== null && (
        <SignaturePad
          onCancel={() => setPadFor(null)}
          onUse={(url) => {
            setSig(padFor, { img: url });
            setPadFor(null);
          }}
        />
      )}

      {/* hidden print root: all pages of all documents, shown only by @media print */}
      {printing &&
        createPortal(
          <div id="nts-print-root" className={`nts ${studioFontVars}`}>
            {docs.flatMap((d, di) =>
              buildPages(tpl, d, sigs).map((p, pi) => <React.Fragment key={`${di}-${pi}`}>{p}</React.Fragment>)
            )}
          </div>,
          document.body
        )}
    </div>
  );
}
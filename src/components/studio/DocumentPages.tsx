/* eslint-disable @next/next/no-img-element */
import React, { type CSSProperties, type ReactNode } from "react";
import { VARIANTS, pageSize, type Signatory, type Template, type Values } from "@/lib/studio/data";
import { XIcon, YoutubeIcon } from "lucide-react";

const LOGO = "/logo.jpg"; // public/logo.jpg

/* ---------- small building blocks ---------- */

/** Text with line breaks. */
function Br({ text }: { text: string }) {
  return (
    <>
      {String(text ?? "").split("\n").map((l, i) => (
        <React.Fragment key={i}>
          {i > 0 && <br />}
          {l}
        </React.Fragment>
      ))}
    </>
  );
}

/** Body text: blank line = new paragraph, "# Title" = sub-heading. */
function Fmt({ text }: { text: string }) {
  const blocks = String(text ?? "").split(/\n\n+/);
  return (
    <>
      {blocks.map((block, bi) => {
        const out: ReactNode[] = [];
        let buf: string[] = [];
        const flush = () => {
          if (buf.some((l) => l !== "")) {
            out.push(
              <p key={out.length}>
                <Br text={buf.join("\n")} />
              </p>
            );
          }
          buf = [];
        };
        block.split("\n").forEach((line) => {
          if (/^# /.test(line)) {
            flush();
            out.push(
              <h3 className="s" key={out.length}>
                {line.slice(2)}
              </h3>
            );
          } else buf.push(line);
        });
        flush();
        return <React.Fragment key={bi}>{out}</React.Fragment>;
      })}
    </>
  );
}

/** "Label | Value" lines as a table. With header=true the first line is the header row. */
function Kv({ data, header }: { data: string; header?: boolean }) {
  const lines = String(data ?? "")
    .split("\n")
    .filter(Boolean)
    .map((l) => l.split("|").map((c) => c.trim()));
  return (
    <table className={"k" + (header ? "" : " kv")}>
      <tbody>
        {lines.map((cells, i) => (
          <tr key={i}>
            {cells.map((c, j) => (header && i === 0 ? <th key={j}>{c}</th> : <td key={j}>{c}</td>))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Sigs({ sigs }: { sigs: Signatory[] }) {
  const on = sigs.filter((s) => s.on);
  if (!on.length) return null;
  return (
    <div className="sg">
      {on.map((s, i) => (
        <div key={i}>
          {s.img ? <img src={s.img} alt="" /> : <div className="sp" />}
          <div className="ln" />
          <b>{s.name}</b>
          <small>{s.des}</small>
        </div>
      ))}
    </div>
  );
}

const WebIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth={2}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
  </svg>
);
const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth={2}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);

/* ---------- the pages ---------- */

/** Returns the page(s) for one document. ID cards return two pages (front and back). */
export function buildPages(tpl: Template, v: Values, sigs: Signatory[]): ReactNode[] {
  const n = tpl.name;
  const N = n.toUpperCase();
  const ty = tpl.type;
  const [w, h] = pageSize(tpl);
  const vr = VARIANTS[n] ?? (ty === "N" ? "hero" : "plain");
  const fs = h <= 60 ? 6.5 : h <= 110 ? 8.5 : w <= 148 || h <= 148 ? 9 : 10.5;
  const st = { width: `${w}mm`, height: `${h}mm`, ["--h" as string]: `${h}mm`, fontSize: `${fs}pt` } as CSSProperties;

  const meta = (
    <div className="mt">
      <span>
        Ref <b>{v.ref}</b>
      </span>
      <span>
        Date <b>{v.date}</b>
      </span>
    </div>
  );
  const toBlock =
    v.to || v.addr ? (
      <p className="to">
        <b>{v.to}</b>
        <br />
        <Br text={v.addr} />
      </p>
    ) : null;
  const dear = <p>Dear {v.to || "Sir/Madam"},</p>;
  const yours = <p>Yours sincerely,</p>;
  const hero = (
    <div className="hero">
      <small>{N}</small>
      <h2>{v.subject}</h2>
    </div>
  );
  const lb = (k: string, x: ReactNode) => (
    <div className="lb">
      <small>{k}</small>
      <b>{x}</b>
    </div>
  );
  const vc = (k: string, x: string) => (
    <div className="vc">
      <small>{k}</small>
      {x || "\u00a0"}
    </div>
  );
  const remarks = v.body && ty === "R" ? <p className="rm">{v.body}</p> : null;
  const A = v.amount;
  const body = <Fmt text={v.body} />;
  const sg = <Sigs sigs={sigs} />;

  /* ----- ID card (front + back) ----- */
  if (ty === "I") {
    return [
      <div key="id1" className="page id" style={st}>
        <i className="o1" />
        <div className="in">
          <img className="lg" src={LOGO} alt="" />
          <b>NUHRO THOZHIYOOR</b>
          <em>Heritage &amp; Research</em>
          <div className="n">{v.to || "Full Name"}</div>
          <div className="d">
            {v.addr} · ID {v.ref}
          </div>
        </div>
      </div>,
      <div key="id2" className="page id" style={st}>
        <i className="o1" />
        <div className="in">
          <b>MEMBER IDENTITY</b>
          <em>Valid until {v.date}</em>
          <div className="bk">
            This card identifies the holder as a member or volunteer of Nuhro Thozhiyoor, an independent, non-official
            initiative. It is not an identity of the Malabar Independent Syrian Church.
            <br />
            nuhro-thozhiyoor.vercel.app · nuhrothozhiyoor@gmail.com
          </div>
        </div>
      </div>,
    ];
  }

  /* ----- body by document type ----- */
  let b: ReactNode;

  if (ty === "L") {
    if (vr === "side") {
      b = (
        <div className="sd">
          <div className="sl">
            {lb("Ref", v.ref)}
            {lb("Date", v.date)}
            {v.to
              ? lb(
                  "To",
                  <>
                    {v.to}
                    <br />
                    <span>
                      <Br text={v.addr} />
                    </span>
                  </>
                )
              : null}
          </div>
          <div>
            <h2 className="t">{v.subject}</h2>
            {dear}
            {body}
            {yours}
            {sg}
          </div>
        </div>
      );
    } else if (vr === "hero") {
      b = (
        <>
          {hero}
          {meta}
          {toBlock}
          {dear}
          {body}
          {yours}
          {sg}
        </>
      );
    } else if (vr === "card") {
      b = (
        <>
          <div className="ctr">
            <small className="eb">{N}</small>
            <h2 className="t big">{v.subject}</h2>
            {v.to ? <p className="to2">{v.to}</p> : null}
            <div className="cbd">{body}</div>
            <p style={{ color: "#85787f", fontSize: ".85em" }}>
              {v.date} · {v.ref}
            </p>
          </div>
          {sg}
        </>
      );
    } else if (vr === "thanks") {
      b = (
        <>
          <div className="ctr">
            <div className="ty2">Thank you</div>
            <p style={{ fontWeight: 700 }}>{v.subject}</p>
            <div className="cbd">{body}</div>
          </div>
          {sg}
        </>
      );
    } else {
      b = (
        <>
          {meta}
          {toBlock}
          <p className="sub">
            <span>SUBJECT</span>
            {v.subject}
          </p>
          {dear}
          {body}
          {yours}
          {sg}
        </>
      );
    }
  } else if (ty === "R") {
    if (vr === "split") {
      b = (
        <div className="sp2">
          <div className="pn">
            <small>RECEIPT</small>
            <b>{v.ref}</b>
            <small>DATE</small>
            <b style={{ fontSize: "1em" }}>{v.date}</b>
            <small>MODE</small>
            <em>{v.mode}</em>
          </div>
          <div>
            <small className="k" style={{ marginTop: 0 }}>
              RECEIVED WITH THANKS FROM
            </small>
            <h2 className="t">{v.party || "—"}</h2>
            <small className="k">TOWARDS</small>
            <p>{v.subject}</p>
            <div className="amt">₹ {A}</div>
            {remarks}
            {sg}
          </div>
        </div>
      );
    } else if (vr === "slip") {
      b = (
        <>
          <div className="slip">
            <div>
              <Kv
                data={`Receipt no. | ${v.ref}\nDate | ${v.date}\nReceived from | ${v.party}\nFor | ${v.subject}\nMode | ${v.mode}`}
              />
            </div>
            <div className="am">
              <small>AMOUNT PAID</small>
              <b>₹ {A}</b>
              <span className="st">PAID</span>
            </div>
          </div>
          {remarks}
          {sg}
        </>
      );
    } else {
      b = (
        <>
          <h2 className="t">Payment voucher</h2>
          <div className="vg">
            {vc("VOUCHER NO.", v.ref)}
            {vc("DATE", v.date)}
            {vc("PAID TO", v.party)}
            {vc("PAYMENT MODE", v.mode)}
          </div>
          <div className="vc w">
            <div className="x">
              <small>PURPOSE</small>
              {v.subject || "\u00a0"}
            </div>
          </div>
          <div className="vc a">
            <small>AMOUNT</small>
            <b>₹ {A}</b>
          </div>
          {remarks}
          <div className="sg3">
            <div>
              <i />
              Prepared by
            </div>
            <div>
              <i />
              Approved by
            </div>
            <div>
              <i />
              Received by
            </div>
          </div>
        </>
      );
    }
  } else if (ty === "N") {
    if (vr === "bold") {
      b = (
        <>
          <div className="big">{N}</div>
          <h2 className="t">{v.subject}</h2>
          {meta}
          <div className="box">{body}</div>
          {sg}
        </>
      );
    } else if (vr === "formal") {
      b = (
        <div className="fm">
          <small>{N}</small>
          <div className="rule" />
          {meta}
          <h2 className="t c">{v.subject}</h2>
          {body}
          {sg}
        </div>
      );
    } else if (vr === "quote") {
      b = (
        <div className="qt">
          <div className="q">“</div>
          <small>{N}</small>
          <h2 className="t">{v.subject}</h2>
          {meta}
          <div className="qb">{body}</div>
          {sg}
        </div>
      );
    } else {
      b = (
        <>
          {hero}
          {meta}
          {body}
          {sg}
        </>
      );
    }
  } else if (ty === "M") {
    b = (
      <>
        <h2 className="t">{v.subject}</h2>
        <Kv data={`Date | ${v.date}\nVenue | ${v.venue}\nAttendees | ${v.attendees}`} />
        {body}
        {sg}
      </>
    );
  } else if (ty === "C") {
    if (vr === "dark") {
      b = (
        <>
          <div className="cc">
            <h2>{v.subject}</h2>
            <div className="ey">PROUDLY PRESENTED TO</div>
            <div className="nm">{v.to || "Recipient Name"}</div>
            <div className="cb">{body}</div>
            <p style={{ opacity: 0.7 }}>{v.date}</p>
          </div>
          {sg}
        </>
      );
    } else {
      b = (
        <div className="cs">
          <div className="pnl">
            <small>CERTIFICATE</small>
            <b>NUHRO THOZHIYOOR</b>
          </div>
          <div>
            <small className="k" style={{ marginTop: 0 }}>
              {N}
            </small>
            <h2 className="t">{v.subject}</h2>
            <small className="k">PRESENTED TO</small>
            <div className="nm2">{v.to || "Recipient Name"}</div>
            {body}
            <p style={{ color: "#85787f" }}>{v.date}</p>
            {sg}
          </div>
        </div>
      );
    }
  } else if (ty === "T" || ty === "A") {
    b = (
      <>
        {ty === "A" ? <span className="pn2">{v.ref}</span> : null}
        {ty === "T" ? meta : null}
        <h2 className="t">{v.subject}</h2>
        {body}
        <Kv data={v.rows} header={ty === "T"} />
        {sg}
      </>
    );
  } else if (ty === "P") {
    b = (
      <>
        <div className="cov">
          <small>
            {v.date} · {v.ref}
          </small>
          <h2>{v.subject}</h2>
          {v.note ? <p>{v.note}</p> : null}
        </div>
        {body}
        {sg}
      </>
    );
  } else {
    // "F" – form with fill-in lines
    b = (
      <>
        {meta}
        <h2 className="t">{v.subject}</h2>
        {v.body
          .split("\n")
          .filter(Boolean)
          .map((l, i) => (
            <div className="fl" key={i}>
              <span>{l}</span>
              <i />
            </div>
          ))}
        <p style={{ fontSize: ".9em", color: "#6f6760", marginTop: "5mm" }}>
          I declare that the above information is correct.
        </p>
        <div className="sg">
          <div>
            <div className="sp" />
            <div className="ln" />
            <small>Applicant’s signature</small>
          </div>
        </div>
        {sg}
      </>
    );
  }

  return [
    <div
      key="p1"
      className={`page${vr === "dark" ? " dk" : ""}${h > w ? " pt" : ""}${h <= 110 ? " short" : ""}`}
      style={st}
    >
      <i className="o1" />
      <i className="o2" />
      {vr === "dark" ? <div className="fr" /> : null}
      <div className="hd">
        <img src={LOGO} alt="" />
        <div>
          <b>NUHRO THOZHIYOOR</b>
          <i>Independent Heritage &amp; Research Initiative</i>
        </div>
        <span className="ty">{N}</span>
      </div>
      <div className="bd">{b}</div>
      <div className="ft">
        <div className="r">
          <span>
            <WebIcon />
            nuhro-thozhiyoor.vercel.app
          </span>
          <span>
            <MailIcon />
            nuhrothozhiyoor@gmail.com
          </span>
          <span>
             <XIcon />
             @nuhrothozhiyoor
          </span>

        </div>
        <p>
          An independent, non-official research and heritage initiative. Not the official website or administrative
          authority of the Malabar Independent Syrian Church.
        </p>
      </div>
    </div>,
  ];
}
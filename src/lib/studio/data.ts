// Templates, fields and page sizes for the Document Studio.
// Edit this file to add or change document templates.

export type TemplateType = "L" | "R" | "N" | "M" | "C" | "T" | "A" | "P" | "I" | "F";

export type FieldKey =
  | "ref" | "date" | "to" | "addr" | "subject" | "body" | "party"
  | "amount" | "mode" | "venue" | "attendees" | "rows" | "note";

export type Values = Record<FieldKey, string>;

export interface Template {
  name: string;
  type: TemplateType;
  subject: string;
  body: string;
  rows: string;
}

export interface Category {
  name: string;
  templates: Template[];
}

export interface Signatory {
  on: boolean;
  name: string;
  des: string;
  img: string;
}

/** L letter · R receipt · N notice · M minutes · C certificate · T table · A accession · P report · I ID card · F form */
export const CATEGORIES: Category[] = [
  {
    name: "Official correspondence",
    templates: [
      {
        name: "Appointment letter",
        type: "L",
        subject: "Appointment as Research Coordinator",
        body: "We are pleased to appoint you as Research Coordinator of Nuhro Thozhiyoor with effect from 1 December 2026. The role is voluntary and involves documenting and verifying heritage material in line with our editorial standards.\n\nWe welcome you and look forward to your contribution.",
        rows: ""
      },
      {
        name: "Invitation letter",
        type: "L",
        subject: "Invitation to the Heritage Documentation Meet",
        body: "We cordially invite you to attend our heritage documentation meet on [date] at [venue]. Your presence and guidance will be greatly valued.\n\nKindly confirm your participation.",
        rows: ""
      },
      {
        name: "Recommendation letter",
        type: "L",
        subject: "Letter of Recommendation",
        body: "It is my pleasure to recommend [Name], who has contributed to the initiative as a volunteer researcher. They have shown diligence, accuracy and respect for sources.\n\nI recommend them without reservation.",
        rows: ""
      },
      {
        name: "Request letter",
        type: "L",
        subject: "Request for Access to Archival Material",
        body: "We respectfully request permission to photograph and document the manuscripts in your custody, solely for non-commercial heritage research. Full credit will be given to the custodian.\n\nWe shall be grateful for your kind consideration.",
        rows: ""
      },
      {
        name: "Thank-you letter",
        type: "L",
        subject: "Thank You for Your Support",
        body: "On behalf of Nuhro Thozhiyoor, we sincerely thank you for your generous support. Contributions like yours help preserve our shared heritage for future generations.",
        rows: ""
      }
    ]
  },
  {
    name: "Financial",
    templates: [
      {
        name: "Donation receipt",
        type: "R",
        subject: "Donation towards heritage documentation",
        body: "Received with thanks. This is a voluntary donation.",
        rows: ""
      },
      {
        name: "Payment receipt",
        type: "R",
        subject: "Payment for services",
        body: "Payment received in full.",
        rows: ""
      },
      {
        name: "Expense voucher",
        type: "R",
        subject: "Expense: [description]",
        body: "Approved by the Coordinator. Bills attached.",
        rows: ""
      },
      {
        name: "Acknowledgement",
        type: "L",
        subject: "Acknowledgement of Receipt",
        body: "We acknowledge with thanks the receipt of the material/amount sent by you on [date]. It has been recorded in our register.",
        rows: ""
      }
    ]
  },
  {
    name: "Administration",
    templates: [
      {
        name: "Circular",
        type: "N",
        subject: "Circular: [subject]",
        body: "All members and volunteers are informed that [details]. Kindly note and comply.",
        rows: ""
      },
      {
        name: "Notice",
        type: "N",
        subject: "Notice of Meeting",
        body: "Notice is hereby given that a meeting will be held on [date] at [time] at [venue].\n\nAgenda:\n1. Review of work\n2. Upcoming publications\n3. Any other matter",
        rows: ""
      },
      {
        name: "Office order",
        type: "N",
        subject: "Office Order No. 1",
        body: "It is hereby ordered that [name] is assigned the responsibility of [duty] with immediate effect until further orders.",
        rows: ""
      },
      {
        name: "Meeting minutes",
        type: "M",
        subject: "Minutes of the Meeting",
        body: "# Agenda\n1. Review of previous minutes\n2. Archive progress\n\n# Decisions\n1. [Decision]\n\nThe meeting concluded with a vote of thanks.",
        rows: ""
      },
      {
        name: "Resolution",
        type: "N",
        subject: "Resolution",
        body: "RESOLVED THAT [text of resolution], and that the Coordinator is authorised to take all necessary steps to give effect to it.",
        rows: ""
      }
    ]
  },
  {
    name: "Organisation",
    templates: [
      {
        name: "Membership form",
        type: "F",
        subject: "Membership Application Form",
        body: "Full name\nDate of birth\nAddress\nPhone / Email\nOccupation\nAreas of interest",
        rows: ""
      },
      {
        name: "Identity card",
        type: "I",
        subject: "",
        body: "",
        rows: ""
      },
      {
        name: "Authorisation letter",
        type: "L",
        subject: "Letter of Authorisation",
        body: "This is to authorise [name] to represent Nuhro Thozhiyoor for [purpose] on [date]. This authorisation is valid only for the stated purpose.",
        rows: ""
      },
      {
        name: "Appointment order",
        type: "N",
        subject: "Appointment Order",
        body: "[Name] is hereby appointed as [position] of Nuhro Thozhiyoor with effect from [date], subject to the initiative’s guidelines.",
        rows: ""
      }
    ]
  },
  {
    name: "Events",
    templates: [
      {
        name: "Event permission",
        type: "L",
        subject: "Request for Permission to Hold an Event",
        body: "We seek permission to conduct [event] on [date] at [venue]. The programme is educational and non-commercial.",
        rows: ""
      },
      {
        name: "Participation letter",
        type: "L",
        subject: "Letter of Participation",
        body: "This is to confirm that [name] is invited to participate in [event] on [date]. Kindly carry this letter.",
        rows: ""
      },
      {
        name: "Event schedule",
        type: "T",
        subject: "Event Schedule",
        body: "Programme for [event] on [date].",
        rows: "Time | Session | Speaker\n09:30 | Registration | —\n10:00 | Inauguration | Chief Guest\n11:00 | Talk | Invited speaker"
      },
      {
        name: "Sponsorship letter",
        type: "L",
        subject: "Sponsorship Request",
        body: "We invite you to support [event/project]. Your sponsorship will fund documentation, digitisation and publication of heritage material, and you will be acknowledged in all outputs.",
        rows: ""
      }
    ]
  },
  {
    name: "Research & Heritage",
    templates: [
      {
        name: "Research acknowledgement",
        type: "L",
        subject: "Research Acknowledgement",
        body: "We gratefully acknowledge your research contribution titled [title], received on [date]. It will be reviewed under our editorial standards.",
        rows: ""
      },
      {
        name: "Publication certificate",
        type: "C",
        subject: "Certificate of Publication",
        body: "This certificate is awarded in recognition of the publication of [title] on the Nuhro Thozhiyoor platform.",
        rows: ""
      },
      {
        name: "Contributor certificate",
        type: "C",
        subject: "Certificate of Contribution",
        body: "This certificate recognises valuable contribution to documenting and preserving the heritage of the Malabar Independent Syrian Church – Thozhiyoor.",
        rows: ""
      },
      {
        name: "Archive accession record",
        type: "A",
        subject: "Archive Accession Record",
        body: "",
        rows: "Accession no. | NT/ACC/001\nTitle | \nType | Manuscript / Photograph / Document\nDate / Period | \nSource / Custodian | \nCondition | \nLocation | \nReceived by | "
      }
    ]
  },
  {
    name: "Reports",
    templates: [
      {
        name: "Annual report",
        type: "P",
        subject: "Annual Report 2026",
        body: "# Overview\n[Summary of the year]\n\n# Key activities\n[Details]\n\n# Outcomes\n[Details]\n\n# Way forward\n[Plans]",
        rows: ""
      },
      {
        name: "Activity report",
        type: "P",
        subject: "Activity Report",
        body: "# Activity\n[Name and date]\n\n# Participants\n[Details]\n\n# Outcomes\n[Details]",
        rows: ""
      },
      {
        name: "Project report",
        type: "P",
        subject: "Project Report",
        body: "# Objective\n[Details]\n\n# Progress\n[Details]\n\n# Challenges\n[Details]\n\n# Next steps\n[Details]",
        rows: ""
      },
      {
        name: "Financial summary",
        type: "T",
        subject: "Financial Summary",
        body: "Statement for the period [from] to [to].",
        rows: "Particulars | Amount (₹)\nDonations received | 0\nExpenses | 0\nBalance | 0"
      }
    ]
  }
];

/** Which fields each document type shows in the editor (and accepts as Excel/CSV columns). */
export const FIELDS: Record<TemplateType, FieldKey[]> = {
  L: [
    "ref",
    "date",
    "to",
    "addr",
    "subject",
    "body"
  ],
  R: [
    "ref",
    "date",
    "party",
    "amount",
    "mode",
    "subject",
    "body"
  ],
  N: [
    "ref",
    "date",
    "subject",
    "body"
  ],
  M: [
    "date",
    "venue",
    "attendees",
    "subject",
    "body"
  ],
  C: [
    "date",
    "to",
    "subject",
    "body"
  ],
  T: [
    "ref",
    "date",
    "subject",
    "body",
    "rows"
  ],
  A: [
    "ref",
    "date",
    "subject",
    "body",
    "rows"
  ],
  P: [
    "ref",
    "date",
    "subject",
    "note",
    "body"
  ],
  I: [
    "to",
    "addr",
    "ref",
    "date"
  ],
  F: [
    "ref",
    "subject",
    "body"
  ]
};

export const LABELS: Record<FieldKey, string> = {
  ref: "Reference no.",
  date: "Date",
  to: "To / Recipient",
  addr: "Address",
  subject: "Subject / Title",
  body: "Body",
  party: "Received from / Paid to",
  amount: "Amount (₹)",
  mode: "Payment mode",
  venue: "Venue",
  attendees: "Attendees",
  rows: "Rows (one per line, columns split with |)",
  note: "Period / Note"
};

/** Per-type label overrides. */
export const LABEL_OVERRIDES: Partial<Record<TemplateType, Partial<Record<FieldKey, string>>>> = {
  R: {
    body: "Remarks",
    subject: "Purpose"
  },
  M: {
    subject: "Meeting title",
    body: "Minutes (# for headings)"
  },
  C: {
    to: "Recipient name",
    subject: "Certificate title"
  },
  I: {
    to: "Full name",
    addr: "Role / Designation",
    ref: "ID number",
    date: "Valid until"
  },
  F: {
    subject: "Form title",
    body: "Form fields (one per line)"
  },
  T: {
    body: "Introduction"
  },
  A: {
    body: "Introduction"
  },
  N: {
    subject: "Title"
  },
  P: {
    body: "Report text (# for headings)"
  }
};

/** Page size in mm [width, height] for specific templates. */
export const SIZE_BY_NAME: Record<string, [number, number]> = {
  Acknowledgement: [
    148,
    210
  ],
  "Thank-you letter": [
    148,
    210
  ],
  "Participation letter": [
    210,
    148
  ],
  "Expense voucher": [
    148,
    210
  ],
  "Payment receipt": [
    210,
    105
  ]
};

/** Default page size in mm [width, height] by document type. */
export const SIZE_BY_TYPE: Record<TemplateType, [number, number]> = {
  L: [
    210,
    297
  ],
  R: [
    210,
    148
  ],
  N: [
    210,
    297
  ],
  M: [
    210,
    297
  ],
  C: [
    297,
    210
  ],
  T: [
    210,
    297
  ],
  A: [
    210,
    297
  ],
  P: [
    210,
    297
  ],
  I: [
    86,
    54
  ],
  F: [
    210,
    297
  ]
};

/** Visual layout used by a template. Anything not listed uses "hero" (notices) or "plain". */
export const VARIANTS: Record<string, string> = {
  "Appointment letter": "hero",
  "Invitation letter": "card",
  "Recommendation letter": "plain",
  "Request letter": "side",
  "Thank-you letter": "thanks",
  Acknowledgement: "plain",
  "Authorisation letter": "hero",
  "Event permission": "side",
  "Participation letter": "card",
  "Sponsorship letter": "hero",
  "Research acknowledgement": "plain",
  "Donation receipt": "split",
  "Payment receipt": "slip",
  "Expense voucher": "form",
  Circular: "hero",
  Notice: "bold",
  "Office order": "formal",
  Resolution: "quote",
  "Appointment order": "formal",
  "Publication certificate": "dark",
  "Contributor certificate": "split"
};

export const DEFAULT_SIGNATORIES: Signatory[] = [
  { on: true, name: "Authorised Signatory", des: "Coordinator, Nuhro Thozhiyoor", img: "" },
  { on: false, name: "Name", des: "Designation", img: "" },
  { on: false, name: "Name", des: "Designation", img: "" },
];

// ---------- helpers ----------

export const isBig = (k: FieldKey) => ["body", "rows", "attendees", "addr"].includes(k);

export const labelFor = (type: TemplateType, k: FieldKey): string => LABEL_OVERRIDES[type]?.[k] ?? LABELS[k];

export const pageSize = (t: Template): [number, number] => SIZE_BY_NAME[t.name] ?? SIZE_BY_TYPE[t.type];

export const normKey = (s: string) => String(s).toLowerCase().replace(/[^a-z0-9]/g, "");

export const todayLabel = () =>
  new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

/** "NT/2026/001" + 2 -> "NT/2026/003" */
export const incrementRef = (ref: string, n: number) =>
  String(ref).replace(/(\d+)(?!.*\d)/, (m) => String(+m + n).padStart(m.length, "0"));

export const initialValues = (t: Template, today: string): Values => ({
  ref: "NT/2026/001",
  date: today,
  to: "",
  addr: "",
  subject: t.subject,
  body: t.body,
  party: "",
  amount: "1,000",
  mode: "UPI",
  venue: "",
  attendees: "",
  rows: t.rows,
  note: "",
});

/** One Values object per document: the form values, overridden row by row when a sheet is loaded. */
export const expandDocuments = (values: Values, rows: Partial<Values>[]): Values[] =>
  rows.length ? rows.map((r, i) => ({ ...values, ref: incrementRef(values.ref, i), ...r })) : [values];
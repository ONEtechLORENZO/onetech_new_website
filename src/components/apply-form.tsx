"use client";

import { useRef, useState, type DragEvent } from "react";

const ROLES = [
  "Sviluppatore Frontend",
  "Sviluppatore Backend",
  "Sviluppatore Full Stack",
  "Product Manager",
  "Designer",
  "Vendite",
  "Altro",
];

const LEVELS = [
  "Studente / Stagista",
  "Professionista (1-4 anni)",
  "Senior (5+ anni)",
];

const MAX_MB = 5;
const ACCEPT = [".pdf", ".doc", ".docx"];

/* Paste the Apps Script Web App /exec URL here after deploying Code.gs */
const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxQI-ginPuLLcz87psa3KAIIA9pN75shwCfGxh-iEmMSJZPC3mUTsAgSLwlgK0Wru3iqQ/exec";

function toBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () =>
      resolve(String(reader.result).split(",")[1] ?? "");
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}

/* Numero italiano: 9-11 cifre, con o senza prefisso +39 / 0039 */
function isValidItalianPhone(value: string): boolean {
  const digits = value.replace(/[\s.\-()]/g, "");
  return /^(?:\+39|0039)?\d{9,11}$/.test(digits);
}

function checkFile(candidate: File): string {
  const ext = "." + (candidate.name.split(".").pop() ?? "").toLowerCase();
  if (!ACCEPT.includes(ext)) {
    return "Formato non supportato. Usa PDF, DOC o DOCX.";
  }
  if (candidate.size > MAX_MB * 1024 * 1024) {
    return `Il file supera i ${MAX_MB}MB.`;
  }
  return "";
}

function FileField({
  label,
  file,
  error,
  onFile,
  onError,
}: {
  label: string;
  file: File | null;
  error: string;
  onFile: (file: File) => void;
  onError: (message: string) => void;
}) {
  const input = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const take = (candidate: File | undefined) => {
    onError("");
    if (!candidate) return;
    const problem = checkFile(candidate);
    if (problem) {
      onError(problem);
      return;
    }
    onFile(candidate);
  };

  const onDrop = (event: DragEvent) => {
    event.preventDefault();
    setDragOver(false);
    take(event.dataTransfer.files?.[0]);
  };

  return (
    <div className="apply__field">
      <span>{label}</span>
      <button
        type="button"
        className={`apply__drop${dragOver ? " is-over" : ""}${file ? " has-file" : ""}`}
        onClick={() => input.current?.click()}
        onDragOver={(event) => {
          event.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
      >
        <strong>{file ? file.name : "Nessun file selezionato"}</strong>
        <span>Clicca per caricare oppure trascina e rilascia</span>
        <span className="apply__dropHint">PDF, DOC, DOCX (Max {MAX_MB}MB)</span>
      </button>
      <input
        ref={input}
        type="file"
        accept={ACCEPT.join(",")}
        hidden
        onChange={(event) => take(event.target.files?.[0])}
      />
      {error && <p className="apply__error">{error}</p>}
    </div>
  );
}

export default function ApplyForm() {
  const [role, setRole] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [cv, setCv] = useState<File | null>(null);
  const [cvError, setCvError] = useState("");
  const [consent, setConsent] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="apply__done">
        <h2>Grazie per la tua candidatura!</h2>
        <p>
          Abbiamo ricevuto le tue informazioni. Il nostro team le esaminerà e
          ti contatteremo al più presto.
        </p>
      </div>
    );
  }

  return (
    <form
      className="apply__form"
      onSubmit={async (event) => {
        event.preventDefault();
        const fields = new FormData(event.currentTarget);
        let invalid = false;
        if (!isValidEmail(String(fields.get("email") ?? ""))) {
          setEmailError("Inserisci un indirizzo email valido.");
          invalid = true;
        }
        if (!isValidItalianPhone(String(fields.get("telefono") ?? ""))) {
          setPhoneError(
            "Inserisci un numero valido: 9-11 cifre, con o senza prefisso +39.",
          );
          invalid = true;
        }
        if (!cv) {
          setCvError("Carica il tuo CV per continuare.");
          return;
        }
        if (invalid || sending) return;

        const form = fields;
        setSendError("");
        setSending(true);
        try {
          const payload = {
            nome: form.get("nome"),
            email: form.get("email"),
            telefono: form.get("telefono"),
            ruolo: form.get("ruolo"),
            ruoloAltro: form.get("ruolo_altro") ?? "",
            esperienza: form.get("esperienza") ?? "",
            messaggio: form.get("messaggio") ?? "",
            lettera: form.get("lettera") ?? "",
            files: [
              { name: cv.name, type: cv.type, data: await toBase64(cv) },
            ],
          };

          if (!APPS_SCRIPT_URL) {
            throw new Error("APPS_SCRIPT_URL non configurato");
          }

          const res = await fetch(APPS_SCRIPT_URL, {
            method: "POST",
            body: JSON.stringify(payload),
          });
          const out = await res.json();
          if (!out.ok) throw new Error(out.error || "Invio non riuscito");
          setSent(true);
        } catch {
          setSendError(
            "Invio non riuscito. Riprova tra qualche istante oppure scrivici a jobs@otech.one.",
          );
        } finally {
          setSending(false);
        }
      }}
    >
      <p className="apply__kicker">Candidatura</p>
      <h2 className="apply__formTitle">Candidati ora</h2>

      <label className="apply__field">
        <span>Nome e cognome *</span>
        <input type="text" name="nome" required placeholder="Olivia Rossi" />
      </label>

      <label className="apply__field">
        <span>Indirizzo email *</span>
        <input
          type="email"
          name="email"
          required
          placeholder="olivia.rossi@email.com"
          onChange={() => setEmailError("")}
        />
        {emailError && <p className="apply__error">{emailError}</p>}
      </label>

      <label className="apply__field">
        <span>Numero di telefono *</span>
        <input
          type="tel"
          name="telefono"
          required
          placeholder="+39 333 000 0000"
          onChange={() => setPhoneError("")}
        />
        {phoneError && <p className="apply__error">{phoneError}</p>}
      </label>

      <label className="apply__field">
        <span>Ruolo per cui ti candidi *</span>
        <select
          name="ruolo"
          required
          value={role}
          onChange={(event) => setRole(event.target.value)}
        >
          <option value="" disabled>
            Seleziona un ruolo
          </option>
          {ROLES.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      {role === "Altro" && (
        <label className="apply__field">
          <span>Specifica il ruolo *</span>
          <input
            type="text"
            name="ruolo_altro"
            required
            placeholder="Scrivi il ruolo per cui ti candidi"
          />
        </label>
      )}

      <fieldset className="apply__levels">
        <legend>Livello di esperienza</legend>
        <div>
          {LEVELS.map((level) => (
            <label key={level} className="apply__pill">
              <input type="radio" name="esperienza" value={level} />
              <span>{level}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <label className="apply__field">
        <span>Perché One Tech? (Breve messaggio di presentazione)</span>
        <textarea name="messaggio" rows={5} />
      </label>

      <FileField
        label="CV / Curriculum *"
        file={cv}
        error={cvError}
        onFile={setCv}
        onError={setCvError}
      />

      <label className="apply__field">
        <span>Lettera di presentazione *</span>
        <textarea
          name="lettera"
          rows={7}
          required
          placeholder="Scrivi qui la tua lettera di presentazione"
        />
      </label>

      <label className="apply__consent">
        <input
          type="checkbox"
          checked={consent}
          onChange={(event) => setConsent(event.target.checked)}
          required
        />
        <span>
          Confermo che le informazioni fornite sono accurate e accetto il
          trattamento dei miei dati personali per finalità di selezione del
          personale.
        </span>
      </label>

      {sendError && <p className="apply__error">{sendError}</p>}

      <button
        type="submit"
        className="apply__submit"
        disabled={!consent || sending}
      >
        {sending ? "Invio in corso…" : "Invia candidatura"}
      </button>
    </form>
  );
}

import { useState } from "react";
import { Mail } from "lucide-react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
          <Mail className="h-5 w-5" />
        </div>
        <div>
          <p className="font-display text-sm font-bold">Newsletter</p>
          <p className="text-xs text-muted-foreground">Nouveautés & promotions</p>
        </div>
      </div>
      {submitted ? (
        <p className="mt-4 text-sm text-success font-medium">✓ Merci ! Vous recevrez nos actualités.</p>
      ) : (
        <form onSubmit={submit} className="mt-4 flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="votre@email.com"
            required
            className="h-10 flex-1 rounded-lg bg-muted px-3 text-sm outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="submit"
            className="h-10 rounded-lg bg-primary px-4 text-xs font-semibold text-primary-foreground"
          >
            OK
          </button>
        </form>
      )}
    </div>
  );
}

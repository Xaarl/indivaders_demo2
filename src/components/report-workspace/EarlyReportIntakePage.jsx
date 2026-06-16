import { ArrowLeft, ArrowRight, CheckCircle2, Send } from "lucide-react";
import { useState } from "react";
import { createReportRequest } from "../../lib/reportRequestStore.js";

const concernOptions = [
  { id: "positioning", label: "Positioning" },
  { id: "price", label: "Price" },
  { id: "tags", label: "Tags" },
  { id: "reviews", label: "Review risks" },
  { id: "comparables", label: "Comparables" },
  { id: "creators", label: "Creators" },
];

const stageOptions = ["concept", "prototype", "demo", "Steam page", "pre-launch", "launched"];

function EarlyReportIntakePage() {
  const [form, setForm] = useState({
    projectTitle: "",
    contactEmail: "",
    description: "",
    stage: "demo",
    steamUrl: "",
    referenceGames: "",
    mainConcerns: ["positioning", "reviews"],
    notes: "",
  });
  const [errors, setErrors] = useState({});

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function toggleConcern(id) {
    setForm((current) => {
      const hasConcern = current.mainConcerns.includes(id);
      return {
        ...current,
        mainConcerns: hasConcern
          ? current.mainConcerns.filter((item) => item !== id)
          : [...current.mainConcerns, id],
      };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const result = createReportRequest(form);

    if (!result.ok) {
      setErrors(result.errors);
      return;
    }

    window.location.hash = result.request.workspaceHash;
  }

  return (
    <main className="workspace-shell intake-shell">
      <header className="workspace-topbar">
        <a href="#">
          <ArrowLeft size={17} aria-hidden="true" />
          Back to landing
        </a>
        <a href="#sample-report">Open sample report</a>
      </header>

      <section className="intake-hero">
        <div>
          <p className="workspace-kicker">Early automated report</p>
          <h1>Turn your game idea into a private positioning workspace.</h1>
          <p>
            Submit the minimum context needed to generate a Steam positioning report: what the game is, where it is in development, and which references matter.
          </p>
        </div>
        <aside>
          <CheckCircle2 size={22} aria-hidden="true" />
          <strong>$49 early report</strong>
          <span>Submit the request first. Payment confirmation follows when the report slot is available.</span>
        </aside>
      </section>

      <form className="intake-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <label>
            <span>Project title</span>
            <input
              value={form.projectTitle}
              onChange={(event) => updateField("projectTitle", event.target.value)}
              placeholder="Night City Brawler"
            />
            {errors.projectTitle ? <small>{errors.projectTitle}</small> : null}
          </label>

          <label>
            <span>Contact email</span>
            <input
              type="email"
              value={form.contactEmail}
              onChange={(event) => updateField("contactEmail", event.target.value)}
              placeholder="you@studio.com"
            />
            {errors.contactEmail ? <small>{errors.contactEmail}</small> : null}
          </label>

          <label className="wide-field">
            <span>Short game description</span>
            <textarea
              value={form.description}
              onChange={(event) => updateField("description", event.target.value)}
              placeholder="Genre, camera, core loop, fantasy, audience, and what makes it different."
              rows={5}
            />
            {errors.description ? <small>{errors.description}</small> : null}
          </label>

          <label>
            <span>Current stage</span>
            <select value={form.stage} onChange={(event) => updateField("stage", event.target.value)}>
              {stageOptions.map((stage) => (
                <option key={stage} value={stage}>
                  {stage}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span>Steam URL if available</span>
            <input
              value={form.steamUrl}
              onChange={(event) => updateField("steamUrl", event.target.value)}
              placeholder="https://store.steampowered.com/app/..."
            />
          </label>

          <label className="wide-field">
            <span>Reference games</span>
            <textarea
              value={form.referenceGames}
              onChange={(event) => updateField("referenceGames", event.target.value)}
              placeholder="One per line, or comma-separated. Include games you admire and games you fear competing with."
              rows={4}
            />
          </label>
        </div>

        <fieldset className="concern-fieldset">
          <legend>Main concern</legend>
          <div>
            {concernOptions.map((option) => (
              <button
                className={form.mainConcerns.includes(option.id) ? "is-selected" : ""}
                key={option.id}
                type="button"
                onClick={() => toggleConcern(option.id)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </fieldset>

        <label className="notes-field">
          <span>Anything specific the report should answer?</span>
          <textarea
            value={form.notes}
            onChange={(event) => updateField("notes", event.target.value)}
            placeholder="Launch window, biggest worry, current Steam page problem, creator plan, or pricing assumption."
            rows={4}
          />
        </label>

        <footer className="intake-submit-row">
          <p>You will get a private workspace preview immediately after submitting.</p>
          <button className="button button-primary" type="submit">
            <Send size={18} aria-hidden="true" />
            Create workspace
            <ArrowRight size={18} aria-hidden="true" />
          </button>
        </footer>
      </form>
    </main>
  );
}

export default EarlyReportIntakePage;

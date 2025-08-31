export const metadata = {
  title: "Term Insurance 101: What to buy (and what to skip)",
};

export default function Page() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-10 prose prose-slate">
      <h1>Term Insurance 101: What to buy (and what to skip)</h1>
      <p>
        Term insurance is pure risk cover. Focus on adequate <strong>sum assured</strong>,
        credible insurer, and claim support. Skip shiny add-ons you don’t need.
      </p>
      <h2>How much cover?</h2>
      <ul>
        <li>Basic thumb rule: 15–20× annual take-home, adjusted for liabilities.</li>
        <li>Consider existing assets, loans, and dependents.</li>
      </ul>
      <h2>Must-know</h2>
      <ul>
        <li>Keep riders minimal (accident, critical illness only if needed).</li>
        <li>Prefer level premiums, honest health disclosures, and e-KYC.</li>
      </ul>
      <p className="text-sm text-slate-500">
        Pro tip: Do a quick FnA before buying; coverage aligns better and avoids over/under-insuring.
      </p>
    </article>
  );
}

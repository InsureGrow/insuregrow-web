export const metadata = {
  title: "Financial Needs Analysis (FnA): A 10-minute playbook",
};

export default function Page() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-10 prose prose-slate">
      <h1>Financial Needs Analysis (FnA): A 10-minute playbook</h1>
      <p>
        A lightweight FnA keeps your insurance and investments anchored to goals.
        Here’s a fast way to get to a workable plan.
      </p>
      <h2>3 buckets</h2>
      <ol>
        <li><strong>Protect</strong>: Term cover + health + emergency fund (6–9 months).</li>
        <li><strong>Grow</strong>: Simple index funds or ETFs; automate SIPs.</li>
        <li><strong>Goals</strong>: Education, home, retirement—assign amounts & timelines.</li>
      </ol>
      <p className="text-sm text-slate-500">
        Keep it iterative—update the plan when life changes (new loan, child, job move).
      </p>
    </article>
  );
}

// Three of these are drawn at random on each load, so the hero surfaces
// different work each visit instead of the same four vanity counters.
// Everything here is a concrete outcome, not a tally of things that exist.
const highlights = [
  { value: '80%', label: 'payroll processing time removed' },
  { value: '60%', label: 'manual HR work eliminated' },
  { value: '3', label: 'CRM modules built and maintained' },
  { value: '3 mo', label: 'NeuroScreen delivered end to end' },
  { value: '4', label: 'LLM providers in A.R.I.A fallback chain' },
  { value: '2', label: 'AWS regions running in production' },
  { value: '₱0', label: 'per-user cost to run BoardHelper' },
  { value: 'RAG', label: 'retrieval pipelines in company workflows' },
  { value: 'SSS+', label: 'PhilHealth and Pag-IBIG rules encoded' },
  { value: '5', label: 'platforms shipped to production' },
  { value: 'AU', label: 'data residency, Privacy Act compliant' },
];

// Fisher-Yates on a copy — never mutate the exported array.
export function pickHighlights(count = 3) {
  const pool = [...highlights];
  for (let i = pool.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, count);
}

export default highlights;

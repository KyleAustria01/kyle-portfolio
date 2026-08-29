// DRAFTS — written to be edited. Every post below is grounded in work Kyle
// actually did, but the wording is a starting point, not a finished piece.
// Replace `body` paragraphs freely; keep `title`, `date`, `read` in step.
const posts = [
  {
    id: 'boardhelper-why',
    title: 'A review centre costs more than a month of groceries. So I built BoardHelper.',
    date: 'Aug 2026',
    read: '5 min',
    tag: 'BUILDING FOR PH',
    excerpt:
      'Board exams in the Philippines are a fork in the road, and the review industry sits right on top of it. BoardHelper is my attempt to move some of that under the free tier.',
    body: [
      'Passing a board exam here changes what your whole family can afford. Nursing, criminology, LET, the engineering boards — the licence is the difference between a job and a job that pays. And sitting on top of that is a review industry priced for people who already have money.',
      'The people I know who struggled were not struggling to understand the material. They were struggling to organise it. Handouts in a group chat, PDFs on a phone with no way to mark them up, and no honest sense of which subject they were weakest in until the diagnostic exam told them, too late.',
      'So BoardHelper is deliberately not a course. It has no content of its own. You bring your own PDFs, decks, and photos of handouts, highlight them in the browser, and turn the parts that matter into flashcards. It schedules those cards so the ones you keep getting wrong come back sooner, and it measures your readiness per subject against your exam date instead of giving you one meaningless overall percentage.',
      'The sharing model came from watching how people actually study here: one person in the barkada has the good reviewer, and everyone else needs it. Libraries can be shared with viewer, editor, or admin roles, so a study group has one copy that everybody works from rather than fifteen forwarded files.',
      'It runs on Vercel and Render, on free tiers, because the moment it costs me money per user I have to charge, and charging defeats the point.',
    ],
  },
  {
    id: 'free-tier-engineering',
    title: 'Engineering for the free tier is a real constraint, not a compromise',
    date: 'Jul 2026',
    read: '4 min',
    tag: 'INFRASTRUCTURE',
    excerpt:
      'If your users cannot pay and neither can you, the free tier stops being a shortcut and becomes the actual design brief.',
    body: [
      'Both of my side projects run entirely on free tiers — Vercel for the frontends, Render for the backends, Upstash for Redis. That is not laziness. It is the constraint that makes the project possible at all, and once you accept it, it changes your architecture.',
      'The clearest example: a free Render service sleeps after fifteen minutes of inactivity, and the first request after that takes around thirty seconds to wake it. For a tool a student opens twice a day, that is the entire first impression. You cannot engineer that away, so you design around it — do the work the user cares about on the client where you can, and make the server round-trip something they expect to wait for.',
      'A.R.I.A pushed this further. It runs a live voice interview, which means it needs a language model that answers fast and does not fall over. Instead of paying one provider, it runs a fallback chain — Cerebras, then Groq, then AWS Bedrock, then Gemini. If a free tier is exhausted or a provider is down, the interview keeps going on the next one. Redundancy replaced budget.',
      'The habit this builds is useful even when there is money. You end up knowing exactly what every service costs you, because you chose each one under a hard ceiling.',
    ],
  },
  {
    id: 'payroll-is-schema',
    title: 'Philippine payroll is a schema problem before it is a maths problem',
    date: 'Jun 2026',
    read: '6 min',
    tag: 'ENTERPRISE',
    excerpt:
      'SSS, PhilHealth, and Pag-IBIG are not formulas you write once. They are tables that change, and the schema has to expect that.',
    body: [
      'The first instinct when you are asked to build payroll is to go and find the contribution formulas. That is the easy half. The hard half is that the contribution tables change, the effective dates matter, and you will be asked to re-run a payroll period from three months ago exactly as it was computed then.',
      'That single requirement rules out hardcoding rates, and it rules out storing only the result. You need the rate tables as versioned data with effective dates, and you need each payslip to record which version produced it. Otherwise the first time a rate changes, every historical payslip in your system silently becomes a lie.',
      'The 80% reduction in processing time we measured did not come from the arithmetic being fast. It came from removing the manual reconciliation step that existed because nobody trusted the previous numbers. Making the computation auditable is what made it quick.',
      'This is the part of local software that does not transfer. You cannot lift a payroll system from another country and adapt it, because the statutory surface is the product. Somebody has to sit down and encode the actual rules, and that somebody has to be here.',
    ],
  },
  {
    id: 'ai-into-existing-work',
    title: 'Putting AI into a company that already has systems',
    date: 'May 2026',
    read: '5 min',
    tag: 'AI',
    excerpt:
      'The interesting work is not the model. It is the retrieval layer, and the boring question of where your company already keeps its knowledge.',
    body: [
      'The default demand is "add AI to it", and the default delivery is a chat bubble in the bottom-right corner that answers nothing useful. That version fails because it has no access to anything the company actually knows.',
      'The work that matters is retrieval. Where does the knowledge live — the helpdesk tickets, the process documents, the records in Airtable that nobody has ever exported? Getting that into a form a model can retrieve from, with embeddings in Pinecone and Elasticsearch handling the rest, is most of the job. The model is the last and smallest step.',
      'It also forces an honest audit. Building a retrieval pipeline over your internal knowledge tells you very quickly how much of that knowledge is undocumented, contradictory, or living in one person’s head. Some of the value is the audit, not the assistant.',
      'For a country whose largest tech export is BPO work, this is the part worth learning. Not training models, which we will not do at scale, but wiring them into processes that already exist and already employ people.',
    ],
  },
];

export default posts;

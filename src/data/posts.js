// DRAFT — written to be edited. Grounded in work Kyle actually did; the
// wording is a starting point, not a finished piece.
const posts = [
  {
    slug: 'boardhelper',
    title: 'A review centre costs more than a month of groceries. So I built BoardHelper.',
    date: 'Aug 2026',
    read: '5 min',
    tag: 'BUILDING FOR PH',
    excerpt:
      'Board exams in the Philippines are a fork in the road, and the review industry sits right on top of it. BoardHelper is my attempt to move some of that under the free tier.',
    body: [
      'Passing a board exam here changes what your whole family can afford. Nursing, criminology, LET, the engineering boards — the licence is the difference between a job and a job that pays. And sitting on top of that is a review industry priced for people who already have money.',
      'The people I know who struggled were not struggling to understand the material. They were struggling to organise it. Handouts scattered across a group chat, PDFs on a phone with no way to mark them up, and no honest sense of which subject they were weakest in until the diagnostic exam told them, too late to do much about it.',
      'So BoardHelper is deliberately not a course. It has no content of its own. You bring your own PDFs, slide decks, and photos of handouts, highlight them directly in the browser, and turn the parts that matter into flashcards. It schedules those cards so the ones you keep getting wrong come back sooner, and it measures your readiness per subject against your exam date — weakest subjects first — instead of giving you one meaningless overall percentage.',
      'The sharing model came from watching how people actually study here: one person in the barkada has the good reviewer, and everyone else needs it. Libraries can be shared with viewer, editor, or admin roles, so a study group works from one copy instead of fifteen forwarded files drifting out of sync.',
      'It runs on Vercel and Render, on free tiers. That is a deliberate constraint, not a shortcut. The moment it costs me money per user, I have to charge — and charging defeats the entire point of building it.',
    ],
  },
];

export default posts;

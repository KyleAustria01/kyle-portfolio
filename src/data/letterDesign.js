// Mirrors scripts/build_resume_docx.js so the cover letter and the resume read
// as one set of documents. Change both together.
export const FONT = 'Calibri';
export const ACCENT = '0F7A4D'; // deep green
export const ACCENT_DARK = '0A5C3A';
export const INK = '2B2B2B';
export const MUTED = '6B6B6B';

export const NAME = 'KYLE RYAN AUSTRIA';
export const ROLE = 'Full Stack Developer';
export const CONTACT =
  'Pampanga, Philippines   ·   +63 976 272 2124   ·   kyleryanaustria@gmail.com   ·   linkedin.com/in/kyle-austria   ·   github.com/KyleAustria01';

// US Letter, in twips, matching the resume's page setup.
export const PAGE = {
  width: 12240,
  height: 15840,
  margin: { top: 380, bottom: 380, left: 850, right: 850 },
};

export const todayLong = () =>
  new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

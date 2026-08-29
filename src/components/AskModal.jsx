import { useState, useRef, useEffect, useCallback } from 'react';
import { Send } from 'lucide-react';
import kyleData from '../data/kyleData';

const SUGGESTIONS = [
  'What does he actually build?',
  'Tell me about BoardHelper',
  'What is NeuroScreen?',
  'Experience with AI and RAG?',
  'AWS and cloud work?',
  'How do I get in touch?',
];

const GREETING =
  "Ask me about Kyle's work — the platforms he's built, his stack, his AI and cloud experience, or how to reach him.";

// Conversational lead-ins carry no topic. Stripping them stops a phrase like
// "tell me about" outscoring the actual subject of the question.
const FILLER = [
  /^(can|could|would) you\s+/,
  /^please\s+/,
  /^(do you know|any info on|info on|more on)\s+/,
  /^(tell|talk to) me (about|more about)\s+/,
  /^tell me\s+/,
  /^i want to know about\s+/,
  /^(what|who|how|when|where)('s|s)?\s+(is|are|was|were|does|do|did|has|have|about)\s+/,
  /^what'?s\s+/,
];

function normalise(query) {
  let text = query.toLowerCase().trim().replace(/[?!.,]+$/g, '');
  let changed = true;
  while (changed) {
    changed = false;
    for (const re of FILLER) {
      const next = text.replace(re, '');
      if (next !== text) {
        text = next;
        changed = true;
      }
    }
  }
  return text.trim();
}

// Whole-token match, so "ai" no longer fires inside "email" and "hi" no longer
// fires inside "shipping".
function hasKeyword(text, keyword) {
  const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`(^|[^a-z0-9])${escaped}([^a-z0-9]|$)`).test(text);
}

// Longer keywords are more specific, so they score higher. `weak` terms are
// generic words that should only decide a tie, never beat a topical hit.
function scoreEntry(text, qa) {
  let score = 0;
  for (const kw of qa.keywords || []) {
    if (hasKeyword(text, kw)) score += kw.length;
  }
  for (const kw of qa.weak || []) {
    if (hasKeyword(text, kw)) score += kw.length * 0.3;
  }
  return score;
}

function findBestAnswer(input) {
  const raw = input.toLowerCase().trim().replace(/[?!.,]+$/g, '');
  const stripped = normalise(input);

  const greetWords = ['hi', 'hello', 'hey', 'sup', 'yo', 'good morning', 'good evening', 'greetings'];
  if (greetWords.some((g) => raw === g || raw.startsWith(`${g} `))) {
    return "Hey. Ask me about Kyle's experience, stack, projects, or how to reach him.";
  }

  // Score the stripped question first; fall back to the raw text if the filler
  // rules removed the only thing that matched.
  for (const text of [stripped, raw]) {
    if (!text) continue;
    let bestScore = 0;
    let bestAnswer = null;
    for (const qa of kyleData.qaPatterns) {
      const score = scoreEntry(text, qa);
      if (score > bestScore) {
        bestScore = score;
        bestAnswer = qa.answer;
      }
    }
    if (bestAnswer) return bestAnswer;
  }

  if (['summary', 'overview', 'brief', 'short', 'tldr'].some((k) => hasKeyword(raw, k))) {
    return kyleData.summary;
  }
  if (raw.includes('thank')) {
    return 'Anytime. Anything else you want to know?';
  }
  return "I'm best on Kyle's work experience, technical stack, projects, education, and contact details. Try \"what has he built?\" or \"what's his stack?\"";
}

export default function AskModal({ onClose }) {
  const [messages, setMessages] = useState([{ role: 'bot', text: GREETING }]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const endRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  const send = useCallback(
    (text) => {
      const trimmed = (text ?? input).trim();
      if (!trimmed || isTyping) return;

      setMessages((prev) => [...prev, { role: 'user', text: trimmed }]);
      setInput('');
      setIsTyping(true);

      const answer = findBestAnswer(trimmed);
      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [...prev, { role: 'bot', text: answer }]);
      }, 500);
    },
    [input, isTyping],
  );

  const showSuggestions = messages.length <= 1;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-panel ask-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Ask about Kyle"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-bar">
          <span className="modal-title">ask_anything.sh</span>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            esc
          </button>
        </div>

        <div className="ask-messages">
          {messages.map((msg, i) => (
            <div key={i} className={`ask-msg ${msg.role}`}>
              {msg.text}
            </div>
          ))}
          {isTyping && (
            <div className="typing-indicator">
              <span className="typing-dot" />
              <span className="typing-dot" />
              <span className="typing-dot" />
            </div>
          )}
          <div ref={endRef} />
        </div>

        {showSuggestions && (
          <div className="ask-suggestions">
            {SUGGESTIONS.map((s) => (
              <button key={s} className="ask-suggestion" onClick={() => send(s)}>
                {s}
              </button>
            ))}
          </div>
        )}

        <div className="ask-input-area">
          <span className="ask-prompt" aria-hidden="true">
            &gt;
          </span>
          <input
            ref={inputRef}
            type="text"
            className="ask-input"
            placeholder="Ask a question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
            disabled={isTyping}
          />
          <button
            className="ask-send"
            onClick={() => send()}
            disabled={!input.trim() || isTyping}
            aria-label="Send"
          >
            <Send size={15} />
          </button>
        </div>

        <p className="modal-hint">
          <kbd>↵</kbd> send · <kbd>esc</kbd> close
        </p>
      </div>
    </div>
  );
}

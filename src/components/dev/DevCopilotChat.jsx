import { useState, useRef, useEffect, useCallback } from 'react';
import { X, Send, ChevronDown } from 'lucide-react';
import { CopilotIcon } from './DevIcons';
import kyleData from '../../data/kyleData';

const SUGGESTIONS = [
  "Who is Kyle?",
  "What's his tech stack?",
  "Tell me about his projects",
  "Work experience?",
  "How to contact him?",
  "What's A.R.I.A?",
];

const GREETING = `Hey! I'm **Copilot** for Kyle's portfolio. Ask me anything about his skills, experience, projects, or education.

\`\`\`
> kyle --help
\`\`\`

Try one of the suggestions below to get started.`;

function findBestAnswer(input) {
  const lower = input.toLowerCase().trim();

  const greetWords = ['hi', 'hello', 'hey', 'sup', 'yo', 'good morning', 'good evening', 'greetings', 'howdy'];
  if (greetWords.some(g => lower === g || lower.startsWith(g + ' ') || lower.startsWith(g + '!'))) {
    return "Hey there! I can tell you about Kyle's experience, skills, projects, education, and more. What would you like to know?";
  }

  let bestScore = 0;
  let bestAnswer = null;

  for (const qa of kyleData.qaPatterns) {
    let score = 0;
    for (const kw of qa.keywords) {
      if (lower.includes(kw)) {
        score += kw.split(' ').length;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestAnswer = qa.answer;
    }
  }

  if (bestScore > 0 && bestAnswer) return bestAnswer;

  const summaryKeywords = ['summary', 'overview', 'brief', 'short', 'quick', 'tldr'];
  if (summaryKeywords.some(k => lower.includes(k))) {
    return kyleData.summary;
  }

  if (lower.includes('fun') || lower.includes('fact') || lower.includes('interesting') || lower.includes('random')) {
    const facts = kyleData.funFacts;
    return `Here's something about Kyle: ${facts[Math.floor(Math.random() * facts.length)]}`;
  }

  if (lower.includes('thank') || lower.includes('thanks') || lower === 'ty') {
    return "You're welcome! Let me know if there's anything else you'd like to know about Kyle.";
  }

  return "Hmm, I'm not sure about that. I can answer questions about Kyle's **work experience**, **technical skills**, **projects**, **education**, and **contact info**. Try: `kyle.getProjects()` or `kyle.getTechStack()`";
}

function formatMessage(text) {
  // Simple markdown-ish rendering for Copilot style
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
    .replace(/\n/g, '<br/>');
}

export default function DevCopilotChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'copilot', text: GREETING },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSend = useCallback((text) => {
    const trimmed = (text || input).trim();
    if (!trimmed) return;

    setMessages(prev => [...prev, { role: 'user', text: trimmed }]);
    setInput('');
    setShowSuggestions(false);
    setIsTyping(true);

    const delay = 500 + Math.random() * 700;
    setTimeout(() => {
      const answer = findBestAnswer(trimmed);
      setIsTyping(false);
      setMessages(prev => [...prev, { role: 'copilot', text: answer }]);
      setShowSuggestions(true);
    }, delay);
  }, [input]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Copilot Chat Panel */}
      {isOpen && (
        <div className="copilot-panel">
          {/* Panel Header */}
          <div className="copilot-panel-header">
            <div className="copilot-panel-title">
              <CopilotIcon size={16} />
              <span>GitHub Copilot</span>
              <ChevronDown size={14} className="copilot-dropdown-icon" />
            </div>
            <div className="copilot-panel-actions">
              <button className="copilot-panel-close" onClick={() => setIsOpen(false)} title="Close">
                <X size={14} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="copilot-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`copilot-msg ${msg.role}`}>
                <div className="copilot-msg-icon">
                  {msg.role === 'copilot' ? (
                    <CopilotIcon size={16} />
                  ) : (
                    <div className="copilot-user-icon">K</div>
                  )}
                </div>
                <div className="copilot-msg-content">
                  <div className="copilot-msg-header">
                    {msg.role === 'copilot' ? 'GitHub Copilot' : 'You'}
                  </div>
                  <div
                    className="copilot-msg-text"
                    dangerouslySetInnerHTML={{ __html: formatMessage(msg.text) }}
                  />
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="copilot-msg copilot">
                <div className="copilot-msg-icon">
                  <CopilotIcon size={16} />
                </div>
                <div className="copilot-msg-content">
                  <div className="copilot-msg-header">GitHub Copilot</div>
                  <div className="copilot-typing">
                    <span className="copilot-typing-dot" />
                    <span className="copilot-typing-dot" />
                    <span className="copilot-typing-dot" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions */}
          {showSuggestions && messages.length <= 3 && (
            <div className="copilot-suggestions">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  className="copilot-suggestion"
                  onClick={() => handleSend(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="copilot-input-area">
            <div className="copilot-input-wrapper">
              <input
                ref={inputRef}
                type="text"
                className="copilot-input"
                placeholder="Ask Copilot about Kyle..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isTyping}
              />
              <button
                className="copilot-send"
                onClick={() => handleSend()}
                disabled={!input.trim() || isTyping}
                aria-label="Send"
              >
                <Send size={14} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Copilot Floating Button */}
      <button
        className={`copilot-fab${isOpen ? ' open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close Copilot' : 'Open Copilot Chat'}
        title={isOpen ? 'Close Copilot' : 'Ask Copilot about Kyle'}
      >
        {isOpen ? <X size={20} /> : <CopilotIcon size={22} />}
      </button>
    </>
  );
}

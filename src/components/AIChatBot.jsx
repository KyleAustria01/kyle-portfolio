import { useState, useRef, useEffect, useCallback } from 'react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import kyleData from '../data/kyleData';

const SUGGESTIONS = [
  "Who is Kyle?",
  "What's his tech stack?",
  "Tell me about his projects",
  "Work experience?",
  "How to contact him?",
  "What's A.R.I.A?",
];

const GREETING = "Hey! 👋 I'm Kyle's AI assistant. Ask me anything about his experience, skills, projects, or education. I'm happy to help!";

function findBestAnswer(input) {
  const lower = input.toLowerCase().trim();

  // Check greeting first
  const greetWords = ['hi', 'hello', 'hey', 'sup', 'yo', 'good morning', 'good evening', 'greetings', 'howdy'];
  if (greetWords.some(g => lower === g || lower.startsWith(g + ' ') || lower.startsWith(g + '!'))) {
    return "Hey there! 👋 I'm Kyle's AI assistant. I can tell you about Kyle's experience, skills, projects, education, and more. What would you like to know?";
  }

  // Score each QA pattern based on keyword matches
  let bestScore = 0;
  let bestAnswer = null;

  for (const qa of kyleData.qaPatterns) {
    let score = 0;
    for (const kw of qa.keywords) {
      if (lower.includes(kw)) {
        score += kw.split(' ').length; // Multi-word keywords score higher
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestAnswer = qa.answer;
    }
  }

  if (bestScore > 0 && bestAnswer) return bestAnswer;

  // Fallback: try matching against summary
  const summaryKeywords = ['summary', 'overview', 'brief', 'short', 'quick', 'tldr'];
  if (summaryKeywords.some(k => lower.includes(k))) {
    return kyleData.summary;
  }

  // Fun facts
  if (lower.includes('fun') || lower.includes('fact') || lower.includes('interesting') || lower.includes('random')) {
    const facts = kyleData.funFacts;
    return `Here's something about Kyle: ${facts[Math.floor(Math.random() * facts.length)]}`;
  }

  // Thanks
  if (lower.includes('thank') || lower.includes('thanks') || lower === 'ty') {
    return "You're welcome! Let me know if there's anything else you'd like to know about Kyle. 😊";
  }

  // Default fallback
  return "That's a great question! I'm best at answering about Kyle's work experience, technical skills, projects, education, and contact info. Try asking something like \"What projects has Kyle built?\" or \"What's his tech stack?\"";
}

export default function AIChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: GREETING },
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

    // Simulate AI thinking delay
    const delay = 600 + Math.random() * 800;
    setTimeout(() => {
      const answer = findBestAnswer(trimmed);
      setIsTyping(false);
      setMessages(prev => [...prev, { role: 'bot', text: answer }]);
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
      {/* Chat Panel */}
      {isOpen && (
        <div className="chat-panel">
          <div className="chat-header">
            <div className="chat-avatar">
              <Bot size={18} />
            </div>
            <div className="chat-header-info">
              <h4>Kyle's AI Assistant</h4>
              <p>Ask me anything about Kyle</p>
            </div>
          </div>

          <div className="chat-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-msg ${msg.role === 'user' ? 'user' : 'bot'}`}>
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
            <div ref={messagesEndRef} />
          </div>

          {showSuggestions && messages.length <= 3 && (
            <div className="chat-suggestions">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  className="chat-suggestion"
                  onClick={() => handleSend(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          <div className="chat-input-area">
            <input
              ref={inputRef}
              type="text"
              className="chat-input"
              placeholder="Ask about Kyle..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isTyping}
            />
            <button
              className="chat-send"
              onClick={() => handleSend()}
              disabled={!input.trim() || isTyping}
              aria-label="Send message"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        className={`chat-fab${isOpen ? ' open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close chat' : 'Open AI assistant'}
        title={isOpen ? 'Close chat' : 'Ask AI about Kyle'}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </>
  );
}

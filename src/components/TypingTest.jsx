import { useState, useEffect, useRef, useCallback } from 'react';

// Words a developer actually types, so the test reads like the rest of the site.
const WORD_BANK = (
  'the be of and a to in it that for with as not on at by this we you do but from or which one ' +
  'would all will there say who make when can more if no out other so what time up go about than ' +
  'into could state only new year some take come these know see use get like then first any work ' +
  'now may such give over think most even find day also after way many must look before great back ' +
  'through long where much should well people down own just because good each those feel seem how ' +
  'build ship deploy commit branch merge rebase cache queue schema index migrate route render state ' +
  'server client module import export async await promise handler request response payload token ' +
  'stack script config docker cluster pipeline runtime service worker socket vector query record'
).split(' ');

const KB_ROWS = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm'];
const N_WORDS = 26;

const rand = (n) => Math.floor(Math.random() * n);
const genWords = () => Array.from({ length: N_WORDS }, () => WORD_BANK[rand(WORD_BANK.length)]);

export default function TypingTest({ onClose }) {
  const [words, setWords] = useState(genWords);
  const [typed, setTyped] = useState(['']); // what the user entered per word
  const [wi, setWi] = useState(0);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [flash, setFlash] = useState(null);
  const [stats, setStats] = useState({ wpm: 0, acc: 100, time: 0, raw: 0, correct: 0 });

  const startRef = useRef(0);
  const rafRef = useRef(null);
  const dispRef = useRef({ wpm: 0, acc: 100, time: 0 });
  const lastWriteRef = useRef(0);

  const reset = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    setWords(genWords());
    setTyped(['']);
    setWi(0);
    setStarted(false);
    setFinished(false);
    setConfirming(false);
    dispRef.current = { wpm: 0, acc: 100, time: 0 };
    lastWriteRef.current = 0;
    setStats({ wpm: 0, acc: 100, time: 0, raw: 0, correct: 0 });
  }, []);

  // Character tallies drive both the live readout and the result card.
  const tally = useCallback(
    (typedArr) => {
      let raw = 0;
      let correct = 0;
      typedArr.forEach((entry, i) => {
        const target = words[i] || '';
        raw += entry.length;
        for (let c = 0; c < entry.length; c += 1) {
          if (entry[c] === target[c]) correct += 1;
        }
      });
      return { raw, correct };
    },
    [words],
  );

  // Live stats loop — values ease toward their target and the readout is
  // throttled so the WPM number stays calm instead of flickering.
  useEffect(() => {
    if (!started || finished) return undefined;

    const loop = (ms) => {
      const t = (Date.now() - startRef.current) / 1000;
      const { raw, correct } = tally(typed);
      const tgtWpm = t > 0.5 ? correct / 5 / (t / 60) : 0;
      const tgtAcc = raw ? (correct / raw) * 100 : 100;
      const d = dispRef.current;
      d.wpm += (tgtWpm - d.wpm) * 0.16;
      d.acc += (tgtAcc - d.acc) * 0.16;
      d.time += (t - d.time) * 0.4;
      if (Math.abs(tgtWpm - d.wpm) < 0.5) d.wpm = tgtWpm;
      if (Math.abs(tgtAcc - d.acc) < 0.5) d.acc = tgtAcc;

      if (ms - lastWriteRef.current >= 240) {
        lastWriteRef.current = ms;
        setStats({
          wpm: Math.round(d.wpm),
          acc: Math.round(d.acc),
          time: Math.round(d.time),
          raw,
          correct,
        });
      }
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [started, finished, typed, tally]);

  const finish = useCallback(
    (finalTyped) => {
      cancelAnimationFrame(rafRef.current);
      const seconds = Math.max((Date.now() - startRef.current) / 1000, 0.001);
      const { raw, correct } = tally(finalTyped);
      setStats({
        wpm: Math.round(correct / 5 / (seconds / 60)),
        acc: raw ? Math.round((correct / raw) * 100) : 100,
        time: Math.round(seconds),
        raw: Math.round(raw / 5 / (seconds / 60)),
        correct,
      });
      setFinished(true);
    },
    [tally],
  );

  // Keyboard is the only input surface; there is no hidden text field.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        if (confirming) setConfirming(false);
        else onClose();
        return;
      }
      if (e.key === 'Tab') {
        e.preventDefault();
        if (started && !finished) setConfirming(true);
        else reset();
        return;
      }
      if (e.key === 'Enter') {
        if (confirming || finished) {
          e.preventDefault();
          reset();
        }
        return;
      }
      if (confirming || finished) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      if (e.key === 'Backspace') {
        e.preventDefault();
        setFlash('backspace');
        setTyped((prev) => {
          const next = [...prev];
          if (next[wi].length > 0) {
            next[wi] = next[wi].slice(0, -1);
          } else if (wi > 0) {
            setWi(wi - 1);
          }
          return next;
        });
        return;
      }

      if (e.key === ' ') {
        e.preventDefault();
        setFlash(' ');
        if (!started) {
          setStarted(true);
          startRef.current = Date.now();
        }
        if (typed[wi].length === 0) return;
        if (wi === words.length - 1) {
          finish(typed);
          return;
        }
        setTyped((prev) => [...prev, '']);
        setWi(wi + 1);
        return;
      }

      if (e.key.length === 1 && /[a-z]/i.test(e.key)) {
        e.preventDefault();
        const ch = e.key.toLowerCase();
        setFlash(ch);
        if (!started) {
          setStarted(true);
          startRef.current = Date.now();
        }
        setTyped((prev) => {
          const next = [...prev];
          next[wi] = next[wi] + ch;
          const isLast = wi === words.length - 1;
          if (isLast && next[wi].length >= words[wi].length) {
            // Completing the final word ends the run without needing a space.
            setTimeout(() => finish(next), 0);
          }
          return next;
        });
      }
    };

    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [confirming, finished, started, typed, wi, words, onClose, reset, finish]);

  useEffect(() => {
    if (!flash) return undefined;
    const t = setTimeout(() => setFlash(null), 110);
    return () => clearTimeout(t);
  }, [flash]);

  // Which key the on-screen keyboard should point at next.
  const current = words[wi] || '';
  const entry = typed[wi] || '';
  const nextKey = finished ? null : entry.length < current.length ? current[entry.length] : ' ';

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-label="Typing test">
      <div className="modal-panel tt-panel">
        <div className="modal-bar">
          <span className="modal-title">typing_test.exe</span>
          <button className="modal-close" onClick={onClose} aria-label="Close typing test">
            esc
          </button>
        </div>

        {finished ? (
          <div className="tt-results">
            <div className="tt-result-grid">
              <div>
                <span className="tt-result-value">{stats.wpm}</span>
                <span className="tt-result-label">words per minute</span>
              </div>
              <div>
                <span className="tt-result-value">{stats.acc}%</span>
                <span className="tt-result-label">accuracy</span>
              </div>
              <div>
                <span className="tt-result-value">{stats.raw}</span>
                <span className="tt-result-label">raw</span>
              </div>
              <div>
                <span className="tt-result-value">{stats.time}s</span>
                <span className="tt-result-label">time</span>
              </div>
            </div>
            <button className="tt-again" onClick={reset}>
              ↻ try again
            </button>
            <p className="modal-hint">
              <kbd>↵</kbd> restart · <kbd>esc</kbd> close
            </p>
          </div>
        ) : (
          <>
            <div className="tt-stats">
              <span>
                <b>{stats.wpm}</b> wpm
              </span>
              <span>
                <b>{stats.acc}</b>% acc
              </span>
              <span>
                <b>{stats.time}</b>s time
              </span>
            </div>

            <div className={`tt-words${started ? ' is-typing' : ''}`}>
              {words.map((word, i) => {
                const value = typed[i] ?? '';
                const done = i < wi;
                const activeWord = i === wi;
                return (
                  <span
                    key={`${word}-${i}`}
                    className={`tt-word${activeWord ? ' active' : ''}${
                      done && value !== word ? ' wrong' : ''
                    }`}
                  >
                    {word.split('').map((ch, c) => {
                      let cls = 'tt-char';
                      if (c < value.length) cls += value[c] === ch ? ' ok' : ' bad';
                      if (activeWord && c === value.length) cls += ' caret';
                      return (
                        <span className={cls} key={c}>
                          {ch}
                        </span>
                      );
                    })}
                    {/* Overflow: characters typed past the end of the word. */}
                    {value.length > word.length && (
                      <span className="tt-char bad extra">{value.slice(word.length)}</span>
                    )}
                  </span>
                );
              })}
            </div>

            <div className="tt-keyboard">
              {KB_ROWS.map((row) => (
                <div className="tt-krow" key={row}>
                  {row.split('').map((ch) => (
                    <span
                      key={ch}
                      className={`tt-key${flash === ch ? ' active' : ''}${
                        nextKey === ch ? ' next' : ''
                      }`}
                    >
                      {ch}
                    </span>
                  ))}
                </div>
              ))}
              <div className="tt-krow">
                <span
                  className={`tt-key space${flash === ' ' ? ' active' : ''}${
                    nextKey === ' ' ? ' next' : ''
                  }`}
                >
                  space
                </span>
              </div>
            </div>

            <p className="modal-hint">
              <kbd>tab</kbd> restart · <kbd>esc</kbd> close
            </p>
          </>
        )}

        {confirming && (
          <div className="tt-confirm">
            <p>restart test?</p>
            <p className="modal-hint">
              <kbd>↵</kbd> confirm · <kbd>esc</kbd> cancel
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

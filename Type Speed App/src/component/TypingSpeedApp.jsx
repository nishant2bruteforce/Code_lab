
import { useEffect, useRef, useState } from 'react';
import '../style/TypingSpeedApp.css';
import StatCard from './StatCard';
const SAMPLE_TEXTS = {
     Easy: [
          'the quick brown fox jumps over the lazy dog',
          'hello world this is a typing test',
          'practice makes perfect'
     ],
     Normal: [
          'typing speed tests are a great way to measure your progress and accuracy',
          'a fast typist balances speed with precision by focusing on accuracy',
          'consistency and daily practice yield the best improvements in typing skill'
     ],
     Hard: [
          'Punctuation, capitalization, and numbers (123) make tests trickier!',
          'Edge-cases: tabs, multiple spaces, hyphen-words and English contractions aren\'t kind.',
          'Accuracy matters — one mistake can reduce your WPM and overall score.'
     ]
};

const DEFAULT_MODE = { type: 'time', duration: 60 };

function formatTime(s) {
     const mm = Math.floor(s / 60).toString().padStart(2, '0');
     const ss = Math.floor(s % 60).toString().padStart(2, '0');
     return `${mm}:${ss}`;
}

export default function TypingSpeedApp() {
     const [difficulty, setDifficulty] = useState('Normal');
     const [mode, setMode] = useState(DEFAULT_MODE);
     const [texts, setTexts] = useState(() => SAMPLE_TEXTS['Normal']);
     const [index, setIndex] = useState(0);
     const [target, setTarget] = useState(texts[0]);

     const [typed, setTyped] = useState('');
     const [started, setStarted] = useState(false);
     const [finished, setFinished] = useState(false);
     const [timeLeft, setTimeLeft] = useState(mode.type === 'time' ? mode.duration : 0);
     const [elapsed, setElapsed] = useState(0);
     const [keystrokes, setKeystrokes] = useState(0);
     const [correctChars, setCorrectChars] = useState(0);
     const [incorrectChars, setIncorrectChars] = useState(0);
     const [topScores, setTopScores] = useState(() => loadScores());

     const inputRef = useRef(null);
     const timerRef = useRef(null);

     useEffect(() => {
          setTexts(SAMPLE_TEXTS[difficulty] || SAMPLE_TEXTS['Normal']);
          setIndex(0);
     }, [difficulty]);

     useEffect(() => {
          setTarget(texts[index] || '');
          resetProgress(true);
     }, [texts, index]);

     useEffect(() => {
          if (mode.type === 'time') {
               setTimeLeft(mode.duration);
          } else {
               setTimeLeft(0);
          }
          resetProgress(true);
     }, [mode]);

     useEffect(() => {
          if (started && mode.type === 'time' && !finished) {
               timerRef.current = setInterval(() => {
                    setTimeLeft(prev => {
                         if (prev <= 1) {
                              clearInterval(timerRef.current);
                              finishTest();
                              return 0;
                         }
                         return prev - 1;
                    });
                    setElapsed(e => e + 1);
               }, 1000);
               return () => clearInterval(timerRef.current);
          }
          return () => { };
     }, [started, mode.type, finished]);

     function loadScores() {
          try {
               const raw = localStorage.getItem('typing_top_scores');
               return raw ? JSON.parse(raw) : [];
          } catch (e) {
               return [];
          }
     }

     function saveScore(score) {
          const all = loadScores();
          all.push(score);
          all.sort((a, b) => b.wpm - a.wpm);
          while (all.length > 20) all.pop();
          localStorage.setItem('typing_top_scores', JSON.stringify(all));
          setTopScores(all);
     }

     function resetProgress(hard = false) {
          clearInterval(timerRef.current);
          setStarted(false);
          setFinished(false);
          setTyped('');
          setKeystrokes(0);
          setCorrectChars(0);
          setIncorrectChars(0);
          setElapsed(0);
          if (mode.type === 'time' && hard) setTimeLeft(mode.duration);
     }

     function handleKey(e) {
          if (inputRef.current) inputRef.current.focus();

          const key = e.key;
          if (key.length > 1 && key !== 'Backspace' && key !== 'Enter' && key !== 'Tab') return;

          if (!started && key !== 'Shift' && key !== 'Alt' && key !== 'Meta') {
               setStarted(true);
               if (mode.type === 'time' && timeLeft === 0) setTimeLeft(mode.duration);
          }

          if (finished) return;

          if (key === 'Backspace') {
               setTyped(prev => prev.slice(0, -1));
               setKeystrokes(s => s + 1);
               setCorrectChars(c => Math.max(0, c - 1));
               return;
          }

          let character = key;
          if (key === 'Enter') character = '\n';
          if (key === 'Tab') character = '\t';

          setTyped(prev => {
               const next = prev + character;
               evaluateProgress(next);
               return next;
          });
          setKeystrokes(s => s + 1);

          if (mode.type === 'words') {
               const wordCount = typed.trim().split(/\s+/).filter(Boolean).length + (character.trim() ? 0 : 0);
          }
     }

     function evaluateProgress(currentTyped) {
          let correct = 0;
          let incorrect = 0;
          for (let i = 0; i < currentTyped.length; i++) {
               if (i >= target.length) {
                    incorrect++;
                    continue;
               }
               if (currentTyped[i] === target[i]) correct++;
               else incorrect++;
          }
          setCorrectChars(correct);
          setIncorrectChars(incorrect);

          if (mode.type === 'words') {
               const targetWords = target.trim().split(/\s+/).filter(Boolean).length;
               const typedWords = currentTyped.trim().split(/\s+/).filter(Boolean).length;
               if (typedWords >= (mode.duration || 25)) {
                    finishTest();
               }
          }

          if (mode.type === 'time' && started && currentTyped.length >= target.length) {
               finishTest();
          }
     }

     function finishTest() {
          if (finished) return;
          setFinished(true);
          setStarted(false);
          clearInterval(timerRef.current);
          const minutes = Math.max(1 / 60, elapsed / 60 || (mode.type === 'time' ? (mode.duration - timeLeft) / 60 : 0.0001));
          const wpm = Math.round((correctChars / 5) / minutes);
          const accuracy = Math.round((correctChars / Math.max(1, keystrokes)) * 100);
          const score = {
               date: new Date().toISOString(),
               mode: mode.type,
               duration: mode.duration || 0,
               difficulty,
               wpm: isFinite(wpm) ? wpm : 0,
               accuracy: isFinite(accuracy) ? accuracy : 0,
               keystrokes,
               correctChars,
               incorrectChars
          };
          saveScore(score);
     }

     function handleInputChange(e) {
          const value = e.target.value;
          setTyped(value);
          evaluateProgress(value);
          setKeystrokes(k => k + 1);
     }

     function nextText() {
          setIndex(i => (i + 1) % texts.length);
     }

     function shuffleTexts() {
          setTexts(prev => {
               const copy = [...prev].sort(() => Math.random() - 0.5);
               return copy;
          });
          setIndex(0);
     }

     function exportScores() {
          const all = loadScores();
          if (!all.length) return;
          const csv = [Object.keys(all[0]).join(','), ...all.map(r => Object.values(r).map(v => '"' + String(v).replace(/"/g, '""') + '"').join(','))].join('\n');
          const blob = new Blob([csv], { type: 'text/csv' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'typing_scores.csv';
          document.body.appendChild(a);
          a.click();
          a.remove();
          URL.revokeObjectURL(url);
     }

     const minutesUsed = mode.type === 'time' ? (mode.duration - timeLeft) / 60 : elapsed / 60;
     const wpm = Math.round((correctChars / 5) / Math.max(1 / 60, minutesUsed || (finished ? 1 / 60 : 0)));
     const accuracy = Math.round((correctChars / Math.max(1, keystrokes)) * 100);
     const progress = Math.min(100, Math.floor((typed.length / Math.max(1, target.length)) * 100));

     return (
          <div className="typing-app-container">
               <div className="typing-app-card">
                    <header className="typing-header">
                         <h1>Typing Speed App</h1>
                         <div className="difficulty">Difficulty: <strong>{difficulty}</strong></div>
                    </header>

                    <div className="typing-grid">
                         <section className="typing-main">
                              <div className="mode-row">
                                   <div className="mode-select">
                                        <label>Mode:</label>
                                        <select value={mode.type} onChange={e => setMode(prev => ({ ...prev, type: e.target.value }))}>
                                             <option value="time">Time</option>
                                             <option value="words">Words</option>
                                             <option value="practice">Practice</option>
                                        </select>

                                        {mode.type === 'time' && (
                                             <select value={mode.duration} onChange={e => setMode(prev => ({ ...prev, duration: Number(e.target.value) }))}>
                                                  <option value={15}>15s</option>
                                                  <option value={30}>30s</option>
                                                  <option value={60}>60s</option>
                                                  <option value={120}>120s</option>
                                             </select>
                                        )}

                                        {mode.type === 'words' && (
                                             <select value={mode.duration} onChange={e => setMode(prev => ({ ...prev, duration: Number(e.target.value) }))}>
                                                  <option value={10}>10 words</option>
                                                  <option value={25}>25 words</option>
                                                  <option value={50}>50 words</option>
                                             </select>
                                        )}
                                   </div>

                                   <div className="mode-actions">
                                        <label>Difficulty:</label>
                                        <select value={difficulty} onChange={e => setDifficulty(e.target.value)}>
                                             <option>Easy</option>
                                             <option>Normal</option>
                                             <option>Hard</option>
                                        </select>
                                        <button onClick={() => shuffleTexts()}>Shuffle</button>
                                        <button className="btn-blue" onClick={() => { resetProgress(true); if (inputRef.current) inputRef.current.focus(); }}>Reset</button>
                                   </div>
                              </div>

                              <div className="typing-box">
                                   <div className="typing-info">
                                        <div>Text {index + 1} of {texts.length}</div>
                                        <div>Progress: {progress}%</div>
                                   </div>

                                   <div className="typing-text">
                                        <div className="text-display">
                                             {target.split('').map((ch, i) => {
                                                  let cls = '';
                                                  if (i < typed.length) cls = typed[i] === ch ? 'correct' : 'incorrect';
                                                  else if (i === typed.length && started && !finished) cls = 'underline';
                                                  return (<span key={i} className={cls}>{ch}</span>);
                                             })}
                                        </div>
                                   </div>

                                   <div className="typing-input-row">
                                        <input
                                             ref={inputRef}
                                             value={typed}
                                             onKeyDown={handleKey}
                                             onChange={handleInputChange}
                                             placeholder="Start typing here..."
                                             className="typing-input"
                                        />

                                        <div className="timer">
                                             <div>Time</div>
                                             <div className="time-value">
                                                  {mode.type === 'time'
                                                       ? formatTime(timeLeft)
                                                       : (mode.type === 'words'
                                                            ? `${typed.trim().split(/\s+/).filter(Boolean).length}/${mode.duration} words`
                                                            : formatTime(elapsed))}
                                             </div>
                                        </div>
                                   </div>

                                   <div className="button-row">
                                        <button
                                             className={started ? 'btn-yellow' : 'btn-green'}
                                             onClick={() => {
                                                  if (finished) { resetProgress(true); }
                                                  else setStarted(s => !s);
                                                  if (inputRef.current) inputRef.current.focus();
                                             }}>
                                             {finished ? 'Finished' : (started ? 'Pause' : 'Start')}
                                        </button>
                                        <button className="btn-blue" onClick={() => finishTest()}>Finish</button>
                                        <button onClick={() => nextText()}>Next Text</button>
                                        <button className="btn-purple" onClick={() => exportScores()}>Export Scores</button>
                                   </div>

                                   <div className="stats-row">
                                        <StatCard label="WPM" value={finished ? (wpm || 0) : (started ? wpm : 0)} />
                                        <StatCard label="Accuracy" value={`${accuracy || 0}%`} />
                                        <StatCard label="Keystrokes" value={keystrokes} />
                                        <StatCard label="Correct" value={correctChars} />
                                        <StatCard label="Incorrect" value={incorrectChars} />
                                   </div>
                              </div>
                         </section>

                         <aside className="sidebar">
                              <div className="sidebar-card">
                                   <h3>Top Scores</h3>
                                   <p>Saved highest scores (Local Storage)</p>
                                   <div className="scores-list">
                                        {topScores.length ? topScores.map((s, i) => (
                                             <div key={i} className="score-item">
                                                  <div>{s.wpm} WPM</div>
                                                  <div>{s.accuracy}% • {new Date(s.date).toLocaleString()}</div>
                                             </div>
                                        )) : <div>No scores yet — take a test!</div>}
                                   </div>
                              </div>

                              <div className="sidebar-card">
                                   <h3>Settings</h3>
                                   <label>Custom text</label>
                                   <textarea placeholder="Paste your own text (optional)" onBlur={e => {
                                        const v = e.target.value.trim();
                                        if (v) { setTexts([v]); setIndex(0); }
                                   }} />
                                   <label>Quick choose text</label>
                                   <div className="quick-buttons">
                                        <button onClick={() => { setTexts(SAMPLE_TEXTS[difficulty]); setIndex(0); }}>Default</button>
                                        <button onClick={() => { setTexts(prev => [...prev, 'Custom quick text added to list']); }}>Add</button>
                                   </div>
                              </div>

                              <div className="sidebar-card">
                                   <h3>Help</h3>
                                   <ul>
                                        <li>Start typing to begin the test.</li>
                                        <li>WPM uses correct characters / 5 divided by minutes used.</li>
                                        <li>Scores persist locally in your browser.</li>
                                        <li>Use Export to download CSV of saved scores.</li>
                                   </ul>
                              </div>
                         </aside>
                    </div>


               </div>
          </div>

     );
}



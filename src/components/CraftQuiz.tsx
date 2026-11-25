import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, RotateCcw, XCircle } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../data/tutorialsAndQuiz';

export const CraftQuiz: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = QUIZ_QUESTIONS[currentIdx];
  const selectedOption = answers[currentQuestion.id];
  const hasAnsweredCurrent = selectedOption !== undefined;

  const totalScore = QUIZ_QUESTIONS.reduce((acc, q) => {
    return acc + (answers[q.id] === q.correctIndex ? 1 : 0);
  }, 0);

  const handleSelectOption = (optionIdx: number) => {
    if (hasAnsweredCurrent) return;
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: optionIdx }));
  };

  const handleNext = () => {
    if (currentIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleRestart = () => {
    setAnswers({});
    setCurrentIdx(0);
    setShowResults(false);
  };

  if (showResults) {
    const pct = Math.round((totalScore / QUIZ_QUESTIONS.length) * 100);
    const tierLabel =
      pct >= 85
        ? 'Janur Master!'
        : pct >= 60
        ? 'Great Job, Craft Explorer!'
        : 'Good Try — Keep Exploring!';

    return (
      <div className="bg-[#EDF4EC] border border-[#C3D6C1] rounded-xl p-6 sm:p-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center pb-6 border-b border-[#C3D6C1]">
            <p className="text-xs font-mono uppercase tracking-widest text-[#3A7D44] mb-1">
              Quiz Complete
            </p>
            <h3 className="font-serif text-3xl sm:text-4xl font-semibold text-[#15221B]">
              {tierLabel}
            </h3>
            <p className="mt-3 text-2xl font-mono font-medium tabular-nums text-[#17422B]">
              {totalScore} / {QUIZ_QUESTIONS.length} Correct ({pct}%)
            </p>
            <p className="mt-2 text-sm text-[#455B4E] max-w-xl mx-auto">
              Check your answers below or restart the quiz to try for a higher score!
            </p>
            <button
              type="button"
              onClick={handleRestart}
              className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-[#17422B] rounded-lg hover:bg-[#10311F] transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Restart Quiz</span>
            </button>
          </div>

          <div className="mt-6 space-y-3">
            {QUIZ_QUESTIONS.map((q, idx) => {
              const userPick = answers[q.id];
              const isCorrect = userPick === q.correctIndex;
              return (
                <div
                  key={q.id}
                  className="bg-[#F7FAF6] border border-[#C3D6C1] rounded-lg p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm font-semibold text-[#15221B]">
                      <span className="font-mono text-[#3A7D44] mr-2 tabular-nums">
                        0{idx + 1}.
                      </span>
                      {q.question}
                    </p>
                    <span
                      className={`inline-flex items-center gap-1 text-xs font-medium shrink-0 ${
                        isCorrect ? 'text-[#17422B]' : 'text-[#9B3B2B]'
                      }`}
                    >
                      {isCorrect ? (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Correct</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4" />
                          <span>Review</span>
                        </>
                      )}
                    </span>
                  </div>
                  <p className="text-xs text-[#455B4E] mt-2 leading-relaxed">
                    <strong className="text-[#15221B]">Answer:</strong>{' '}
                    {q.options[q.correctIndex]} — {q.explanation}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#EDF4EC] border border-[#C3D6C1] rounded-xl p-6 sm:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#C3D6C1]">
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-[#3A7D44]">
              Craft Knowledge Quiz · {currentQuestion.topic}
            </p>
            <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#15221B] mt-0.5">
              How Much Do You Know About Janur?
            </h3>
          </div>
          <div className="text-xs font-mono tabular-nums text-[#17422B] bg-[#F7FAF6] border border-[#C3D6C1] px-3 py-1.5 rounded-lg">
            Question {currentIdx + 1} / {QUIZ_QUESTIONS.length}
          </div>
        </div>

        <div className="w-full h-1.5 bg-[#C3D6C1] rounded-full overflow-hidden mt-4">
          <div
            className="h-full bg-[#3A7D44] transition-all duration-300"
            style={{
              width: `${((currentIdx + (hasAnsweredCurrent ? 1 : 0)) / QUIZ_QUESTIONS.length) * 100}%`,
            }}
          />
        </div>

        <div className="mt-6">
          <p className="font-serif text-xl sm:text-2xl font-medium text-[#15221B] leading-snug">
            {currentQuestion.question}
          </p>

          <div className="mt-5 space-y-2.5">
            {currentQuestion.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrectOption = idx === currentQuestion.correctIndex;

              let buttonStyle =
                'bg-[#F7FAF6] border-[#C3D6C1] text-[#15221B] hover:border-[#3A7D44] hover:bg-[#DCEAD9]/50';
              if (hasAnsweredCurrent) {
                if (isCorrectOption) {
                  buttonStyle = 'bg-[#DCEAD9] border-[#17422B] text-[#15221B] font-medium';
                } else if (isSelected && !isCorrectOption) {
                  buttonStyle = 'bg-[#F8EAE6] border-[#9B3B2B] text-[#15221B]';
                } else {
                  buttonStyle = 'bg-[#F7FAF6]/70 border-[#C3D6C1] text-[#455B4E]';
                }
              }

              return (
                <button
                  key={idx}
                  type="button"
                  disabled={hasAnsweredCurrent}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full text-left px-4 py-3.5 rounded-lg border transition-colors flex items-center justify-between gap-3 cursor-pointer disabled:cursor-default min-h-[48px] ${buttonStyle}`}
                >
                  <span className="text-sm leading-snug">
                    <span className="font-mono text-xs text-[#455B4E] mr-2.5">
                      {String.fromCharCode(65 + idx)}.
                    </span>
                    {opt}
                  </span>
                  {hasAnsweredCurrent && isCorrectOption && (
                    <CheckCircle2 className="w-4 h-4 text-[#17422B] shrink-0" />
                  )}
                  {hasAnsweredCurrent && isSelected && !isCorrectOption && (
                    <XCircle className="w-4 h-4 text-[#9B3B2B] shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {hasAnsweredCurrent && (
            <div className="mt-5 p-4 rounded-lg bg-[#F7FAF6] border border-[#C3D6C1]">
              <p className="text-xs font-mono uppercase tracking-wider text-[#3A7D44] mb-1">
                {selectedOption === currentQuestion.correctIndex
                  ? 'Nice Job! Correct Answer'
                  : 'Good to Know'}
              </p>
              <p className="text-sm text-[#15221B] leading-relaxed">
                {currentQuestion.explanation}
              </p>
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-[#17422B] rounded-lg hover:bg-[#10311F] transition-colors cursor-pointer"
                >
                  <span>
                    {currentIdx < QUIZ_QUESTIONS.length - 1
                      ? 'Next Question'
                      : 'See Final Score'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

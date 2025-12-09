'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { fishData, generateOptions, shuffleArray, type Fish } from '@/lib/fish-data';

interface QuizQuestion {
  fish: Fish;
  options: number[];
}

interface Answer {
  fishId: string;
  selectedSize: number;
  correctSize: number;
  isCorrect: boolean;
}

const QUIZ_TIME_SECONDS = 15 * 60; // 15 minut v sekundách
const MAX_ERRORS = 3; // Maximální počet chyb pro úspěch

export default function FishQuiz() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(QUIZ_TIME_SECONDS);
  const [quizFinished, setQuizFinished] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  // Inicializace kvízu
  const startQuiz = () => {
    // Zamíchej ryby
    const shuffledFish = shuffleArray(fishData);

    // Vytvoř otázky s možnostmi
    const quizQuestions: QuizQuestion[] = shuffledFish.map(fish => ({
      fish,
      options: shuffleArray(generateOptions(fish.minSize))
    }));

    setQuestions(quizQuestions);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setTimeRemaining(QUIZ_TIME_SECONDS);
    setQuizFinished(false);
    setQuizStarted(true);
  };

  // Časovač
  useEffect(() => {
    if (!quizStarted || quizFinished) return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          finishQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quizStarted, quizFinished]);

  // Zpracování odpovědi
  const handleAnswer = (selectedSize: number) => {
    // Pokud už je něco vybráno, ignoruj další kliknutí
    if (selectedAnswer !== null) return;

    setSelectedAnswer(selectedSize);

    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedSize === currentQuestion.fish.minSize;

    const answer: Answer = {
      fishId: currentQuestion.fish.id,
      selectedSize,
      correctSize: currentQuestion.fish.minSize,
      isCorrect
    };

    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    // Po krátkém delay přejdi na další otázku nebo ukonči
    setTimeout(() => {
      setSelectedAnswer(null); // Resetuj výběr

      if (currentQuestionIndex === questions.length - 1) {
        finishQuiz();
      } else {
        setCurrentQuestionIndex(prev => prev + 1);
      }
    }, 300);
  };

  // Ukončení kvízu
  const finishQuiz = () => {
    setQuizFinished(true);
  };

  // Výpočet výsledku
  const getResults = () => {
    const wrongAnswers = answers.filter(a => !a.isCorrect).length;
    const correctAnswers = answers.filter(a => a.isCorrect).length;
    const unanswered = questions.length - answers.length;
    const passed = wrongAnswers <= MAX_ERRORS;

    return {
      wrongAnswers,
      correctAnswers,
      unanswered,
      passed,
      totalQuestions: questions.length
    };
  };

  // Formátování času
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Obrazovka před startem
  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full">
          <h1 className="text-3xl font-bold text-blue-900 mb-6 text-center">
            Test: Minimální lovné míry ryb
          </h1>
          <div className="space-y-4 text-gray-700 mb-8">
            <p className="text-lg">
              Vítej v testu o minimálních lovných mírách vybraných druhů ryb v mimopstruhovém rybářském revíru!
            </p>
            <div className="bg-blue-50 p-4 rounded-lg space-y-2">
              <h2 className="font-bold text-blue-900 mb-2">Pravidla testu:</h2>
              <ul className="list-disc list-inside space-y-1">
                <li>Test obsahuje {fishData.length} otázek</li>
                <li>U každé ryby vyber správnou minimální lovnou míru ze 3 možností</li>
                <li>Otázky se zobrazují jedna po druhé</li>
                <li>Časový limit je 15 minut</li>
                <li>K úspěchu potřebuješ mít maximálně 3 chyby</li>
              </ul>
            </div>
          </div>
          <button
            onClick={startQuiz}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg text-xl transition-colors"
          >
            Začít test
          </button>
        </div>
      </div>
    );
  }

  // Obrazovka výsledků
  if (quizFinished) {
    const results = getResults();

    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full">
          <h1 className="text-3xl font-bold text-center mb-8">
            {results.passed ? (
              <span className="text-green-600">Gratulujeme! Test jsi úspěšně splnil! 🎉</span>
            ) : (
              <span className="text-red-600">Bohužel jsi test nesplnil</span>
            )}
          </h1>

          <div className="space-y-4 mb-8">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="font-bold text-xl mb-4">Výsledky:</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-green-100 rounded">
                  <div className="text-3xl font-bold text-green-600">{results.correctAnswers}</div>
                  <div className="text-sm text-gray-600">Správně</div>
                </div>
                <div className="text-center p-3 bg-red-100 rounded">
                  <div className="text-3xl font-bold text-red-600">{results.wrongAnswers}</div>
                  <div className="text-sm text-gray-600">Chyb</div>
                </div>
              </div>
              {results.unanswered > 0 && (
                <div className="mt-4 text-center p-3 bg-yellow-100 rounded">
                  <div className="text-lg font-bold text-yellow-600">{results.unanswered}</div>
                  <div className="text-sm text-gray-600">Nezodpovězeno</div>
                </div>
              )}
            </div>

            {/* Detail špatných odpovědí */}
            {results.wrongAnswers > 0 && (
              <div className="bg-red-50 p-4 rounded-lg">
                <h3 className="font-bold text-red-900 mb-3">Chybné odpovědi:</h3>
                <div className="space-y-2">
                  {answers.filter(a => !a.isCorrect).map((answer, idx) => {
                    const fish = fishData.find(f => f.id === answer.fishId);
                    return (
                      <div key={idx} className="bg-white p-3 rounded border border-red-200">
                        <div className="font-semibold">{fish?.name}</div>
                        <div className="text-sm text-gray-600">
                          <span className="text-red-600">Tvoje odpověď: {answer.selectedSize} cm</span>
                          {' | '}
                          <span className="text-green-600">Správně: {answer.correctSize} cm</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-3">
            <button
              onClick={() => {
                setQuizStarted(false);
                setQuizFinished(false);
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg text-xl transition-colors"
            >
              Zkusit znovu
            </button>
            <Link
              href="/"
              className="block w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-4 px-6 rounded-lg text-xl transition-colors text-center"
            >
              Ukončit test
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Obrazovka s otázkou
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-4">
      {/* Hlavička s časovačem a progressem */}
      <div className="max-w-2xl mx-auto mb-6">
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">
              Otázka {currentQuestionIndex + 1} z {questions.length}
            </span>
            <span className={`font-mono text-xl font-bold ${
              timeRemaining < 300 ? 'text-red-600' : 'text-blue-600'
            }`}>
              {formatTime(timeRemaining)}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Otázka */}
      <div key={currentQuestionIndex} className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-4 sm:p-6">
          {/* Obrázek ryby */}
          <div className="mb-3 flex justify-center bg-gray-50 rounded-lg p-3">
            <div className="w-full max-w-md aspect-[4/1] flex items-center justify-center relative">
              <img
                src={`/images/fish/${currentQuestion.fish.id}.png`}
                alt={currentQuestion.fish.name}
                className="w-full h-full object-contain"
                onError={(e) => {
                  // Fallback na emoji pokud obrázek neexistuje
                  e.currentTarget.style.display = 'none';
                  if (e.currentTarget.nextElementSibling) {
                    (e.currentTarget.nextElementSibling as HTMLElement).style.display = 'block';
                  }
                }}
              />
              <div className="text-5xl hidden">🐟</div>
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-blue-900 mb-1 text-center">
            {currentQuestion.fish.name}
          </h2>
          <p className="text-sm text-gray-600 italic mb-3 text-center">
            ({currentQuestion.fish.scientificName})
          </p>

          <p className="text-sm sm:text-base mb-4 text-gray-600 text-center">
            Jaká je minimální lovná míra této ryby v mimopstruhovém rybářském revíru?
          </p>

          {/* Možnosti */}
          <div className="space-y-3">
            {currentQuestion.options.map((size, index) => {
              const isSelected = selectedAnswer === size;
              const isDisabled = selectedAnswer !== null;
              return (
                <button
                  key={`${currentQuestionIndex}-${size}`}
                  type="button"
                  onClick={(e) => {
                    e.currentTarget.blur();
                    handleAnswer(size);
                  }}
                  onTouchEnd={(e) => {
                    e.currentTarget.blur();
                  }}
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                  className={`w-full border-2 rounded-lg p-4 sm:p-5 text-center transition-all touch-manipulation select-none ${
                    isSelected
                      ? 'bg-blue-200 border-blue-600 scale-105'
                      : 'bg-blue-50 border-blue-300 active:bg-blue-100 active:border-blue-500'
                  } ${isDisabled ? 'opacity-50 pointer-events-none' : ''}`}
                >
                  <span className="text-xl sm:text-2xl font-bold text-blue-900">
                    {size} cm
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

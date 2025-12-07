'use client';

import { useState, useEffect } from 'react';
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

const QUIZ_TIME_SECONDS = 25 * 60; // 25 minut v sekundách
const MAX_ERRORS = 3; // Maximální počet chyb pro úspěch

export default function FishQuiz() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(QUIZ_TIME_SECONDS);
  const [quizFinished, setQuizFinished] = useState(false);

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

    // Pokud je to poslední otázka, ukonči kvíz
    if (currentQuestionIndex === questions.length - 1) {
      finishQuiz();
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
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
                <li>Časový limit je 25 minut</li>
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

          <button
            onClick={() => {
              setQuizStarted(false);
              setQuizFinished(false);
            }}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg text-xl transition-colors"
          >
            Zkusit znovu
          </button>
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
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-2">
            {currentQuestion.fish.name}
          </h2>
          <p className="text-gray-600 italic mb-6">
            ({currentQuestion.fish.scientificName})
          </p>

          <p className="text-xl mb-8 text-gray-700">
            Jaká je minimální lovná míra této ryby v mimopstruhovém rybářském revíru?
          </p>

          {/* Možnosti */}
          <div className="space-y-4">
            {currentQuestion.options.map((size, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(size)}
                className="w-full bg-blue-50 hover:bg-blue-100 border-2 border-blue-300 hover:border-blue-500 rounded-lg p-6 text-left transition-all transform hover:scale-105"
              >
                <span className="text-2xl font-bold text-blue-900">
                  {size} cm
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

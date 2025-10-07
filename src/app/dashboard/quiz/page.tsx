'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import data from '@../../../lib/data.json';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const { quizQuestions } = data;
type Question = typeof quizQuestions[0];


const shuffleArray = (array: Question[]) => array.sort(() => Math.random() - 0.5);

const TIME_LIMIT = 15;

export default function QuizPage() {
  const [sessionQuestions, setSessionQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startNewQuiz = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    const randomQuestions = shuffleArray([...quizQuestions]).slice(0, 5);
    setSessionQuestions(randomQuestions);
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setTimeLeft(TIME_LIMIT);
  }, []);

  useEffect(() => {
    startNewQuiz();
  }, [startNewQuiz]);

  const handleAnswerClick = useCallback((option: string) => {
    if (selectedAnswer) return;
    setSelectedAnswer(option);
    if (sessionQuestions[currentQuestionIndex] && option === sessionQuestions[currentQuestionIndex].correctAnswer) {
      setScore((prevScore) => prevScore + 1);
    }
  }, [selectedAnswer, currentQuestionIndex, sessionQuestions]);

  useEffect(() => {
    if (selectedAnswer || showResult) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [currentQuestionIndex, selectedAnswer, showResult]);
  
  
  useEffect(() => {
    if (timeLeft === 0 && !selectedAnswer) {
      handleAnswerClick("");
    }
  }, [timeLeft, selectedAnswer, handleAnswerClick]);

  if (sessionQuestions.length === 0) return <div>Loading Quiz...</div>;

  const currentQuestion = sessionQuestions[currentQuestionIndex];
  const progressValue = ((currentQuestionIndex + 1) / sessionQuestions.length) * 100;

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setTimeLeft(TIME_LIMIT);
    if (currentQuestionIndex < sessionQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResult(true);
    }
  };

  if (showResult) {
    return (
      <Card className="bg-slate-800 border-slate-700 text-white">
        <CardHeader><CardTitle className="text-3xl">Quiz Completed!</CardTitle></CardHeader>
        <CardContent className="text-center">
          <p className="text-5xl font-bold my-4">{score} / {sessionQuestions.length}</p>
          <Button onClick={startNewQuiz}>Play Again</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-slate-800 border-slate-700 text-white">
      <CardHeader>
        <Progress value={progressValue} className="mb-4 bg-slate-700" />
        <CardTitle className="text-2xl">
          Time Left: <span className={timeLeft <= 5 ? 'text-red-500 animate-pulse' : ''}>{timeLeft}s</span>
        </CardTitle>
        <CardDescription>Question {currentQuestionIndex + 1} of {sessionQuestions.length}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-xl font-semibold mb-6">{currentQuestion.question}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentQuestion.options.map((option) => (
            <Button
              key={option}
              variant="outline"
              className={`p-6 text-md justify-start text-left h-auto transition-colors duration-200 ${
                selectedAnswer
                  ? option === currentQuestion.correctAnswer
                    ? 'bg-green-600 border-green-500 text-white hover:bg-green-600'
                    : option === selectedAnswer
                    ? 'bg-red-600 border-red-500 text-white hover:bg-red-600'
                    : 'bg-slate-800 border-slate-700 text-slate-400'
                  : 'bg-slate-700 border-slate-600 text-slate-100 hover:bg-slate-600'
              }`}
              onClick={() => handleAnswerClick(option)}
              disabled={!!selectedAnswer}
            >
              {option}
            </Button>
          ))}
        </div>
        {selectedAnswer && (
          <div className="mt-6 text-right">
            <Button onClick={handleNextQuestion}>
              {currentQuestionIndex < sessionQuestions.length - 1 ? 'Next Question' : 'Show Results'}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
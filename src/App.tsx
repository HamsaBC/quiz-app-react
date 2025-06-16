import React,{ useState } from 'react'
import './App.css'
import StartScreen from './components/StartScreen';
import { useSelector } from 'react-redux';
import type { RootState } from './app/store';
import QuestionScreen from './components/QuestionScreen';
import ResultScreen from './components/ResultScreen';

function App() {
  const [started, setStarted] = useState(false);
  const quizEnded = useSelector((state: RootState) => state.quiz.quizEnded);

  const handleStart = () => setStarted(true);
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {!started ? (
        <StartScreen onStart = {handleStart} />
      ) : quizEnded? (
          <ResultScreen />
      ): (
        <QuestionScreen />
      )}   
    </div>
  );
}

export default App

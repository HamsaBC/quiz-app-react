import React,{ useState } from 'react'
import './App.css'
import StartScreen from './components/StartScreen';
import { useSelector } from 'react-redux';
import type { RootState } from './app/store';
import QuestionScreen from './components/QuestionScreen';
import ResultScreen from './components/ResultScreen';
import AddQuestionForm from './components/AddQuestionForm';



function App() {
  const [started, setStarted] = useState(false);
  const [showForm ,setShowForm] = useState(false);
  const quizEnded = useSelector((state: RootState) => state.quiz.quizEnded);    // Selects the 'quizEnded' state from the Redux store to check if the quiz is finished

  const handleStart = () => setStarted(true);
  const toggleForm = () => setShowForm((prev) => !prev);    // Function to toggle the visibility of the add question form

  
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {!started ? (
        <div className= "text-center">
        <StartScreen onStart = {handleStart} />
        <button
          onClick={toggleForm}
          className="mt-6 bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
          >
            {showForm? 'Close Form' : 'Add Question'}
          </button>
            {showForm && <AddQuestionForm onClose = {toggleForm} />}
          </div>
        
        
      ) : quizEnded? (
          <ResultScreen />
      ): (
        <QuestionScreen />
      )}   
    </div>
  );
}

export default App

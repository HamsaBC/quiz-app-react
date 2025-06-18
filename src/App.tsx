 import React,{ useState, useEffect } from 'react'
import './App.css'
import StartScreen from './components/StartScreen';
import { useSelector,useDispatch } from 'react-redux';
import type { RootState } from './app/store';
import QuestionScreen from './components/QuestionScreen';
import ResultScreen from './components/ResultScreen';
import { fetchQuestions } from './slices/quizSlice';
import type { Root } from 'react-dom/client';
import AddQuestionForm from './components/AddQuestionForm';



// function App() {
//   const [started, setStarted] = useState(false);
//   const [showForm ,setShowForm] = useState(false);
//   const quizEnded = useSelector((state: RootState) => state.quiz.quizEnded);    // Selects the 'quizEnded' state from the Redux store to check if the quiz is finished

//   const handleStart = () => setStarted(true);
//   const toggleForm = () => setShowForm((prev) => !prev);    // Function to toggle the visibility of the add question form

  
//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       {!started ? (
//         <div className= "text-center">
//         <StartScreen onStart = {handleStart} />
//         <button
//           onClick={toggleForm}
//           className="mt-6 bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
//           >
//             {showForm? 'Close Form' : 'Add Question'}
//           </button>
//             {showForm && <AddQuestionForm onClose = {toggleForm} />}
//           </div>
        
        
//       ) : quizEnded? (
//           <ResultScreen />
//       ): (
//         <QuestionScreen />
//       )}   
//     </div>
//   );
// }



const App: React.FC =() => {
const dispatch= useDispatch();
const quiz=useSelector((state: RootState) => state.quiz);
const[started,setStarted] = useState(false);
const [showForm,setShowForm] =useState(false);


const questions = useSelector((state: RootState) => state.quiz.questions);

//Fetch questions on first load
useEffect(() => {
   if (questions.length === 0) {
  dispatch(fetchQuestions()); 
    } // triggers saga
},[dispatch,questions]);

const handleStart=()=> setStarted(true);
const toggleForm=()=> setShowForm(prev => !prev);

 return (
    <div className="App">
      <h1 className="text-2xl font-bold">Quiz App</h1>
      {!started ? (
        <>
          <div className="flex gap-4 justify-center mb-4">
            <button
              onClick={handleStart}
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              ▶️ Start Quiz
            </button>
            <button
              onClick={toggleForm}
              className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700"
            >
              ➕ Add Question
            </button>
          </div>

          {showForm && <AddQuestionForm onClose={() => setShowForm(false)} />}
        </>
      ) : quiz.quizEnded ? (
        <ResultScreen />
      ) : (
        <QuestionScreen />
      )}
    </div>
  );
};

export default App;

import React from 'react' ;
import { useDispatch , useSelector }  from 'react-redux'
import type{ RootState } from '../app/store';
import { restartQuiz } from '../slices/quizSlice';

const ResultScreen: React.FC = () => {
    const dispatch = useDispatch();
    const { questions, userAnswers, score} = useSelector((state: RootState) => state.quiz);
    const  handleRestart = () => {
        dispatch(restartQuiz());
    };

    return(
        <div className="max-w-xl mx-auto mt-12 p-6 bg-white rounded shadow text-center">
            <h2 className="text-2xl  font-bold mb-4">🎊 Quiz Completed! </h2>
            <p className="text-lg mb-6"> Your Score: {score} / {questions.length}</p>

            <div className="text-left mb-6">
                {questions.map ((q, idx) => (
                    <div key = {idx} className="mb-3 border-b pb-2">
                        <p className="front-semibold"> {q.question}</p>
                        <p>
                            ✅ Correct Answer: <span className="text-green-600">{q.correctAnswer}</span>

                        </p>
                        <p>
                            Your Answer: { ' '}
                            <span className={userAnswers[idx] === q.correctAnswer ? 'text-green-600' : 'text-red-500'}>
                                {userAnswers[idx]}
                            </span>
                        </p>
                    </div>
                ))}
            </div>
            <button
                onClick = {handleRestart}
                className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
                >
                    Restart Quiz
                </button>
        </div>
    );
};
export default ResultScreen;
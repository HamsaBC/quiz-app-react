import React from 'react' ;
import { useDispatch , useSelector } from 'react-redux';
import type { RootState } from '../app/store';
import { answerQuestion } from '../slices/quizSlice';

const QuestionScreen : React.FC = () => {
    const dispatch = useDispatch();
    const quiz = useSelector((state: RootState) => state.quiz);
    const current = quiz.questions[quiz.currentIndex];

    const handleAnswer = (option: string) => {
        dispatch(answerQuestion(option));
    };
    return (
        <div className= "max-w-xl mx-auto mt-12 p-6 bg-White rounded shadow ">
            <h2 className="text-xl font-bold mb-4">
                Question {quiz.currentIndex + 1} of {quiz.questions.length}
            </h2>
            <p className="text-lg mb-6">{current.question}</p>

            <div className="grid gap-3">
                {current.options.map((opt, idx) => (
                    <button
                    key={idx}
                    onClick={() => handleAnswer(opt)}
                    className = "bg-blue-100 hover:bg-blue-200 text-blue-800 px-4 py-2 rounded text-left"
                    >
                        {opt}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default QuestionScreen;
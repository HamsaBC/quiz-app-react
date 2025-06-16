import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addQuestion } from '../slices/quizSlice';

type AddQuestionFormProps = {
  onClose: () => void;
};

const AddQuestionForm: React.FC <AddQuestionFormProps> = ({ onClose }) => {
    const dispatch = useDispatch();
    const [question, setQuestion] = useState('');
    const [options,setOptions] = useState(['','','','']);
    const [correctAnswer,setCorrectAnswer] = useState('');
    const  [showSuccess, setShowSuccess] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!question || options.some((opt) => !opt) || !correctAnswer) {
            alert ('Please fill all fields!');
            return;
        }

        if(!options.includes(correctAnswer)) {
            alert('Correct answer must match one of the options!');
            return;
        }

        dispatch(addQuestion({ question, options, correctAnswer}));
        setQuestion('');
        setOptions(['','','','']);
        setCorrectAnswer('');
        setShowSuccess(true);
    };

    useEffect (() => {
        if (showSuccess) {
            const timer = setTimeout (() => {
                setShowSuccess(false);
                onClose();
            }, 2000);
            return () => clearTimeout(timer);
           }
        }, [showSuccess, onClose]);
        

    return (
        <div className = "max-w-xl mx-auto mt-8 p-6 bg-white shadow rounded">
            <h2 className=" text-xl font-bold mb-4"> ➕ Add New Question</h2>

            {showSuccess && (
                <div className="mb-4 text-green-700 bg-green-100  border border-green-300 rounded p-3">
                ✅ Question added Successfully!
                </div>
            )}
            <form onSubmit={handleSubmit} className="grid gap-4">
                <input
                    className = "border p-2 rounded"
                    type="text"
                    placeholder="Question"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    />
                    {options.map((opt,idx) => (
                        <input
                          key = {idx}
                          className="border p-2 rounded"
                          type="text"
                          placeholder={`Option ${idx + 1}`}
                          value = {options[idx]}
                          onChange={(e) => {
                            const newOptions = [...options];
                            newOptions[idx] = e.target.value;
                            setOptions(newOptions);
                          }}
                          />

                    ))}
                    <input
                        className="border p-2 rounded"
                        type = "text"
                        placeholder="Correct Answer"
                        value = {correctAnswer}
                        onChange={(e) => setCorrectAnswer(e.target.value)}
                        />

                        {/* <div className="flex gap-2 justify-end">
                            <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                            >
                                Add
                            </button>
                    
                        </div> */}
                        <button
                          type= "submit"
                          className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
                        >
                            Add Question
                        </button>
                 </form>
            </div>
    );
};

export default AddQuestionForm;
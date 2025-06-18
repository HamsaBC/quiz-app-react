import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addQuestion } from '../slices/quizSlice';

import { useFieldArray, useForm } from 'react-hook-form';


type AddQuestionFormProps = {
  onClose: () => void;         // A function passed as a prop to close or hide the form 
};

type FormData = {
    question: string;
    options: { value: string} [];
    correctAnswer: string;

};

const AddQuestionForm: React.FC <AddQuestionFormProps> = ({ onClose }) => {
    const dispatch = useDispatch();
   // const [question, setQuestion] = useState('');
    //const [options,setOptions] = useState(['','','','']);
    //const [correctAnswer,setCorrectAnswer] = useState('');
    const  [showSuccess, setShowSuccess] = useState(false);

    const {
        register,           //register form inputs into React Hook Form
        handleSubmit,
        control,
        reset,

        formState: { errors } ,
    } = useForm<FormData>({
        defaultValues: {
            question: '',
            options:[{value: ''},{value: ''},{value:''},{value:''}],
            correctAnswer: '',
        },
    });
    
    const { fields } = useFieldArray({
        control,
        name: 'options',
    });

    const onSubmit = (data: FormData) => {
        const optionsArray = data.options.map(opt => opt.value);
        if(!optionsArray.includes(data.correctAnswer)) {
            alert('Correct answer must one of the options!');
            return;
        }

        dispatch(
            addQuestion({
                question:data.question,
                options: optionsArray,
                correctAnswer:data.correctAnswer,
            })
        );

        reset();
        setShowSuccess(true);
    };

    useEffect(() => {
        if (showSuccess) {
            const timer = setTimeout(() => {
                setShowSuccess(false);
                onClose();
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [showSuccess,onClose]);

    return (
        <div className = "max-w-xl mx-auto mt-8 p-6 bg-white shadow rounded">
            <h2 className=" text-xl font-bold mb-4"> ➕ Add New Question</h2>

            {showSuccess && (
                <div className="mb-4 text-green-700 bg-green-100  border border-green-300 rounded p-3">
                ✅ Question added Successfully!
                </div>
            )}
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
                <input
                    className = "border p-2 rounded"
                    type="text"
                    placeholder="Question"
                    {...register('question',{required:'Question is required'})}
                    />
                    {errors.question && <span className="text-red-500">{errors.question.message}</span>}
                    {fields.map((field,idx) => (            //idx:index inital value=0
                        <input
                          key = {field.id}
                          className="border p-2 rounded"
                          type="text"
                          placeholder={`Option ${idx + 1}`}
                          {...register(`options.${idx}.value`, {required:'Option is required'})}
                          />
                          
                    ))}
                    {errors.options && <span className="text-red-500">All options are required</span>}

                    <input
                        className="border p-2 rounded"
                        type = "text"
                        placeholder="Correct Answer"
                        {...register('correctAnswer',{required:'Correct answer is required'})}
                        />
                        {errors.correctAnswer && <span className="text-red-500">{errors.correctAnswer.message}</span>}

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
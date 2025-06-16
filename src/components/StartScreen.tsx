import React from 'react' ;
type Props = {
    onStart: () => void;
};

const StartScreen: React.FC<Props> = ({ onStart}) => {
    return (
        <div className="text-center mt -20">
            <h1 className="text-3xl font-bold mb-6">Welcome to the Quiz!</h1>
            <button
                onClick= {onStart}
                className="bg-blue-500 text-white px-6 py-2 rounded hover: bg-blue-600"
            >
             Start Quiz
             </button> 
        </div>
    );
};

export default StartScreen;
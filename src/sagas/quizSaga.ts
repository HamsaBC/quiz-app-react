import { call, put, takeEvery,select } from 'redux-saga/effects';
import { setQuestions } from '../slices/quizSlice'
import {type Question } from  '../slices/quizSlice'
import { saveState } from '../app/store';
import type { RootState } from '../app/store';
// this API call and returns quiz questions
export function fetchQuestionApi(): Promise<Question[]>{
    return Promise.resolve([
        {
            question:"which is capital of India?",
            options: ["Delhi","Goa","Mumbai","Gujarat"],
            correctAnswer: "Delhi"
        }

    ]);
}

function * fetchQuestionsWorker(): Generator<any,void,Question[]>{
    try{
        const data = yield call(fetchQuestionApi);    // call the Api and wait for result
        yield put(setQuestions(data));      // action to save fetched questions to redux state
    } catch (error: any) {
        console.error("Failed to fetch quiz: ", error.message);
    }
}

// Worker saga: saves updated quiz state when user adds a question
function* persistQuizStateOnAdd() {
  const quiz: RootState['quiz'] = yield select((state: RootState) => state.quiz);
  yield saveState({ quiz });
}

export function* quizSaga() {
    yield takeEvery('quiz/fetchQuestions', fetchQuestionsWorker);
}
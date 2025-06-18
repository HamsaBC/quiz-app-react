import { configureStore } from '@reduxjs/toolkit';
import quizReducer from '../slices/quizSlice';
import type { QuizState} from '../slices/quizSlice'
import createSagaMiddleware from 'redux-saga';
import { quizSaga } from '../sagas/quizSaga';

 type PersistedState = {                     // it describe what part we are saving (quiz)
    quiz: QuizState;
};
export const loadState = () : PersistedState | undefined=> {     // Loads the persisted Redux state (quiz data) from localStorage
    try {
        const serializedState = localStorage.getItem('quizState');  //retrieve the serialized state string from localStorage using the key 'quizState'
        if(!serializedState) return undefined;
        return JSON.parse(serializedState); // parse the string back into a JavaScript object and return it
    } catch (e) {
        console.error("could not load state",e);
        return undefined;
    }
    
};
//Saves the current Redux state (quiz data) to localStorage for persistence
export  const saveState = (state : any) => {
    try{
        const serializedState=JSON.stringify(state);
        localStorage.setItem('quizState', serializedState);
    } catch (e) {
        console.error("could not save state", e);
    }
};




//export default store;

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore( {
    reducer: {
        quiz:quizReducer,
          
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({thunk: false}).concat(sagaMiddleware),
      preloadedState: loadState(),
});

//Subscribe to store updates: this function runs every time an action is dispatched
store.subscribe(() => {
    saveState({
        quiz: store.getState().quiz,
    });
});
sagaMiddleware.run(quizSaga);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
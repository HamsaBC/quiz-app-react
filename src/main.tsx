import React from 'react'
import './index.css'
import App from './App'
import { Provider } from 'react-redux'
import { store } from './app/store.ts' 
import ReactDOM from 'react-dom/client';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>,
)

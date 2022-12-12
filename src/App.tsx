import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { mainQuizAction } from './Store/MainQuizSlice';

import MainQuiz from './Components/Main-Quiz';
import Quiz from './Components/Quiz';

function App() {
  const [ quizStarted, setQuizStarted ] = useState ( false );

  // Change View on Start Quiz Button Click
  const changeView = ( ) => {
    setQuizStarted( true );
  }

  return (
    <div className='w-full h-[100vh] bg-cover bg-[url(../public/images/main-bg.jpg)] bg-no-repeat bg-center'>
      <div className='w-2/4 mx-auto pt-36 flex flex-wrap justify-center'>
        <h1 className='font-semibold text-center text-6xl text-black pb-10 w-full'>Quiz App</h1>
        { quizStarted ? <Quiz /> : <MainQuiz changeView={changeView}/> }
      </div>
    </div>
  );
}

export default App;

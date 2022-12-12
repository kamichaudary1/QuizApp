import React, { useState, useEffect } from "react";
import { mainQuizAction } from "../Store/MainQuizSlice";
import { Link } from "react-router-dom";
import store from "../Store/Store";
import { useSelector, useDispatch } from "react-redux";
import {  RootState, QuizData, apiFetchedData } from '../types/types';
import { keys } from "@mui/system";

const  Quiz = ( ) => {
    const [ apiData, setApiData ] = useState<Array<apiFetchedData>>([]);
    const [ questionNum, setQuestionNum ] = useState( 0 );
    const [ answerStatus, setAnswerStatus ] = useState( false );
    const [ score, setScore ] = useState( 0 );
    const [ btnState, setBtnState ] = useState( false );
    const [ answerClicked, setAnswerClicked ] = useState( false );
    const [questions, setquestions] = useState<Array<string>>([]);

    const dispatch = useDispatch();

    const quizData = useSelector(( state:RootState ) => {
        return state.quiz.apiURL
    })

    async function getData(){
        try {
            const response = await fetch( quizData.baseURLLink );
            const responseData = await response.json(); 
            setApiData(responseData.results);
        }catch( err ){
            console.log( err );
        }
    }

    useEffect(() => {
        getData();
    }, [])

    
    useEffect(() => {
        const questionObject = apiData.map((item) => {
            return (
                item.question
            )
        })
        if( questionObject.length > 0 ){
            setquestions(questionObject);    
        }
        setquestions( questionObject);
    }, [apiData])
      
    const correctAnswer = apiData.map((item) => {
        return item.correct_answer;
    })

    const questionQty = apiData.length;

    const AnswerData = apiData.map((item) => {
        let answers = [...item.incorrect_answers];
         answers.push(item.correct_answer)
         return answers
    })
    // const shuffleAnswerData = AnswerData.sort((a, b) => 0.5 - Math.random());

    const correctAnswerHandler = ( e:React.MouseEvent<HTMLElement>, item:string | number | boolean ) => {
        const clickedAnswer = item;
        console.log(clickedAnswer, "::::: clickedAnswer")
        console.log(correctAnswer[questionNum], ":::: correctAnswer");
        if( clickedAnswer === correctAnswer[questionNum] ){            
            setAnswerStatus( true );
            setScore(score + 1);
            questions.length !== questionNum && setBtnState( true );
        }else {
            setAnswerStatus( false );
            questions.length !== questionNum && setBtnState( true );
        }
        setAnswerClicked(current => !current);
    }

    const nextQuestionHandler = () => {
        setQuestionNum(questionNum + 1);
        setAnswerStatus( false );
        setBtnState( false );
        setAnswerClicked( false );
    }

    return (
        
        <div className="text-center w-full bg-white shadow-md p-5 rounded-lg">
            <div>
                <h4 className={`text-3xl font-semibold text-black-600 ${ answerStatus ? "text-green-600" : "text-red-600"}`}>Score: {score}</h4>
                <h3 className="text-2xl font-medium text-gray-500 mt-5 mb-5">Question: {questionNum}/{questionQty}</h3>
                <h4 className="text-left text-1xl font-medium text-gray-500 mb-5">
                    <span className="text-xl ml-2 inline-block text-black">
                       {questionNum<=questions.length && <>Question:<span>{ questions[+questionNum] }</span></>}                           
                    </span>
                    <span className="text-1xl font-normal ml-2">{}</span>
                </h4>
                <ul className="inline-block cursor-pointer w-full">
                    {AnswerData.length>0 && AnswerData[questionNum] && AnswerData[questionNum].map(( item, i ) => {
                        return (
                                <li 
                                    onClick={(e:React.MouseEvent<HTMLElement>) => correctAnswerHandler(e , item)} 
                                    className={`inline-block p-2 border  border-slate-300 
                                    ${answerClicked ? "disabled" : ""}
                                    `}>
                                        <span>{item}</span>
                                </li>
                            )
                        })
                    }
                </ul>
                {apiData &&
                    <button 
                        onClick={nextQuestionHandler}
                        className={`bg-blue-500 border border-[1px] border-slate-100 rounded-lg w-[150px] h-11 mx-auto mt-7 text-white font-semibold text-lg
                            ${ btnState == true ? "bg-blue-500" : "disabled"}
                            ${btnState ? "bg-blue-500" : "in-active"}
                        `}>
                            Next
                    </button>
                    
                }
            </div>
        </div>
    )
}

export default Quiz;

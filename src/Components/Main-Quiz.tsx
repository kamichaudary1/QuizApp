import { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';

import { mainQuizAction } from '../Store/MainQuizSlice';
import { MainQuizProps } from '../types/types';

const MainQuiz = ( props: MainQuizProps) => {

    const [diffVal, setDiffVal] = useState( false );
    const [ amountState, setAmountState ] = useState( '' );
    const [ catState, setCatState ] = useState( '' );
    const [ difficultyState, setDifficultyState ] = useState( '' );
    const [ typeState, setTypeState ] = useState( '' );
    const [ baseURL, setBaseUrl ] = useState ( 'https://opentdb.com/api.php?' );

    const dispatch = useDispatch();
    const {changeView} = props;

    // Select Option OnChange Function
    const optionChangeHandler = ( e:React.ChangeEvent<HTMLSelectElement>, type: "category"|"difficulty"|"amount"|"questiontype" ) => {
        const optionValue = e.target.value;
        const selectedOptions = type;
        // console.log( typeof optionValue, ":::: VALUE")
        // console.log( selectedOptions, "::::TYPE")
        if(selectedOptions === 'amount' ){
            // apiURL = `${apiURL}amount=${optionValue}&`
            let baseURLAmount = selectedOptions + '=' + optionValue + '&';
            setAmountState(baseURLAmount);
        }
        if( selectedOptions === 'category'){
            let baseCategory = selectedOptions + '=' + optionValue + '&';
            setCatState(baseCategory);
        }
        if( selectedOptions === 'difficulty' ){
            let baseDifficulty = selectedOptions + '=' + optionValue + '&';
            setDifficultyState(baseDifficulty);
        }
        if( selectedOptions === 'questiontype' ){
            let baseType = 'type' + '=' + optionValue;
            setTypeState(baseType);
        }
        const baseURLLink =  baseURL+amountState+catState+difficultyState+typeState;
        dispatch( mainQuizAction.updateOptionValue({value:optionValue,type:type}) );
        dispatch( mainQuizAction.apiURLLink( {baseURLLink} ));
        setDiffVal ( true );
    }

    
    const quizArrLength = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
    const quizArrCat = [
        { label: 'General Knowledge', value: 9 },
        { label: 'Sports', value: 21 },
        { label: 'Geography', value: 22 },
        { label: 'Politics', value: 24 },
        { label: 'Animals', value: 27 }
    ]
    const quizDifficultyLevel = [ 'easy', 'medium', 'hard' ]
    return (
        <Fragment>
            <form className='flex flex-wrap justify-between w-full'>
                <select className='bg-white border border-[1px] border-slate-100 rounded-lg w-[23%] h-11 pl-3' onChange={(e) => optionChangeHandler(e, 'amount')}>
                    {quizArrLength.map(( item, i ) => {
                        return (
                            <option key={i} selected className='uppercase text-xs' defaultValue={item}>{item}</option>
                        )
                    })
                    }
                </select>
                <select className='bg-white border border-[1px] border-slate-100 rounded-lg w-[23%] h-11 pl-3' onChange={(e) => optionChangeHandler(e, 'category')}>
                    {quizArrCat.map(( item ) => {
                        return (
                            <option selected className='uppercase text-xs' value={item.value}>{item.label}</option>
                        )
                    })
                    }
                </select>
                <select className='bg-white border border-[1px] border-slate-100 rounded-lg w-[23%] h-11 pl-3' onChange={(e) => optionChangeHandler(e, 'difficulty')}>
                    {quizDifficultyLevel.map((item) => {
                        return (
                            <option key={item} selected className='text-xs'>{item}</option>
                        )
                    })}
                </select>
                <select className='bg-white border border-[1px] border-slate-100 rounded-lg w-[23%] h-11 pl-3' onChange={(e) => optionChangeHandler(e, 'questiontype')}>
                    <option selected className='uppercase text-xs'>multiple</option>
                    <option selected className='uppercase text-xs'>boolean</option>
                </select>
                    <button 
                        onClick={() => changeView() } 
                        className={`bg-blue-500 border border-[1px] border-slate-100 rounded-lg w-[150px] h-11 mx-auto mt-7 text-white font-semibold text-lg 
                        ${ diffVal ==false ? "disabled" : " "}`}
                    >
                        Start Quiz
                    </button>  
            </form>
        </Fragment>    
    )
}

export default MainQuiz
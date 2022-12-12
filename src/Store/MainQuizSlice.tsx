import { createSlice } from "@reduxjs/toolkit";

import {QuizData, SelectedData, InitialState} from '../types/types';

const mainQuizSlice = createSlice({
    name: 'quiz', 
    initialState: {
        data:[],
        selectedData:{
            amount: '',
            category: '',
            difficulty: '',
            questiontype:'',
        },
        apiURL: {baseURLLink:''},
        apiFetchedData:[],
    } as InitialState,
    reducers: {
        addQuizData: ( state, action ) => {
            state.data = action.payload;
        },
        updateOptionValue: ( state, action:{
            payload:  {
                value: string;
                type: "amount"|"category"|"difficulty"|"questiontype";
            },
            type: string;
        } ) => {
            state.selectedData[action.payload.type] = action.payload.value;
        },
        apiURLLink: ( state, action ) => {
            state.apiURL = action.payload;
        }
    }

});

export const mainQuizAction = mainQuizSlice.actions;

export default mainQuizSlice;
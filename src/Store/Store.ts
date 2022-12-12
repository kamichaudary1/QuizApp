import { configureStore } from "@reduxjs/toolkit";

import mainQuizSlice from './MainQuizSlice'

const store = configureStore({
    reducer: {
        quiz: mainQuizSlice.reducer
    }
});

export default store;
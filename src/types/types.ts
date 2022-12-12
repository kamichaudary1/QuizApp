import store from "../Store/Store";

export interface QuizData {
    category: string;
    correct_answer: string;
    difficulty: string;
    incorrect_answers: string[];
    question: string;
    type: string;
}

export interface SelectedData {
    amount: string;
    category: string;
    difficulty: string;
    questiontype: string;
}
export interface apiFetchedData {
    category: string;
    correct_answer: string;
    incorrect_answers: string[];
    question: string;
}

export interface InitialState {
    data: QuizData[];
    selectedData: SelectedData;
    apiURL:{baseURLLink:string};
    apiFetchedData: apiFetchedData[];
}

export interface APIOptions {
    apiOptions: Object;
}

export interface MainQuizProps {
    changeView: () => void
}

export type RootState = ReturnType<typeof store.getState>

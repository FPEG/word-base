import * as States from '../StateTypes'
import { Dispatch } from 'redux';
import Axios from 'axios';

import { WordSentenceListDto, WordSentenceListState } from '../StateTypes'

//actiontype
export const REFRESH_WORD_SENTENCE_LIST = 'REFRESH_WORD_SENTENCE_LIST'

interface RefreshWordSentenceListAcrion {
    type: typeof REFRESH_WORD_SENTENCE_LIST;
    payload: WordSentenceListState;
}

export type WordSentenceListActions = RefreshWordSentenceListAcrion;

//action
export const refresh = (wordSentenceListDto: WordSentenceListDto):
    WordSentenceListActions => ({
        type: REFRESH_WORD_SENTENCE_LIST,
        payload: wordSentenceListDto
    });

export const fetch = (wordSourceId: number): any => {
    return async (dispatch: Dispatch) => {
        return Axios.get(`wordSentence/${wordSourceId}`)
            .then((response) => {
                dispatch(refresh(response.data))
            })
    }
}

export const add = (vo: States.WordSentenceDto): any => {
    return async (dispatch: Dispatch) => {
        return Axios.post(`wordSentence`, vo)
    }
}

export const edit = (vo: States.WordSentenceDto) => {
    return (dispatch: Dispatch) => {
        return Axios.put(`wordSentence`, vo)
    }
}

export const remove = (vo: States.WordSentenceDto): any => {
    return async (dispatch: Dispatch) => {
        return Axios.delete(`wordSentence/${vo.wordSentenceId}`)
    }
}

//reducer
const initialState: WordSentenceListState = {
    wordSentenceDtos: [],
    count: 0
};
export const Reducer = (state = initialState, action: WordSentenceListActions):
    WordSentenceListState => {
    switch (action.type) {
        case REFRESH_WORD_SENTENCE_LIST:
            return action.payload
        default:
            return state
    }
}
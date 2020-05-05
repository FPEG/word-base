import * as States from '../StateTypes'
import { Dispatch } from 'redux';
import Axios, { AxiosResponse } from 'axios';

import * as WordSentenceAction from './WordSentence';

export const REFRESH_WORD_INFO = 'REFRESH_WORD_INFO'
interface RefreshWordInfoAcrion {
    type: typeof REFRESH_WORD_INFO;
    payload: States.WordInfoState;
}

export type WordInfoActions = RefreshWordInfoAcrion;


/**
* 更新WordSource的内容
* @param wordValue WordListState子类型 
*/
export const refresh = (wordInfoState: States.WordInfoState):
    WordInfoActions => ({
        type: REFRESH_WORD_INFO,
        payload: wordInfoState
    });

export const fetch = (wordValue: string): any => {
    return (dispatch: Dispatch): void => {
        Axios.get<States.WordVo, AxiosResponse<States.WordInfoDto>>(`word/${wordValue}`)
            .then((response) => {
                dispatch(refresh(response.data))
                dispatch(WordSentenceAction.refresh(response.data.wordSentenceListDto))
            })
    }
}

export const addUserOriginalWordValue = (currentWordValue: string): any => {
    return (dispatch: Dispatch): void => {
        Axios.post(`wordTenceUser/originalWord/${currentWordValue}`)
            .then(() => {
                dispatch(fetch(currentWordValue))
            })
    }
}

export const addUserWordValue = (vo: States.WordTenceUserReferenceDto, currentWordValue: string): any => {
    return (dispatch: Dispatch): void => {
        Axios.put(`wordTenceUser/${vo.wordTenceUserId}/${vo.wordValue}/${vo.wordTenceValue}`)
            .then(() => {
                dispatch(fetch(currentWordValue))
            })
    }
}

export const deleteUserWordValue = (vo: States.WordTenceUserReferenceDto, currentWordValue: string): any => {
    return (dispatch: Dispatch): void => {
        Axios.delete(`wordTenceUser/${vo.wordTenceUserReferenceId}`)
            .then(() => {
                dispatch(fetch(currentWordValue))
            })
    }
}

export const deleteUserOriginalWordValue = (vo: States.WordTenceUserReferenceDto, currentWordValue: string): any => {
    return (dispatch: Dispatch): void => {
        Axios.delete(`wordTenceUser/originalWord/${vo.wordTenceUserId}`)
            .then(() => {
                dispatch(fetch(currentWordValue))
            })
    }
}


export const editWordNote = (vo: States.WordNoteDto): any => {
    return (dispatch: Dispatch): void => {
        Axios.put(`wordNote/`, vo)
            .then(() => {
                dispatch(fetch(vo.wordValue))
            })
    }
}

const initialState: States.WordInfoState = {
    wordSentenceListDto: {
        count: 0,
        wordSentenceDtos: []
    },
    wordValue: '',
    wordTenceUserReferenceDtos: [],
    wordNoteDto: { wordNoteId: -1, wordValue: '初始化', wordNoteValue: '' }
};

export const Reducer = (state = initialState, action: WordInfoActions):
    States.WordInfoState => {
    switch (action.type) {
        case REFRESH_WORD_INFO:
            //返回新的state
            return action.payload
        default:
            return state
    }
}
import * as States from "../StateTypes";
import { Dispatch } from "redux";
import Axios, { AxiosResponse } from "axios";

export const LIST_WORD_LIST = 'LIST_WORD_LIST'
interface ListWordListAction {
    type: typeof LIST_WORD_LIST;
    payload: States.WordListState;
}

export const REFRESH_WORD_LIST = 'REFRESH_WORD_LIST'
interface ListWordListSuccessAction {
    type: typeof REFRESH_WORD_LIST;
    payload: States.WordListDto;
}

export const HIGHTLIGHT_WORD_LIST = 'HIGHTLIGHT_WORD_LIST'
interface HighlightWordListAction {
    type: typeof HIGHTLIGHT_WORD_LIST;
    payload: number;
}

export const ADD_WORD_LIST = 'ADD_WORD_LIST'
interface AddWordListAction {
    type: typeof ADD_WORD_LIST;
    payload: string;
}

export const DELETE_WORD_LIST = 'DELETE_WORD_LIST'
interface DeleteWordListAction {
    type: typeof DELETE_WORD_LIST;
    payload: string;
}

export type WordListActions = ListWordListAction | ListWordListSuccessAction | AddWordListAction | DeleteWordListAction | HighlightWordListAction;


/**
 * 更新wordlist的内容
 * @param wordListResponse 
 */
const refresh = (wordListResponse: States.WordListDto):
    WordListActions => ({
        type: REFRESH_WORD_LIST,
        payload: wordListResponse
    });

/**
* 更新wordlist的内容
* @param wordValue WordListState子类型 
*/
const _remove = (wordValue: string):
    WordListActions => ({
        type: DELETE_WORD_LIST,
        payload: wordValue
    });

export const hightlight = (index: number):
    WordListActions => ({
        type: HIGHTLIGHT_WORD_LIST,
        payload: index
    });

/**
 * 添加新单词
 * @param searchPadState 
 */
export const add = (searchPadState: States.WordSearcherState): any => {

    return (dispatch: Dispatch): any => {
        if (searchPadState.wordValue !== '') {
            // const data: States.WordDto = {
            //     wordValue: searchPadState.wordValue,
            //     wordTagValue: searchPadState.wordTagValue
            // }
            Axios.post(`word/${searchPadState.wordValue}/${searchPadState.wordTagValue}`)
                .then(
                    (): void => {
                        dispatch(fetchByCondition(searchPadState));
                    }
                )
        }
    }


}

/**
 * 查找所有单词 
 */
export const fetch = (page: number = 0, size: number = 10): any => {
    return (dispatch: Dispatch): void => {
        Axios.get(`wordList?page=${page}&size=${size}`)
            .then(
                (response: AxiosResponse<States.WordListDto>): void => {
                    dispatch(refresh(response.data))
                }
            )
    }
}

/**
 * 根据单词和标签查找单词列表
 * //todo 以后负责分发url
 * @param baseVo 
 */
export const fetchByCondition = (state: States.WordSearcherState, page: number = 0, size: number = 10): any => {
    return (dispatch: Dispatch): void => {
        Axios.post<States.WordSearcherState, AxiosResponse<States.WordListDto>>(`wordList/condition?page=${page}&size=${size}`, state)
            .then(
                (response): void => {
                    dispatch(refresh(response.data))
                }
            )
    }
}

//todo base

/**
 * 根据单词删除记录
 * @param wordValue 
 */
export const remove = (wordValue: string): any => {
    return (dispatch: Dispatch): void => {
        Axios.delete('word/' + wordValue)
            .then(() => {
                dispatch(_remove(wordValue))
            })
    }
}

const initialState: States.WordListState = {
    dto: {
        count: 0,
        wordListRecordDtos: []
    },
    highlightList: [],
};

/**
 * 负责改变WordList的state的函数
 * @param state 
 * @param action 
 */
export const Reducer = (state = initialState, action: WordListActions):
    States.WordListState => {
    switch (action.type) {
        case REFRESH_WORD_LIST:
            //返回新的state
            return {
                highlightList: new Array<number>(state.dto.wordListRecordDtos.length).fill(0),
                dto: action.payload,
            }
        case DELETE_WORD_LIST:
            {
                const newState: States.WordListState = { ...state }
                newState.dto.wordListRecordDtos = newState.dto.wordListRecordDtos.filter((index: States.WordListIndex) => index.wordValue !== action.payload)
                return newState;
            }
        case HIGHTLIGHT_WORD_LIST:
            {
                const newState: States.WordListState = { ...state }
                newState.highlightList = new Array<number>(state.dto.wordListRecordDtos.length).fill(0)
                newState.highlightList[action.payload] = 1;
                return newState;
            }
        default:
            return state
    }
}
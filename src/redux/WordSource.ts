import * as States from '../StateTypes'
import { Dispatch } from 'redux';
import Axios from 'axios';

import { TreeNodeNormal } from 'antd/lib/tree/Tree';

export const REFRESH_WORD_SOURCE = 'REFRESH_WORD_SOURCE'
interface RefreshWordSourceAction {
    type: typeof REFRESH_WORD_SOURCE;
    payload: States.WordSourceState;
}
export type WordSourceActions = RefreshWordSourceAction;

/**
* 更新WordSource的内容
* @param wordValue WordListState子类型 
*/
const refresh = (wordSourceState: States.WordSourceState):
    WordSourceActions => ({
        type: REFRESH_WORD_SOURCE,
        payload: wordSourceState
    });

export const fetch = (): any => (
    async (dispatch: Dispatch) => (
        Axios.get<TreeNodeNormal>('wordSource/')
            .then((response) => {
                const newResp = JSON.parse(JSON.stringify(response.data).replace(/"key":(\d*)/g, '"key":"t$1"'))
                dispatch(refresh({ data: newResp }))
            })
    )
)

export const add = (vo: States.WordSourceNodeDto): any => {
    return async (dispatch: Dispatch) => {
        return Axios.post(`wordSource/${vo.wordSourceId}/${vo.wordSourceValue}`)
            .then(() => {
                dispatch(fetch())

            })
    }
}
export const edit = (vo: States.WordSourceNodeDto): any => {
    return async (dispatch: Dispatch) => {
        return Axios.put(`wordSource/${vo.wordSourceId}/${vo.wordSourceValue}`)
            .then(() => {
                dispatch(fetch())
            })
    }
}
export const remove = (vo: States.WordSourceNodeDto): any => {
    return (dispatch: Dispatch): void => {
        Axios.delete(`wordSource/${vo.wordSourceId}`)
            .then(() => {
                dispatch(fetch())
            })
    }
}

const initialState: States.WordSourceState = {
    data: {
        key: '-1',
        title: '空'
    }
};

export const Reducer = (state = initialState, action: WordSourceActions):
    States.WordSourceState => {
    switch (action.type) {
        case REFRESH_WORD_SOURCE:
            //返回新的state
            return action.payload
        default:
            return state
    }
}
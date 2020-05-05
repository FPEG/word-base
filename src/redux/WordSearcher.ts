import * as States from '../StateTypes'

export const REFRESH_SEARCH_PAD = 'REFRESH_SEARCH_PAD'
interface RefreshSearchPadAction {
    type: typeof REFRESH_SEARCH_PAD;
    payload: States.WordSearcherState;
}

export type SearchPadActions = RefreshSearchPadAction;

/**
 * 更新searchpad的参数
 * @param param 
 */
export const refrush = (param: States.WordSearcherState):
    SearchPadActions => ({
        type: REFRESH_SEARCH_PAD,
        payload: param
    });


const initialState: States.WordSearcherState = {
    wordTagValue: '默认',
    wordValue: '',
    showTence: true
}


/**
 * 负责改变WordList的state的函数
 * @param state 
 * @param action 
 */
export const Reducer = (state = initialState, action: SearchPadActions):
    States.WordSearcherState => {
    switch (action.type) {
        case REFRESH_SEARCH_PAD:
            return action.payload
        default:
            return state
    }
}
import { combineReducers } from 'redux'
import { Reducer as WordSearcherReducer } from './WordSearcher'
import { Reducer as WordListReducer} from './WordList'
import { Reducer as WordSourceReducer } from './WordSource'
import { Reducer as WordInfoReducer } from './WordInfo'
import { Reducer as WordSentenceListReducer } from './WordSentence'

const CombinedReducers = combineReducers({
    WordListState: WordListReducer,
    WordSearcherState: WordSearcherReducer,
    WordSourceState: WordSourceReducer,
    WordInfoState: WordInfoReducer,
    WordSentenceListState: WordSentenceListReducer
})

export default CombinedReducers
export type RootState = ReturnType<typeof CombinedReducers>
import * as React from 'react';
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
//ui
import { Card } from "antd"
import WordSentence from '../components/WordSentence';
//ds
import { WordSentenceListDto } from '../StateTypes';
//redux ds
import { RootState } from '../redux/CombinedReducers'

export interface WordSentenceListProps {
    state: WordSentenceListDto;
    afterEdit?: () => void;
}

const _WordSentenceList: React.SFC<WordSentenceListProps> = (props) => {

    const { afterEdit, state } = props
    const getAfterEdit = () => (afterEdit === undefined) ? (() => { alert("asd") }) : (afterEdit)
    return (
        <div>
            <Card size='small'>
                {
                    props.state.wordSentenceDtos.map((element, index) => {
                        return <WordSentence afterEdit={getAfterEdit()} state={element} key={element.wordSentenceId} adder={false} />
                    })
                }
                <WordSentence afterEdit={getAfterEdit()}
                    state={{
                        chineseValue: '',
                        englishValue: '',
                        wordSentenceId: -1,
                        wordSourceId: -1,
                    }} adder={true} />
            </Card>
        </div>
    );
}



const mapStateToProps = (state: RootState) => ({ state: state.WordSentenceListState, })

const mapDispatchToProps = (dispatch: Dispatch) => ({})

/**
 * 得到当前过滤器并渲染 Link。
 */
const WordSentenceList = connect(
    mapStateToProps,
    mapDispatchToProps
)(_WordSentenceList)

export default WordSentenceList
import * as React from 'react';
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
//ui
import { Typography } from 'antd';
import '../assets/scss/WordNote.scss'
//comp
//ds
import { WordNoteDto } from '../StateTypes';
//react ds
import { RootState } from '../redux/CombinedReducers'
import { editWordNote } from '../redux/WordInfo'

const { Text } = Typography;
export interface WordNoteProps {
    state: WordNoteDto;
    onEdit: (vo: WordNoteDto) => void;
}

export const _WordNote: React.SFC<WordNoteProps> = (props) => {
    return (
        <div >
            <Text editable={{
                onChange: (str): void => {
                    const wordNoteVo: WordNoteDto = JSON.parse(JSON.stringify(props.state))
                    wordNoteVo.wordNoteValue = str;
                    props.onEdit(wordNoteVo);
                }
            }}>{props.state.wordNoteValue}</Text>
        </div>);
}

const mapStateToProps = (state: RootState):
    Pick<WordNoteProps, 'state'> => {
    return {
        state: state.WordInfoState.wordNoteDto,
    }
}

const mapDispatchToProps = (dispatch: Dispatch):
    Pick<WordNoteProps, 'onEdit'> => {
    return {
        onEdit: (wordNoteVo: WordNoteDto): void => { dispatch(editWordNote(wordNoteVo)) },
    }
}

/**
 * 得到当前过滤器并渲染 Link。
 */
const WordNote = connect(
    mapStateToProps,
    mapDispatchToProps
)(_WordNote)

export default WordNote
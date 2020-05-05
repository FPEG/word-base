import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { RootState } from '../redux/CombinedReducers'
import PropTypes from 'prop-types'
//ui
import { Input, Button } from 'antd';
import styles from '../assets/scss/WordBase.module.scss';
//comp
//ds
import { WordSearcherState } from '../StateTypes';
//redux
import * as WordListAction from '../redux/WordList'


export interface WordInputProps {
    searchPadState: WordSearcherState;
    onClick: (searchPadState: WordSearcherState, word: string) => void;
}

export const _WordInput: React.FC<WordInputProps> = props => {
    const { onClick } = props;
    const [inputRef, setInputRef] = useState("");
    return (
        <div className={styles.exampleInput}>
            <Input value={inputRef} onChange={(e): void => { setInputRef(e.target.value); }} size="large" placeholder="插入单词" />
            <Button size="large" onClick={(): void => { onClick(props.searchPadState, inputRef) }}>插入</Button>
        </div>
    );

}

_WordInput.propTypes = {
    onClick: PropTypes.func.isRequired,
}

const mapStateToProps = (state: RootState) => ({
    searchPadState: state.WordSearcherState
})

const mapDispatchToProps = (dispatch: Dispatch):
    Pick<WordInputProps, 'onClick'> => {
    return {
        onClick: (searchPadState): void => {
            dispatch(WordListAction.add(searchPadState));
        }
    }
}

const WordInput = connect(
    mapStateToProps,
    mapDispatchToProps
)(_WordInput)

export default WordInput
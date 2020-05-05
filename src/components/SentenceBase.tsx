import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Dispatch, bindActionCreators } from 'redux'
import { RootState } from '../redux/CombinedReducers'
import Axios from 'axios';
//ui
import '../assets/scss/SentenceBase.scss'
//comp
import WordSource from "../components/WordSource";
import WordSentenceList from './WordSentenceList';
//ds
//redux ds
import * as WordSentenceAction from '../redux/WordSentence'
//util
import ConvertUtils from "../utils/Convert";
export interface SentenceBaseProps {
    onNodeClick: typeof WordSentenceAction.fetch;
}

export const _SentenceBase: React.SFC<SentenceBaseProps> = props => {
    const { onNodeClick } = props;
    const [selectedKeys, setSelectedKeys] = useState<string[]>(["t0"]);

    return (
        <div className="csc50">
            <WordSource
                onNodeClick={(selectedKeys: any) => {
                    setSelectedKeys(selectedKeys);
                    const a = ConvertUtils.treeKeyToUndefinedNumber(selectedKeys)
                    if (a !== undefined) {
                        onNodeClick(a)
                    }
                }}
            />
            <WordSentenceList
                afterEdit={() => {
                    const a = ConvertUtils.treeKeyToUndefinedNumber(selectedKeys)
                    if (a !== undefined) {
                        onNodeClick(a)
                    }
                }}
            />
        </div>);
}

const mapStateToProps = (state: RootState) => ({
    // state: state.WordSourceState,
})

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators({
        onNodeClick: WordSentenceAction.fetch,
    }, dispatch)

const SentenceBase = connect(
    mapStateToProps,
    mapDispatchToProps
)(_SentenceBase)

export default SentenceBase
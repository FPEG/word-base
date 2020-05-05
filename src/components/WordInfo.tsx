import React from 'react'
import { connect } from 'react-redux'
import { Dispatch, bindActionCreators } from 'redux'
import { RootState } from '../redux/CombinedReducers'
//ui
import { Card, Descriptions } from 'antd';
import '../assets/scss/WordInfo.scss'
//comp
import WordTenceUser from '../components/WordTenceUser';
import WordNote from '../components/WordNote';
import WordSentenceList from '../components/WordSentenceList';
//ds
import { WordInfoState } from '../StateTypes';
//redux
import * as WordInfoAction from '../redux/WordInfo'



export interface WordInfoProps {
    state: WordInfoState;
    afterWordSentenceEdit: typeof WordInfoAction.fetch
}

export const _WordInfo: React.SFC<WordInfoProps> = (props) => {
    const { state, afterWordSentenceEdit } = props;
    return (<div className="csc">
        <Card size='small'>
            <Descriptions size='small' title="基本信息" bordered>
                <Descriptions.Item span={3} label={<div>单词</div>}>
                    <div style={{ fontSize: '3em' }}>
                        {state.wordValue}
                    </div>
                </Descriptions.Item>
                <Descriptions.Item span={3} label="其他时态">
                    <WordTenceUser state={state.wordTenceUserReferenceDtos} wordValue={state.wordValue} />
                </Descriptions.Item>
                <Descriptions.Item span={3} label="笔记">
                    <WordNote />
                </Descriptions.Item>
            </Descriptions>
        </Card>
        <div className="csc50" style={{ marginTop: "1em" }}>
            <WordSentenceList afterEdit={() => { afterWordSentenceEdit(state.wordValue) }} />
        </div>
    </div>);
}

const mapStateToProps = (state: RootState) => ({
    state: state.WordInfoState
})

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators({
        afterWordSentenceEdit: WordInfoAction.fetch
    }, dispatch)

/**
 * 得到当前过滤器并渲染 Link。
 */
const WordInfo = connect(
    mapStateToProps,
    mapDispatchToProps
)(_WordInfo)

export default WordInfo
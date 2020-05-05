import React, { ReactNode, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Dispatch, bindActionCreators } from 'redux'
import { RootState } from '../redux/CombinedReducers'
//ui
import { Button, List, Typography, Modal, Pagination } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import styles from '../assets/scss/WordList.module.scss';
//comp
//ds
import { WordListState, WordListIndex, WordSearcherState } from '../StateTypes';
//redux
import * as WordInfoAction from '../redux/WordInfo'
import * as WordListAction from '../redux/WordList'

export interface WordListProps {
    onLoadWordList: typeof WordListAction.fetchByCondition;
    onFirstLoadWordList: typeof WordListAction.fetch;
    onSearchWord: typeof WordListAction.remove;
    onDelete: typeof WordInfoAction.fetch;
    onHighlightWord: typeof WordListAction.hightlight;
    state: WordListState;
    wordSearchState: WordSearcherState
}
export const _WordList: React.FC<WordListProps> = props => {
    const { onLoadWordList, onDelete, onSearchWord, wordSearchState, onHighlightWord, state } = props;
    const { dto: listValue } = props.state;
    const [deleteWordValue, setDeleteWordValue] = useState("");
    const [modalVisible, setModalVisible] = useState(false);

    //仅初始化
    useEffect(() => {
        onLoadWordList(wordSearchState, 0, 10);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [onLoadWordList])

    return (
        <div>
            <Pagination onChange={(page, size) => onLoadWordList(wordSearchState, page - 1, size)} size='small' total={listValue.count} showSizeChanger showQuickJumper />
            <List
                className={styles.wordList}
                header={
                    <Typography.Text strong>单词列表</Typography.Text>
                }
                bordered
                dataSource={listValue.wordListRecordDtos}
                renderItem={(item: WordListIndex, index: number): ReactNode => {
                    return (
                        <div>
                            <List.Item className={styles.listItem} style={((state.highlightList[index]) ? {} : { borderLeft: "none" })
                            } onClick={(): void => {
                                onSearchWord(item.wordValue);
                                onHighlightWord(index);

                            }}>
                                <div>{item.wordValue}</div>
                                <Button icon={<DeleteOutlined />} onClick={(): void => {
                                    setDeleteWordValue(item.wordValue);
                                    setModalVisible(true);
                                }} />
                            </List.Item>
                            <div style={{ background: "red" }}></div>
                        </div>
                    )
                }}
            />
            <Modal
                title={<div>确认删除单词<strong>{deleteWordValue}</strong>？？</div>}
                visible={modalVisible}
                onOk={(): void => {
                    onDelete(deleteWordValue);
                    setModalVisible(false);
                }}
                onCancel={(): void => setModalVisible(false)}
                okText="删"
                cancelText="不要"
            >
                我记得好像不能撤销的
            </Modal>
        </div>

    )
}

const mapStateToProps = (state: RootState) => ({
    state: state.WordListState,
    wordSearchState: state.WordSearcherState,
})

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators({
        onLoadWordList: WordListAction.fetchByCondition,
        onFirstLoadWordList: WordListAction.fetch,
        onDelete: WordListAction.remove,
        onSearchWord: WordInfoAction.fetch,
        onHighlightWord: WordListAction.hightlight,
    }, dispatch);

const WordList = connect(
    mapStateToProps,
    mapDispatchToProps
)(_WordList)

export default WordList
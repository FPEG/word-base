import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Dispatch, bindActionCreators } from 'redux'
import { RootState } from '../redux/CombinedReducers'
import Axios from 'axios';
//ui
import { Input, Button, Select, Row, Col, Checkbox } from 'antd';
import { Gutter } from "antd/lib/grid/row";
import { UserOutlined } from '@ant-design/icons';
//comp
import WordSource from "../components/WordSource";
//ds
import { WordTagDto, WordSearcherState } from "../StateTypes";
//redux ds
import * as WordSearchAction from '../redux/WordSearcher'
import * as WordListAction from '../redux/WordList'
//util
import ConvertUtils from "../utils/Convert";

const { Option } = Select;

export interface WordSearcherProps {
    onStateChange: (param: WordSearcherState) => void;
    onSearchSubmit: typeof WordListAction.fetchByCondition;
    onPostWord: typeof WordListAction.add;
    state: WordSearcherState;
}

export const _WordSearcher: React.SFC<WordSearcherProps> = props => {
    const { onStateChange, onSearchSubmit, state, onPostWord } = props;
    const rowGutter: [Gutter, Gutter] = [0, { xs: 8, sm: 16, md: 24, lg: 32 }];
    const [tagList, setTagList] = useState<string[]>([]);

    //初始化列表
    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            const result = await Axios.get<WordTagDto[]>('wordTag')
            setTagList(result.data.map(({ wordTagValue }) => wordTagValue));
        };
        fetchData();
    }, []);
    return (
        <div>
            <Row gutter={rowGutter}>
                <Col>
                    <Input value={state.wordValue} onChange={(e): void => {
                        const stateCopy = JSON.parse(JSON.stringify(state));
                        stateCopy.wordValue = e.target.value
                        onStateChange(stateCopy);
                    }} prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='输入单词' />
                </Col>
            </Row>
            <Row gutter={rowGutter}>
                <Col>
                    <Select
                        showSearch
                        style={{ width: "100%" }}
                        placeholder='选择标签'
                        optionFilterProp="children"
                        value={state.wordTagValue}
                        onSelect={(wordTagValue: string): void => {
                            const stateCopy: WordSearcherState = JSON.parse(JSON.stringify(state));
                            stateCopy.wordTagValue = wordTagValue
                            onStateChange(stateCopy);
                        }}
                    // onBlur={onBlur}
                    // onSearch={onSearch}
                    // filterOption={(input, option) =>
                    //     option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    // }
                    // dropdownRender={(menu: React.ReactNode): React.ReactNode => (
                    //     <div>
                    //         {menu}
                    //         <Divider style={{ margin: '4px 0' }} />
                    //         <div
                    //             style={{ padding: '4px 8px', cursor: 'pointer' }}
                    //             onMouseDown={e => e.preventDefault()}
                    //         >
                    //             <PlusOutlined /> Add item
                    //             </div>
                    //     </div>
                    // )}
                    >
                        {tagList.map(d => (
                            <Option value={d}>{d}</Option>
                        ))}
                    </Select>
                </Col>
            </Row>
            <Row gutter={rowGutter}>
                <Col span={8}>
                    <Button onClick={(): void => {
                        onPostWord(state);
                    }} style={{ width: "100%" }}>插入</Button>
                </Col>

                <Col span={8}>
                    <div style={{ margin: "0.25em", textAlign: 'center' }}>
                        <Checkbox checked={state.showTence} onChange={(e): void => {
                            const stateCopy: WordSearcherState = JSON.parse(JSON.stringify(state));
                            stateCopy.showTence = e.target.checked;
                            onStateChange(stateCopy);
                        }}>时态</Checkbox>
                    </div>
                </Col>
                <Col span={8} >
                    <Button onClick={(): void => {
                        onSearchSubmit(state);
                    }} style={{ width: "100%" }}>搜索</Button>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <WordSource
                        // selectedKeys={ConvertUtils.undefinedNumberToTreeKey(state.wordSourceId)}
                        onNodeClick={(node): void => {
                            const stateCopy: WordSearcherState = JSON.parse(JSON.stringify(state));
                            stateCopy.wordSourceId = ConvertUtils.treeKeyToUndefinedNumber(node);
                            onStateChange(stateCopy);
                        }}
                    />
                </Col>
            </Row>
        </div >
    )
}


const mapStateToProps = (state: RootState) => ({
    state: state.WordSearcherState
})

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators({
        onSearchSubmit: WordListAction.fetchByCondition,
        onStateChange: WordSearchAction.refrush,
        onPostWord: WordListAction.add
    }, dispatch)

/**
 * 得到当前过滤器并渲染 Link。
 */
const WordSearcher = connect(
    mapStateToProps,
    mapDispatchToProps
)(_WordSearcher)

export default WordSearcher
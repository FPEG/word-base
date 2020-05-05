import * as React from 'react';
import { connect } from 'react-redux'
import { Dispatch, bindActionCreators } from 'redux'
import { RootState } from '../redux/CombinedReducers'
//ui
import { Tree, Row, Col, Button, Modal, Input, Card } from 'antd';
import { DeleteOutlined, PlusOutlined, EditOutlined } from '@ant-design/icons';
//comp
//ds
import { Key } from 'rc-tree/lib/interface';
import { WordSourceState, WordSourceNodeDto } from '../StateTypes';
//redux
import * as WordSourceAction from '../redux/WordSource'
//util
import TipsUtils from '../utils/TipsUtils';
import ConvertUtils, { MyString } from '../utils/Convert';


export interface WordSourceProps {
    state: WordSourceState;
    /**
     * 根据数字转换来的选择表
     */
    selectedKeys?: Key[];
    onFirstLoad: () => void;
    /**
     * 向外传值
     */
    onNodeClick: (selectedKeys: Key[]) => void;
    onNodeDelete: (wordSourceNodeVo: WordSourceNodeDto) => void;
    onNodeAdd: (wordSourceNodeVo: WordSourceNodeDto) => void;
    onNodeEdit: (wordSourceNodeVo: WordSourceNodeDto) => void;
}


export const _WordSource: React.SFC<WordSourceProps> = (props) => {
    const { confirm } = Modal;
    const { onFirstLoad, onNodeDelete, onNodeAdd, onNodeEdit } = props;
    //初始化source树
    React.useEffect(() => {
        onFirstLoad();
    }, [onFirstLoad]);

    const [addModelVisible, setAddModelVisible] = React.useState(false);
    const [editModelVisible, setEditModelVisible] = React.useState(false);
    const [addModelValue, setAddModelValue] = React.useState("");
    const [editModelValue, setEditModelValue] = React.useState("");
    const [wordSourceId, setWordSourceId] = React.useState<number | undefined>(undefined);
    //选择的key
    const [selectedKeys, setSelectedKeys] = React.useState<string[]>((props.selectedKeys === undefined) ? (["t0"]) : (props.selectedKeys.map(e => e.toString())));
    const advSetWordSourceId = (selectedKeys: Key[]): void => {
        setWordSourceId((selectedKeys.length === 0) ? (undefined) : (Number.parseInt(selectedKeys[0].toString().substring(1))))
    }

    return (<div>
        {/* 这是森林[]！！！！ */}
        <Card>
            <Tree
                treeData={[props.state.data]}
                defaultExpandedKeys={(function getParentNode() {
                    const str: MyString = { value: 't1' };
                    //todo 改掉默认值
                    if (selectedKeys[0] !== "t1" && selectedKeys[0] !== undefined) {
                        ConvertUtils.getParentId(props.state.data, str, selectedKeys[0])
                    }
                    return [str.value]
                }())}
                selectedKeys={selectedKeys}
                onSelect={(e: any): void => {
                    setSelectedKeys(e);
                    advSetWordSourceId(e);
                    props.onNodeClick(e);
                }}
            >
            </Tree>
            <div>
                <Row>
                    <Col span={8}><Button onClick={(): void => { setAddModelVisible(true); }} icon={<PlusOutlined />}></Button></Col>
                    <Col span={8}><Button onClick={(): void => { setEditModelVisible(true); }} icon={<EditOutlined />}></Button></Col>
                    <Col span={8}><Button onClick={(): void => {
                        confirm({
                            title: '你确定要删除节点吗',
                            content: '？？？',
                            okText: '是的',
                            okType: 'default',
                            cancelText: '不',
                            onOk() {
                                TipsUtils.checkUndefined(wordSourceId, onNodeDelete, { wordSourceId, wordSourceValue: addModelValue }, "请选择例句来源")
                            }
                        });
                    }} icon={<DeleteOutlined />}></Button></Col>
                </Row>
            </div>
            <Modal
                title="添加子节点"
                visible={addModelVisible}
                onCancel={(): void => { setAddModelVisible(false) }}
                onOk={(): void => { TipsUtils.checkUndefined(wordSourceId, (wordSourceId) => { onNodeAdd({ wordSourceId, wordSourceValue: addModelValue }); setAddModelVisible(false); }, wordSourceId, "请选择例句来源") }}
            >
                <Input value={addModelValue} onChange={(e): void => { setAddModelValue(e.target.value) }}></Input>
            </Modal>
            <Modal
                title="修改子节点"
                visible={editModelVisible}
                onCancel={(): void => { setEditModelVisible(false) }}
                onOk={(): void => { TipsUtils.checkUndefined(wordSourceId, (wordSourceId) => { onNodeEdit({ wordSourceId, wordSourceValue: editModelValue }); setEditModelVisible(false); }, wordSourceId, "请选择例句来源"); }}
            >
                <Input value={editModelValue} onChange={(e): void => { setEditModelValue(e.target.value) }}></Input>
            </Modal>
        </Card>
    </div>);
}




const mapStateToProps = (state: RootState) => ({
    state: state.WordSourceState,
})

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators({
        onFirstLoad: WordSourceAction.fetch,
        onNodeAdd: WordSourceAction.add,
        onNodeEdit: WordSourceAction.edit,
        onNodeDelete: WordSourceAction.remove
    }, dispatch)


/**
 * 得到当前过滤器并渲染 Link。
 */
const WordSource = connect(
    mapStateToProps,
    mapDispatchToProps
)(_WordSource)

export default WordSource
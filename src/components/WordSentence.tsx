import * as React from 'react';
import { connect } from 'react-redux'
import { Dispatch, bindActionCreators } from 'redux'
import { RootState } from '../redux/CombinedReducers'
//ui
import { Descriptions, Input, Button, Modal } from 'antd';
import styles from '../assets/scss/WordSentence.module.scss'
//comp
import WordSource from '../components/WordSource';
//ds
import { WordSentenceState, WordSourceState, WordSentenceDto } from '../StateTypes';
import { DisplayProperty } from 'csstype'
//redux ds
import * as WordSentenceAction from '../redux/WordSentence'
//util
import TipsUtils from '../utils/TipsUtils';
import ConvertUtils, { MyString } from '../utils/Convert';



const { confirm } = Modal;

export interface WordSentenceProps {
    /**
     * 是否是添加器
     */
    adder: boolean;
    /**
     * 例句属于的单词，用于刷新WordInfo
     */
    wordValue: string;
    /**
     * 例句state
     */
    state: WordSentenceState;
    /**
     * 来源state
     */
    wordSourceState: WordSourceState;
    onWordSentenceAdd: typeof WordSentenceAction.add;
    onWordSentenceEdit: typeof WordSentenceAction.edit;
    onWordSentenceDelete: typeof WordSentenceAction.remove;
    afterEdit: () => any;
}

export const _WordSentence: React.SFC<WordSentenceProps> = (props) => {

    const { afterEdit } = props;
    //可编辑状态
    const [editable, setEditable] = React.useState(props.adder);
    //当前例句状态
    const [wordSentence, setWordSentence] = React.useState<WordSentenceState>(JSON.parse(JSON.stringify(props.state)));
    //来源对话框可见状态
    const [modalVisible, setModalVisible] = React.useState(false);
    //当前选择的sourceid
    const [modalWordSourceId, setModalWordSourceId] = React.useState<number | undefined>(props.state.wordSourceId);
    //来源路径
    const [flatValue, setFlatValue] = React.useState<string>((function () {
        const str: MyString = { value: '' };
        ConvertUtils.getPathToSun(props.wordSourceState.data, str, "t" + props.state.wordSourceId.toString());
        return str.value.substring(0, str.value.length - 2);
    }()));

    //例句state更新ui
    React.useEffect(() => {
        const newState: WordSentenceState = JSON.parse(JSON.stringify(props.state))
        setWordSentence(newState)
    }, [props.state])

    //显示器状态
    const shower = (): DisplayProperty => (editable ? 'none' : 'block')
    //编辑器状态
    const editor = (): DisplayProperty => (editable ? 'block' : 'none')
    //切换函数
    const switchEditer = (): void => { setEditable(!editable) }

    return (
        <div>
            <Descriptions bordered size='small' className={styles.descs}>

                <Descriptions.Item label="例句" span={3} className={styles.desc}>
                    <div className={styles.flatDiv} style={{ display: shower() }}>
                        {props.state.englishValue}
                    </div>
                    <div style={{ display: editor() }}>
                        <Input.TextArea autoSize={true} value={wordSentence.englishValue} /* style={{ overflow: 'hidden' }} */
                            onChange={(e): void => {
                                const wordSentenceState: WordSentenceState = JSON.parse(JSON.stringify(wordSentence));
                                wordSentenceState.englishValue = e.target.value;
                                setWordSentence(wordSentenceState);
                            }} />
                    </div>
                </Descriptions.Item>

                <Descriptions.Item label="翻译" span={3} className={styles.desc}>
                    <div className={styles.flatDiv} style={{ display: shower() }}>
                        {props.state.chineseValue}
                    </div>
                    <div style={{ display: editor() }}>
                        <Input.TextArea autoSize={true} value={wordSentence.chineseValue} /* style={{ overflow: 'hidden' }} */
                            onChange={(e): void => {
                                const wordSentenceState: WordSentenceState = JSON.parse(JSON.stringify(wordSentence));
                                wordSentenceState.chineseValue = e.target.value;
                                setWordSentence(wordSentenceState);
                            }} />
                    </div>
                </Descriptions.Item>

                <Descriptions.Item label="来源" span={3} className={styles.desc}>
                    <div className={styles.flatDiv} style={{ display: shower() }}>
                        {flatValue}
                    </div>
                    <div style={{ display: editor() }}>
                        <Button onClick={(): void => { setModalVisible(true); }}>修改来源</Button>
                        <div className={styles.flatDiv} >{flatValue}</div>
                    </div>
                </Descriptions.Item>

                <Descriptions.Item label="操作" span={3} className={styles.desc}>

                    <div style={{ display: shower() }}>
                        <Button className={styles.btn} onClick={switchEditer}>修改</Button>
                        <Button onClick={async () => {
                            await props.onWordSentenceDelete(wordSentence);
                            afterEdit();
                        }}>删除</Button>
                    </div>

                    <div style={{ display: editor() }}>
                        {((props.adder) ? (
                            //添加器环节
                            <Button className={styles.btn} onClick={async () => {
                                //外面设置的默认值
                                if (wordSentence.wordSourceId === -1 || modalWordSourceId === undefined) {
                                    confirm({
                                        title: '警告',
                                        content: '请选择例句来源'
                                    });
                                }
                                else {
                                    const newWordSentence: WordSentenceState = JSON.parse(JSON.stringify(wordSentence));
                                    newWordSentence.wordSourceId = modalWordSourceId;
                                    await props.onWordSentenceAdd(newWordSentence);
                                    afterEdit();
                                }
                            }}>新建</Button>
                        ) : (
                                //非添加器环节
                                <div>
                                    <Button className={styles.btn} onClick={() => {
                                        TipsUtils.checkUndefined(modalWordSourceId, async (modalWordSourceId) => {
                                            const newWordSentence: WordSentenceState = JSON.parse(JSON.stringify(wordSentence));
                                            newWordSentence.wordSourceId = modalWordSourceId;
                                            await props.onWordSentenceEdit(newWordSentence);
                                            switchEditer();
                                            afterEdit()
                                        }, modalWordSourceId, "请选择例句来源")
                                    }}>确认</Button>
                                    <Button onClick={switchEditer}>取消</Button>
                                </div>
                            ))}
                    </div>
                </Descriptions.Item>
            </Descriptions>

            <Modal
                title={<div>选择来源</div>}
                visible={modalVisible}
                onOk={(): void => {
                    //更改对话框的来源属性
                    TipsUtils.checkUndefined(modalWordSourceId, (modalWordSourceId) => {
                        //刷新来源属性
                        const newWordSentence: WordSentenceState = JSON.parse(JSON.stringify(wordSentence));
                        newWordSentence.wordSourceId = modalWordSourceId;
                        setWordSentence(newWordSentence);
                        //刷新路径
                        let str: MyString = { value: '' };
                        ConvertUtils.getPathToSun(props.wordSourceState.data, str, "t" + modalWordSourceId.toString());
                        setFlatValue(str.value.substring(0, str.value.length - 2));
                        //关闭
                        setModalVisible(false);
                    }, modalWordSourceId, "请选择例句来源");
                }}
                onCancel={(): void => setModalVisible(false)}
                okText="选择"
                cancelText="取消"
            >
                <WordSource
                    selectedKeys={ConvertUtils.undefinedNumberToTreeKey(wordSentence.wordSourceId)}
                    onNodeClick={(selectedKeys): void => setModalWordSourceId(ConvertUtils.treeKeyToUndefinedNumber(selectedKeys))}
                />
            </Modal>
        </div>
    )
}



const mapStateToProps = (state: RootState) => ({
    wordSourceState: state.WordSourceState,
    wordValue: state.WordInfoState.wordValue
})

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    onWordSentenceAdd: WordSentenceAction.add,
    onWordSentenceDelete: WordSentenceAction.remove,
    onWordSentenceEdit: WordSentenceAction.edit
}, dispatch);

/**
 * 得到当前过滤器并渲染 Link。
 */
const WordSentence = connect(
    mapStateToProps,
    mapDispatchToProps
)(_WordSentence)

export default WordSentence
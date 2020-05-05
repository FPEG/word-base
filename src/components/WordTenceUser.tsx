import * as React from 'react';
import { connect } from 'react-redux'
import { Dispatch, bindActionCreators } from 'redux'
//ui
import { Button, Tag, Modal, Input, Row, Col } from 'antd';
//ds
import { WordTenceUserReferenceDto } from '../StateTypes';
//redux
import * as WordInfoAction from '../redux/WordInfo'

export interface WordTenceUserProps {
    wordValue: string;
    state: WordTenceUserReferenceDto[];
    onUserOriginalWordValueAdd: typeof WordInfoAction.addUserOriginalWordValue;
    onUserWordValueAdd: typeof WordInfoAction.addUserWordValue;
    onUserWordValueDelete: typeof WordInfoAction.deleteUserWordValue;
    onUserOriginalWordValueDelete: typeof WordInfoAction.deleteUserOriginalWordValue;
}

export const _WordTenceUser: React.SFC<WordTenceUserProps> = (props) => {
    const [modalVisible, setModalVisible] = React.useState(false);
    const [inputWordValue, setInputWordValue] = React.useState('');
    const [inputWordTenceValue, setInputWordTenceValue] = React.useState('');
    return (<div>
        {((props.state.length === 0) ? (<Button onClick={(): void => { props.onUserOriginalWordValueAdd(props.wordValue) }}>设为原型</Button>) : (
            <div>
                <Row gutter={[8, 8]}>
                    <Col>
                        {props.state.map((vo) => {
                            if (vo.wordValue === vo.originalWordValue)
                                return <Tag color="blue" key={vo.wordValue}><div>{vo.wordValue}</div><div>{vo.wordTenceValue}</div></Tag>
                            else
                                return <Tag key={vo.wordValue}><div>{vo.wordValue}</div><div>{vo.wordTenceValue}</div></Tag>
                        })}
                    </Col>
                </Row>
                <Row gutter={[8, 0]}>
                    <Col span={12}>
                        <Button style={{ width: "100%" }} onClick={(): void => { setModalVisible(true); }}>添加时态</Button>
                    </Col>
                    <Col span={12}>
                        <Button style={{ width: "100%" }} onClick={(): void => { props.onUserOriginalWordValueDelete(props.state[0], props.wordValue) }}>删除原型表</Button>
                    </Col>
                </Row>
            </div>

        ))}
        <Modal
            title='添加时态'
            visible={modalVisible}
            onOk={(): void => {
                props.onUserWordValueAdd({
                    originalWordValue: props.wordValue,
                    wordTenceValue: inputWordTenceValue,
                    wordValue: inputWordValue,
                    wordTenceUserId: props.state[0].wordTenceUserId,
                    wordTenceUserReferenceId: -1
                }, props.wordValue);
                setModalVisible(false);
            }}
            onCancel={(): void => { setModalVisible(false); }}
        >
            <Input value={inputWordValue} onChange={(e): void => { setInputWordValue(e.target.value) }} />
            <Input value={inputWordTenceValue} onChange={(e): void => { setInputWordTenceValue(e.target.value) }} />
        </Modal>
    </div >);
}

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators({
        onUserOriginalWordValueAdd: WordInfoAction.addUserOriginalWordValue,
        onUserWordValueAdd: WordInfoAction.addUserWordValue,
        onUserWordValueDelete: WordInfoAction.deleteUserWordValue,
        onUserOriginalWordValueDelete: WordInfoAction.deleteUserOriginalWordValue,
    }, dispatch);

/**
 * 得到当前过滤器并渲染 Link。
 */
const WordTenceUser = connect(
    null,
    mapDispatchToProps
)(_WordTenceUser)

export default WordTenceUser
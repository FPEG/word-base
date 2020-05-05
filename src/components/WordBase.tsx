import React from 'react'
import { Row, Col } from 'antd';
import WordList from '../components/WordList';
import WordSearcher from './WordSearcher';
import WordInfo from '../components/WordInfo'

const WordBase: React.FC = () => {
    return (
        <div>
            <Row gutter={16}>
                <Col span={6}>
                    <WordList />
                </Col>
                <Col span={6}>
                    <WordSearcher />
                </Col>
                <Col span={12}>
                    <WordInfo />
                </Col>
            </Row>
        </div>

    )
}

export default WordBase;
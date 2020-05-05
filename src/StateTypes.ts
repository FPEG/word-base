import { TreeNodeNormal } from "antd/lib/tree/Tree";


export interface WordDto {
    wordValue?: string;
    wordTagValue?: string;
}

export interface WordVo {
    wordValue: string;
}

export interface WordTagDto {
    wordTagValue: string;
}

export interface WordConditionDto {
    wordValue?: string;
    wordTagValue?: string;
    wordSourceId?: number;
    showTence: boolean;
}

export interface WordSentenceDto {
    wordSentenceId: number;
    englishValue: string;
    chineseValue: string;
    wordSourceId: number;
}

export interface WordSentenceListDto {
    count: number;
    wordSentenceDtos: WordSentenceDto[];
}

export type WordSentenceListState = WordSentenceListDto;

export interface WordTenceUserReferenceDto {
    wordTenceUserId: number;
    wordTenceUserReferenceId: number;
    wordTenceValue: string;
    wordValue: string;
    originalWordValue: string;
}

export interface WordNoteDto {
    wordValue: string;
    wordNoteValue: string;
    wordNoteId: number;
}

export interface WordInfoDto {
    wordValue: string;
    wordTenceUserReferenceDtos: WordTenceUserReferenceDto[];
    wordSentenceListDto: WordSentenceListDto;
    wordNoteDto: WordNoteDto;
}

export interface WordListRecordDto {
    wordValue: string;
}

export interface WordSourceNodeDto {
    wordSourceId: number;
    wordSourceValue: string;
}

export type WordSearcherState = WordConditionDto;

export type WordSentenceState = WordSentenceDto;

export type WordInfoState = WordInfoDto;

export type WordListIndex = WordListRecordDto;

//************************************** */

export interface WordInfo {
    tag: string;
}

/**
 * ajax返回的要在reducer里被压平的word信息数组,现在包含了单词，以后可能包含每个单词的附加信息
 */
// export type WordListDto = WordListRecordDto[];
export interface WordListDto {
    count: number
    wordListRecordDtos: WordListRecordDto[]
}

/**
 * 在reducer里返回给组件的被压平的word信息
 * //todo 添加描述信息
 */
export interface WordListState {
    /**
     * wordlist组件每列的信息
     */
    dto: WordListDto;
    highlightList: number[]
}


export interface WordSourceState {
    data: TreeNodeNormal;

}






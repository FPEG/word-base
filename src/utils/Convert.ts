import { Key } from 'rc-tree/lib/interface';
import { TreeNodeNormal } from 'antd/lib/tree/Tree';

export interface MyString {
    value: string;
}

export default class ConvertUtils {
    static treeKeyToUndefinedNumber(selectedKeys: Key[]): number | undefined {
        return (selectedKeys.length === 0) ? (undefined) : (Number.parseInt(selectedKeys[0].toString().substring(1)))
    }
    static undefinedNumberToTreeKey(num?: number): Key[] {
        return (num === undefined) ? ([]) : (["t" + num.toString()])
    }
    /**
     * 寻找从根节点到子节点的路径
     * @param root 根节点
     * @param output 引用参数
     * @param wordSourceId 子节点
     */
    static getPathToSun(root: TreeNodeNormal, output: MyString, wordSourceId?: string): boolean {
        //找到子节点
        if (Number.parseInt(root.key.toString().substring(1)) === Number.parseInt((wordSourceId === undefined) ? ('-1') : (wordSourceId.substring(1)))) {
            output.value = root.title + '->' + output.value;
            return true;
        }
        //没有子节点
        if (root.children?.length === 0) {
            return false;
        }
        //遍历子节点
        else {
            for (let i = 0; i < ((root.children?.length === undefined) ? (0) : (root.children?.length)); i++) {
                const und = ((root.children === undefined) ? (undefined) : (root.children[i]));
                if (und !== undefined) {
                    if (ConvertUtils.getPathToSun(und, output, wordSourceId)) {
                        output.value = root.title + '->' + output.value;
                        return true;
                    }
                }
            }
            return false;
        }
    }
    static getParentId(root: TreeNodeNormal, output: MyString, wordSourceId?: string): boolean {
        //找到子节点
        for (let i = 0; i < ((root.children?.length === undefined) ? (0) : (root.children?.length)); i++) {
            if (root.children !== undefined) {
                if (Number.parseInt(root.children[i].key.toString().substring(1)) === Number.parseInt((wordSourceId === undefined) ? ('-1') : (wordSourceId.substring(1)))) {
                    output.value = root.key.toString();
                    return true;
                }
            }
        }
        //没有子节点
        if (root.children?.length === 0) {
            return false;
        }
        //遍历子节点
        else {
            for (let i = 0; i < ((root.children?.length === undefined) ? (0) : (root.children?.length)); i++) {
                const und = ((root.children === undefined) ? (undefined) : (root.children[i]));
                if (und !== undefined) {
                    if (ConvertUtils.getParentId(und, output, wordSourceId)) {
                        return true;
                    }
                }
            }
            return false;
        }
    }
}
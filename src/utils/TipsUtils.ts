import { Modal } from "antd";

const { confirm } = Modal;

export default class TipsUtils {
    /**
     * 未定值检查
     * @param check 要检查的参数
     * @param fun 检查之后做啥
     * @param param 检查之后做啥的参数
     * @param alertMessage 报警信息
     */
    static checkUndefined(check: any, fun: (param: any) => void, param: any, alertMessage: string = "参数错误") {
        if (check === undefined) {
            confirm({
                title: '警告',
                content: alertMessage
            });
        }
        else {
            fun(param);
        }
    }
}
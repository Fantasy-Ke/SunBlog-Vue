import {ElMessageBox, ElMessage} from 'element-plus'
import { defineComponent } from 'vue';

const messageComponent = defineComponent( {
    methods: {
         /**
         * 消息提示
         * @param msg 提示信息
         * @param type 消息类型
         */
        messages(msg, type){
            ElMessage({
                showClose: true,
                message: msg,
                type: type
            });
        },
        /**
         * 成功提示
         * @param msg 提示信息
         */
        success(msg){
            this.messages(msg, 'success');
        },
        /**
         * 消息提示
         * @param msg 提示信息
         */
        info(msg){
            this.messages(msg, 'info');
        },
        /**
         * 错误提示
         * @param msg 提示信息
         */
        error (msg) {
            this.messages(msg, 'error');
        },

        /**
         * 警告提示
         * @param msg 提示信息
         */
        warning(msg) {
            this.messages(msg, 'warning');
        },

        /**
         * alert提示框
         * @param title 标题
         * @param msg 信息
         * @param ok ok函数
         * @param okText ok按钮文字
         */
        elalertmsg(title, msg, ok, okText) {
            if (!title) {
                title = '提示';
            }
            if (!msg) {
                msg = '错误';
            }
            if (!okText) {
                okText = '确定';
            }
            ElMessageBox.alert(msg, title, {
                confirmButtonText: okText,
            }).then(ok ? ok : () => {});
        },

        /**
         * confirm 提示框
         * @param title 标题
         * @param msg 信息
         * @param ok ok函数
         * @param okText ok按钮文字
         * @param cancel 取消函数
         * @param cText cancel按钮文字
         */
        elconfirmmsg(title, msg, ok, okText, cancel, cText){
            ElMessageBox.confirm(msg, title ? title:'提示', {
                confirmButtonText: okText ? okText:'确定',
                cancelButtonText: cText ? cText:'取消',
            }).then(ok ? ok : () => {}).catch(cancel ? cancel : () => {});
        }
    }
});

export default messageComponent;

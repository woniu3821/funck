<template>
<div>
<Index></Index>
    <el-upload
        class="avatar-uploader"
        name="img"
        :action="serverUrl"
        :data={uid:useruid}
        :show-file-list="false"
        :on-success="uploadSuccess"
        :on-error="uploadError"
        :before-upload="beforeUpload">
    </el-upload>
    <el-row v-loading="uillUpdateImg">
    <quill-editor
        v-model="detailContent"
        ref="myQuillEditor"
        :options="editorOption"
        @change="onEditorChange($event)"
        @ready="onEditorReady($event)"
    >
    </quill-editor>
    </el-row>
    <el-row type="flex" justify="end">
        <el-button class="subContentclass" :loading="loading" @click.native="subContent" type="primary">提交</el-button>
    </el-row>
</div>
</template>
<style>
.avatar-uploader{
    height:0;
    overflow:hidden;
}
.subContentclass{
    margin-top:15px;
    margin-right:5%;
}
.ql-tooltip.ql-editing{
    left: 50%!important;
    transform: translateX(-50%);
}
.ql-toolbar.ql-snow{
    border-top:0;
    border-left:0;
    border-right:0;
}
.ql-toolbar.ql-snow + .ql-container.ql-snow{
    min-height:350px;
}
</style>
<script>
import { mapActions,mapState } from "vuex"
import toolbarOptions from "../../util/quill.editor.config.js"
import Index from "./index"
export default {
  components: {
   Index
  },
  data() {
    return {
        id:"",
        loading:false,
        uillUpdateImg: false, // 根据图片上传状态来确定是否显示loading动画，刚开始是false,不显示
        serverUrl: '/logupload',  // 这里写你要上传的图片服务器地址
        detailContent: '', // 富文本内容
        editorOption: {
            placeholder: '请在此输入内容...',
            theme: 'snow',  // or 'bubble'
            modules: {
                toolbar: {
                    container: toolbarOptions,  // 工具栏
                    handlers: {
                        'image': function (value) {
                            if (value) {
                                document.querySelector('.avatar-uploader input').click()
                            } else {
                                this.quill.format('image', false);
                            }
                        }
                    }
                }
        }  // 富文本编辑器配置
    }
  }
  },
  methods:{
    onEditorChange(editor) {
      this.detailContent=editor.html;
    },
    onEditorReady(editor) {
        let fromData = this.$route.params //路由传参传回修改任务的数据
        if (fromData) {
            this.id=fromData.ID;
            this.detailContent=fromData.content;
        }
    },       // 上传图片前
    beforeUpload(file) {
        this.quillUpdateImg = true
        const isJPG = (file.type === 'image/jpeg'||file.type ==='image/png')
        const isLt500 = file.size / 1024 <= 500;
        if (!isJPG) {
          this.$message.error('图片只能是 JPG/PNG 格式!');
        }
        if (!isLt500) {
          this.$message.error('图片大小不能超过 500KB!');
        }
        return isJPG && isLt500;
    },
    // 上传图片成功
    uploadSuccess(res, file) {
        // res为图片服务器返回的数据
        // 获取富文本组件实例
        let quill = this.$refs.myQuillEditor.quill
        // 如果上传成功
        if (file.status === 'success' && file.response !== null) {
            // 获取光标所在位置
            let length = quill.getSelection().index;
            // 插入图片 
            quill.insertEmbed(length, 'image', `${file.response.destination.replace(/static/,"")}/${file.response.filename}`)
            // 调整光标到最后
            quill.setSelection(length + 1)
        } else {
            this.$message.error('图片插入失败')
        }
        // loading动画消失
        this.quillUpdateImg = false

    },
    // 上传图片失败
    uploadError(res, file) {
                // loading动画消失
        this.quillUpdateImg = false
        this.$message.error('图片插入失败')
    },
    subContent(){
        let data={
            id:this.id,
            content:this.detailContent
        }
        if(this.detailContent){
            this.loading=true;
            this.subDaily(data).then(_=>{
                this.loading=false;
                this.detailContent="";
                this.id="";
            })
        }else{
            this.$message.warning('您还没输入内容')
        }
    },
    ...mapActions(['subDaily'])
  },
    computed: {
    editor() {
      return this.$refs.myTextEditor.quillEditor
    },
    ...mapState({
      useruid: state => state.user.uid
    })
  },
  mounted() {

  },

};
</script>
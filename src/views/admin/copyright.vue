<template>
    
    <!-- el-table显示数据,分页 -->
    
    <div class="copyright">
        <div class="copyright-tools">
            <el-button type="warning" @click="toAdd">添加</el-button>
            <el-input v-model="keyword" placeholder="请输入关键字" style="width: 200px;"></el-input>
            <el-button type="primary" @click="search">搜索</el-button>

        </div>
        <el-table :data="copyrights" style="width: auto align=center ">
            <el-table-column fixed prop="id" width="160" />
            <el-table-column prop="name" label="著作权名称" width="120"  />
            <el-table-column prop="userId"  label="著作权人：第一位" width="120" />
            <el-table-column prop="finishTime" label="完成时间" width="120" />
            <el-table-column prop="publishTime"  label="首次发表时间" width="120" />
            <el-table-column prop="attachment"  label="佐证材料" width="120" />
            <el-table-column prop="copyrightNo"  label="著作权编号" width="120">
              <el-table-column fixed="right" label="操作" width="180" >
            <template #default="scope">
              <el-button size="small" @click="handleEdit(scope.row.id)"
                >编辑</el-button
              >
              <el-button
                size="small"
                type="danger"
                @click="handleDelete(scope.row.id)"
                >删除</el-button
              >
            </template>
          </el-table-column>
               
            </el-table-column>
        </el-table>
        <el-pagination layout="prev, pager, next" :page-size="page.size"  :total="page.total" @current-change="currentchange" />
    </div>
    <el-dialog v-model="dialogFormVisible" title="版权添加">
    <el-form :model="copyright">
      <el-form-item label="著作权名称" :label-width="formLabelWidth">
        <el-input v-model="copyright.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="著作权人：第一位" :label-width="formLabelWidth">
        <el-input v-model="copyright.userId" autocomplete="off" />
      </el-form-item>
      <el-form-item label="完成时间" :label-width="formLabelWidth">
        <el-input v-model="copyright.finishTime" autocomplete="off" />
      </el-form-item>
      <el-form-item label="首次发表时间" :label-width="formLabelWidth">
        <el-input v-model="copyright.publishTim" autocomplete="off" />
      </el-form-item>
      <el-form-item label="著作权编号" :label-width="formLabelWidth">
        <el-input v-model="copyright.attachment" autocomplete="off" />
      </el-form-item>
      <el-form-item label="佐证材料" :label-width="formLabelWidth">
        <el-input v-model="copyright.copyrightNo" autocomplete="off" />
      </el-form-item>
      
        </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="save">保存
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { defineComponent } from 'vue';
import { copyrightPage,copyrightDelId,copyrightAdd,copyrightEdit } from '../../http';
import { cloneDeep } from 'lodash-es';
import { ElMessage } from 'element-plus';
export default defineComponent({
    data(){
        return{
            copyrights:[],
            page:{
                total:0,
                current:1,
                size:10
            },
            dialogFormVisible:false,
            copyright:{
                "attachment": "",
                "copyrightNo": "",
                "finishTime": "",
                "id": 0,
                "name": "",
                "publishTime": "",
                "userId": 0
            },
            formLabelWidth:80
        }
    },
    Getone(id) {
      this.apiList = [],
        api.getOneData(id)
          .then(response => {
            console.log("搜索成功！");
            ElMessage.success('搜索成功！');
            const copyrights = response.data.backendApi;
            this.apiList.push(copyrights);
          })
          .catch(error => {
            ElMessage.error('搜索失败！');
            console.log("搜索失败！");
          });
    },
    mounted(){
        this.getcopyrightsPage(1)
    },
    methods:{
        toEdit(copyright){
            console.log(copyright)
            this.dialogFormVisible=true;
            this.copyright=cloneDeep(copyright);
        },
        getcopyrightsPage(current){
            const data={
                current:current,
                size:10
            }

            copyrightPage(data).then(res=>{
                console.log(res);
                const page=res.data.page;
                this.copyrights=page.records;
                this.page=page;
            }).catch(err=>{
                console.log(err);
            })
        },
        currentchange(current){
            // console.log(current);
            this.getcopyrightsPage(current);
            this.page.current=current;//数据更新到目前显示的页面
        },
        del(id){
            console.log(id);
            this.dialogVisible=false;
            const params = {
                id:id
        }
         copyrightDelId(params).then(res=>{
            if(res.success){
                this.getcopyrightsPage(this.page.current)
            }else{
                console.log(res.msg);
                return false
            }
            }).catch(err=>{
                
            })
        },
        toAdd(){
            this.dialogFormVisible=true;
            this.copyright={
                "attachment": "",
                "copyrightNo": "",
                "finishTime": "",
                "id": 0,
                "name": "",
                "publishTime": "",
                "userId": 0
            }
        },
        save(){
            const copyright=this.copyright
            if (copyright.id==0) {
                copyrightAdd(copyright).then(res=>{
            if (res.success) {
                this.dialogFormVisible=false
                this.getcopyrightsPage(this.page.current)
                ElMessage(res.msg)
            }else{
                ElMessage(res.msg)
                return false
            }
        }).catch(err=>{
            ElMessage('网络错误联系管理员')
        })
            }
            else{
                copyrightEdit(copyright).then(res=>{
            if (res.success) {
                this.dialogFormVisible=false
                this.getcopyrightsPage(this.page.current)
                ElMessage(res.msg)
            }else{
                ElMessage(res.msg)
                return false    
            }

            }).catch(err=>{
                ElMessage('网络错误联系管理员')
            })
            }
        }
    }
});
</script>~
<style lang = "scss" scoped></style>
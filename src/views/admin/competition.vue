<template>
    <div class="competitiones">
       <div class="com-tools">
           <el-button type="primary" @click="toAdd ">添加</el-button>  
           <el-input v-model="ids" style="width: 70px; margin-left: 10px;" ></el-input>
           <el-button type="primary" @click="souos(this.ids)" style=" margin-left: 10px;">搜索</el-button>
       </div>
       <el-table :data="competitiones" style="width: 100%" v-if="one">
           <el-table-column fixed prop="id" label="序号" width="50" />
           <el-table-column prop="name" label="竞赛名称" width="120"  />
           <el-table-column prop="homePage" label="竞赛官网" width="120" />
           <el-table-column prop="type" label="竞赛类型" width="120" />
           <el-table-column prop="level" label="竞赛等级" width="120" />
           <el-table-column prop="schoolId" label="学校" width="120" />
           <el-table-column prop="organizer" label="主办单位" width="120" />
           <el-table-column prop="start" label="开始时间" width="120" />
           <el-table-column prop="end" label="结束时间" width="120" />
           <el-table-column fixed="right" label="操作" width="120">
               <template #default="scope">
                   <el-button link type="primary" size="small" @click="toEdit(scope.row)">更新</el-button>
                   <el-button link type="primary" size="small" @click="dialogVisible = true">
                       删除
                   </el-button>
                   <el-dialog v-model="dialogVisible" title="提示框" width="30%">
                       <el-button link type="primary" size="small">确定删除吗？</el-button>
                       <template #footer>
                           <el-button link type="primary" size="small" @click="dialogVisible = false">取消</el-button>
                           <el-button link type="primary" size="small" @click="del(scope.row.id)">
                               删除
                           </el-button>
                       </template>
                   </el-dialog>
               </template>
           </el-table-column>
       </el-table>
       <el-table :data="competitionesqu" style="width: 100%" v-if="two">
           <el-table-column fixed prop="id" label="序号" width="50" />
           <el-table-column prop="name" label="竞赛名称" width="120"  />
           <el-table-column prop="homePage" label="竞赛官网" width="120" />
           <el-table-column prop="type" label="竞赛类型" width="120" />
           <el-table-column prop="level" label="竞赛等级" width="120" />
           <el-table-column prop="schoolId" label="学校" width="120" />
           <el-table-column prop="organizer" label="主办单位" width="120" />
           <el-table-column prop="start" label="开始时间" width="120" />
           <el-table-column prop="end" label="结束时间" width="120" />
           <el-table-column fixed="right" label="操作" width="120">
               <template #default="scope">
                   <el-button link type="primary" size="small" @click="toEdit(scope.row)">更新</el-button>
                   <el-button link type="primary" size="small" @click="dialogVisible = true">
                       删除
                   </el-button>
                   <el-dialog v-model="dialogVisible" title="提示框" width="30%">
                       <el-button link type="primary" size="small">确定删除吗？</el-button>
                       <template #footer>
                           <el-button link type="primary" size="small" @click="dialogVisible = false">取消</el-button>
                           <el-button link type="primary" size="small" @click="del(scope.row.id)">
                               删除
                           </el-button>
                       </template>
                   </el-dialog>
               </template>
           </el-table-column>
       </el-table>
       <el-pagination layout="prev, pager, next" :page-size="page.size" :total="page.total"
           @current-change="currentchange" />
   </div>
   <el-dialog v-model="dialogFormVisible" title="竞赛编辑">
       <el-form :model="competition">
           <el-form-item label="竞赛名称" :label-width="formLabelWidth">
               <el-input v-model="competition.name" autocomplete="off" />
           </el-form-item>
           <el-form-item label="竞赛官网" :label-width="formLabelWidth">
               <el-input v-model="competition.homePage" autocomplete="off" />
           </el-form-item>
           <el-form-item label="竞赛类型" :label-width="formLabelWidth">
               <el-input v-model="competition.type" autocomplete="off" />
           </el-form-item>
           <el-form-item label="竞赛等级" :label-width="formLabelWidth">
               <el-input v-model="competition.level" autocomplete="off" />
           </el-form-item>
           <el-form-item label="学校" :label-width="formLabelWidth">
               <el-input v-model="competition.schoolId" autocomplete="off" />
           </el-form-item>
           <el-form-item label="主办单位" :label-width="formLabelWidth">
               <el-input v-model="competition.organizer" autocomplete="off" />
           </el-form-item>
           <el-form-item label="开始时间" :label-width="formLabelWidth">
               <el-input v-model="competition.start" autocomplete="off" />
           </el-form-item>
           <el-form-item label="结束时间" :label-width="formLabelWidth">
               <el-input v-model="competition.end" autocomplete="off" />
           </el-form-item>
       </el-form>
       <template #footer>
           <span class="dialog-footer">
               <el-button @click="dialogFormVisible = false">取消</el-button>
               <el-button type="primary" @click="save">
                   保存
               </el-button>
           </span>
       </template>
   </el-dialog>
</template>

<script>
import { defineComponent } from 'vue'
import { competitionPage,competitionAdd,competitionDelId,competitionEdit,competitionOne } from '../../http/competitions'
import { ElMessage } from 'element-plus'
import { cloneDeep } from 'lodash-es'
export default defineComponent({
   data() {
       return {
           one:true,
           two:false,
           ids:"",
           competitiones: [],
           competitionesqu: [],
           page: {
               total:0,
               current: 1,
               schoolId:1,
               size: 10
           },
           dialogFormVisible: false,
           dialogVisible: false,
           competition: {
               "id": 0,
               "name": "",
               "start": "",
               "end": "",
               "homePage": "",
               "type": "",
               "level": "",
               "organizer": "",
               "schoolId": ""
           },
           formLabelWidth:80
       }
   },
   mounted(){
       this.getCompetitionPage(1)
   },
       
   methods: {
       toEdit(Competition) {
           console.log(Competition);
           this.dialogFormVisible = true;
           this.competition = cloneDeep(Competition);
       },
       getCompetitionPage(current){
           const data={
               current: current,
               schoolId:1,
               size: 10
           }

           competitionPage(data).then(res=>{
               console.log(res);
               const page=res.data.page;
               this.competitiones=page.records;
               this.page=page;
           }).catch(err=>{
               console.log(err);
           })
       },
       currentchange(current){
           this.getCompetitionPage(current);
           this.page.current=current;
       },
       //删除
       del(id) {
           console.log(id);
           const params = {
               id: id
           }
           competitionDelId(params).then(res => {
               if (res.success) {
                   this.getCompetitionPage(this.page.current)
                   this.dialogVisible = false;
               }
               else {
                   console.log(res.msg)
                   return false
               }
           }).catch(err => {

           })
       },
       toAdd(){
           this.dialogFormVisible = true;
           this.competition = {
               "id": 0,
               "name": "",
               "start": "",
               "end": "",
               "homePage": "",
               "type": "",
               "level": "",
               "organizer": "",
               "schoolId": ""
           }
       },
       souos(id){
           console.log(id);
           const params = {
               id:id
           }
           competitionOne(params).then(res => {
               if (res.success) {
                   console.log(res);
                   const competitionq=res.data.competition;
                   this.competitionesqu=competitionq.competition;
                   this.one=false;
                   this.two=true;
               }
               else {
                   console.log(res.msg)
                   ElMessage('没有这个编号');
                   this.one=true;
                   this.two=false;
               }
           }).catch(err => {
               ElMessage('没有这个编号');
           })
       },
       save(){
           const Competition = this.competition
           if (Competition.id == 0) {
               competitionAdd(Competition).then(res => {
                   if (res.success) {
                       //刷新页面
                       this.dialogFormVisible = false;
                       this.getCompetitionPage(this.page.current)
                       ElMessage(res.msg)

                   } else {
                       ElMessage(res.msg)
                       return false
                   }
               }).catch(err => {
                   ElMessage('网络错误联系管理员')
               })
           }
           else {
               competitionEdit(Competition).then(res => {
                   if (res.success) {
                       //刷新页面
                       this.dialogFormVisible = false;
                       this.getCompetitionPage(this.page.current)
                       ElMessage(res.msg)
                   } else {
                       ElMessage(res.msg)
                       return false
                   }
               }).catch(err => {
                   ElMessage('网络错误联系管理员')
               })
           }
       
       }
   }
       
       
})
</script>

<style lang="scss" scoped></style>
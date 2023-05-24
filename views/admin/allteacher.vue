<!--  -->
<template>
  <div>
   <el-input v-model="searchText" placeholder="请输入教师id">
    <template #append>
        <el-button circle
                   type="danger"
                   @click="handleSearch(searchText)">
          <el-icon>
            <Search />
          </el-icon>
        </el-button>
      </template>
  </el-input>  
   
   </div>
     <div class="adcate-tools">
            <el-button type="warning" @click="toAdd">添加</el-button>
        </div>
  <div>
    <el-table :data="filteredData" style="width: 100%">
    <el-table-column fixed prop="createTime" label="创建时间"  />
    <el-table-column prop="depart" label="学院"  />
    <el-table-column prop="id" label="id"  />
    <el-table-column prop="professional" label="职称"  /> 
    <el-table-column prop="school" label="学校"  />
    <el-table-column prop="teacherName" label="姓名"  />
    <el-table-column prop="teacherNo" label="工号"  />
    <el-table-column prop="updateTime" label=" 更新时间"  />
    <el-table-column fixed="right" label="操作">
      <template #default="scope">
       <el-button link type="primary" size="small" @click="toEdit(scope.row)"
          >更新</el-button>
        <el-button link type="primary" size="small"  @click="todel(scope.row.id)">删除</el-button>

      </template>
    </el-table-column>
  </el-table>
    <el-pagination
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="allteacher.length"
      
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange">
    </el-pagination>
  
  </div>
  <el-dialog v-model="dialogVisibles" title="删除" width="30%" >
 <span>是否确定删除？</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisibles = false">取消</el-button>
        <el-button type="primary" @click="del(ID)">
          确定
        </el-button>
      </span>
    </template>
</el-dialog>
<el-dialog v-model="dialogVisible"  title="教师信息添加" >
        <el-form :model="teacher">
            <el-form-item label="创建时间" :label-width="formLabelWidth" >
                <el-input v-model="teacher.createTime" autocomplete="off" />
            </el-form-item>
            <el-form-item label="学院" :label-width="formLabelWidth" >
                <el-input v-model="teacher.depart" autocomplete="off" />
            </el-form-item>
            <el-form-item label="id" :label-width="formLabelWidth" >
                <el-input v-model="teacher.id" autocomplete="off" />
            </el-form-item>
            <el-form-item label="职称" :label-width="formLabelWidth" >
                <el-input v-model="teacher.professional" autocomplete="off" />
            </el-form-item>
            <el-form-item label="学校" :label-width="formLabelWidth" >
                <el-input v-model="teacher.school" autocomplete="off" />
            </el-form-item>
            <el-form-item label="姓名" :label-width="formLabelWidth" >
                <el-input v-model="teacher.teacherName" autocomplete="off" />
            </el-form-item>
            <el-form-item label="工号" :label-width="formLabelWidth" >
                <el-input v-model="teacher.teacherNo" autocomplete="off" />
            </el-form-item>
            <el-form-item label="更新时间" :label-width="formLabelWidth" >
                <el-input v-model="teacher.updateTime" autocomplete="off" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="save">
                    保存
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>
<script>
import { defineComponent } from "vue"
import { allteacherpage,teacherdel,addteacher,editteacher,teacherone} from "../../http/teacher"
import {cloneDeep} from 'lodash-es'
export default defineComponent({
    data(){
    return {
       allteacher: [],
       currentPage: 1,
       pageSize: 5,
        dialogVisible: false,
        dialogVisibles: false,
        ID:"",
       teacher: {
                "createTime": "",
                "depart": "",
                "id": 0,//标志点 0添加 >0 更新
                "professional": "",
                "school": "",
                "teacherName": "",
                "teacherNo": "",
                "updateTime": "",

            },
            formLabelWidth: 80,
            flag: true,
            searchText: ''  ,
         
    }
  },
  mounted(){
    this.getallteacherpage()
  },
  computed: {
    startIndex() {
      return (this.currentPage - 1) * this.pageSize;
    },
    endIndex() {
      return this.currentPage * this.pageSize;
    },
    filteredData(){
      // if (this.searchText) {
      //   return this.allteacher.filter(item => {
      //     return String(item.id).includes(String(this.searchText));
      //   });
      // } 
      if (this.searchText) {
        // 使用 Array.prototype.filter() 方法过滤数据
        return this.allteacher.filter(item => {
          item.id == this.searchText
          return item.id == this.searchText;
         
        });
    

      }
      else {
        // 如果搜索条件为空，返回原始数据源
      return this.allteacher.slice((this.currentPage-1)*this.pageSize, this.currentPage*this.pageSize)
      }
      
    },
  
},
  methods: {
    handleSearch (id) {
      const params = {
                id: id
            }
      teacherone(params).then(res => {
        ElMessage(res.msg)
            // const all=res.data.teacher
            // this.allteacher.push(all);
            console.log(res)
          })
          .catch(err => {
            ElMessage(res.msg)
            console.log(err)
          });
    },
    handleSizeChange(val) {
      // 每页显示数改变时执行的方法
      this.pageSize = val;
      
      // 修改当前页码，重新渲染表格数据
      this.currentPage = 1;
    },

    handleCurrentChange(val) {
      // 当前页码改变时执行的方法
      this.currentPage = val;
    },
    toEdit(teacher){
      // console.log(teacher)
      this.dialogVisible=true;
      this.flag=false;
      this.teacher=cloneDeep(teacher); 
    },
    todel(id){
      console.log(id)
      this.dialogVisibles = true;
      const pd=id
      this.ID=pd
    },
    del(id){
    const params = {
                id: id
            }
            teacherdel(params).then(res => {
                if (res.success) {
                  this.dialogVisibles=false;
                  ElMessage(res.msg)
                  this.$router.go(0);
                  console.log("删除成功！")

                }
                else {
                  ElMessage(res.msg)
                    console.log(res.msg)
                    return false
                }


            }).catch(err => {

            })
          },
    toAdd() {
            //到添加的页面
            this.dialogVisible = true;
            this.teacher= {
                "createTime": "",
                "depart": "",
                "id": 0,//标志点 0添加 >0 更新
                "professional": "",
                "school": "",
                "teacherName": "",
                "teacherNo": "",
                "updateTime": "",

            }
            this.flag=true;
        },
    save() {
            const teacher = this.teacher;  
            if (this.flag) {
              // this.createTime= `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
              addteacher(teacher).then(res => {
                    if (res.success) {
                        this.dialogVisible = false;
                        this.$router.go(0);
                        ElMessage(res.msg)
                    }
                    else {
                        ElMessage(res.msg)
                        console.log(res)
                        return false
                    }
                }).catch(err => {
                    ElMessage('网络错误联系管理员')
                })
            }else{
                editteacher(teacher).then(res => {
                    if (res.success) {
                        this.dialogVisible = false;  
                        this.$router.go(0);
                        ElMessage(res.msg)
                    }
                    else {
                        ElMessage(res.msg)
                        console.log(res)
                        return false
                    }
                }).catch(err => {
                    ElMessage('网络错误联系管理员')
                })
            }

        },
    getallteacherpage(){
    //    const data={
    //     currentPage:1,
    //     size:5
    //    }
    //    allteacherpage(data).then(res=>{
    //     console.log(res);
    //     this.allteacher=res.data.teachers;
    //     this.page = page;
    //    }).catch(err=>{
    //      console.log(err);
    //    })
    // }
    allteacherpage().then(res=>{
        console.log(res);
        this.allteacher=res.data.teachers;
       }).catch(err=>{
         console.log(err);
       })
    }

  }
  });
</script>
<style lang='scss' scoped>
.round-btn {
  border-radius: 50%;
  padding-left: 14px;
  padding-right: 14px;
}
</style>
<template>
    <div class="">
      <el-button type="primary" @click="toAdd">添加</el-button>
      <el-input
        v-model="serch.city"
        placeholder="请输入城市"
        clearable
        style="width: 120px"
      ></el-input>
      <el-input
        v-model="serch.county"
        placeholder="请输入县区"
        clearable
        style="width: 120px"
      ></el-input>
      <el-input
        v-model="serch.province"
        placeholder="请输入省份"
        clearable
        style="width: 120px">
      </el-input>
      
      <el-button type="primary" @click="selectById">搜索</el-button>
      <el-button type="primary" @click="reset">重置</el-button>
      
  
      <div class="table">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column
            fixed
            prop="id"
            label="编号"
            width="150"
            align="center"
          />
          <el-table-column
            prop="province"
            label="省份"
            width="210"
            align="center"
          />
          <el-table-column
            prop="city"
            label="城市"
            width="120"
            align="center"
          />
          <el-table-column
            prop="area"
            label="区县"
            width="120"
            align="center"
          />
          <el-table-column
            prop="schoolName"
            label="学校名称"
            width="120"
            align="center"
          />
          <el-table-column
            prop="address"
            label="学校地址 "
            width="120"
            align="center"
          />
          <el-table-column
            prop="createTime"
            label="创建时间"
            width="250"
            align="center"
          />
          <el-table-column
            prop="updateTime"
            label="更新时间"
            width="250"
            align="center"
          />
          <el-table-column fixed="right" label="操作" width="180" align="center">
            
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
          
        </el-table>
      </div>
      <el-input
        v-model="serch.schoolName"
        placeholder="请输入学校名称"
        clearable
        style="width: 120px">
      </el-input>
      <el-button type="primary" @click="selectById">校验学校名称</el-button>
  
  
  
      <el-dialog v-model="dialogFormVisible" title="添加/编辑">
        <el-form :model="school">
          <el-form-item label="省份" :label-width="formLabelWidth">
            <el-input v-model="school.province" autocomplete="off" />
          </el-form-item>
          <el-form-item label="城市" :label-width="formLabelWidth">
            <el-input v-model="school.city" autocomplete="off" />
          </el-form-item>
          <el-form-item label="地区" :label-width="formLabelWidth">
            <el-input v-model="school.area" autocomplete="off" />
          </el-form-item>
          <el-form-item label="学校名称" :label-width="formLabelWidth">
            <el-input v-model="school.schoolName" autocomplete="off" />
          </el-form-item>
          
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取消</el-button>
            <el-button type="primary" @click="excute()"> 确定 </el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </template>
    
    <script>
  import subject from "../../http/subject";
  import { defineComponent } from "vue";
  
  export default defineComponent({
    data() {
      return {
        tableData: [],
  
        serch: {
           city: "",
           county: "",
           province: ""
        },
        
        school: {},
        dialogFormVisible: false,
      };
    },
    methods: {
      selectAll() {
        subject.getSubjectByPage().then((res) => {
          console.log(res);
          this.tableData = res.data.schools;
        });
      },
  
      handleDelete(id) {
  
        const data = { id };
        ElMessageBox.confirm("你确定删除该行数据吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            subject.deleteById(data).then((res) => {
              console.log(res);
              if (res.success) {
                ElMessage({
                  type: "success",
                  message: "删除成功",
                });
  
                this.selectAll();
              } else {
                ElMessage({
                  type: "error",
                  message: "删除失败",
                });
              }
            });
          })
          .catch(() => {
            ElMessage({
              type: "warning",
              message: "取消删除",
            });
          });
      },
  
      handleEdit(id) {
        this.dialogFormVisible = true;
        const data = { id };
        subject.queryById(data).then((res) => {
          console.log(res);
          this.school = res.data.school;
          
        });
      },
      toAdd() {
        this.school = {};
        this.dialogFormVisible = true;
      },
  
      excute() {
        if (this.school.id != undefined) {
  
          subject.updateById(this.school).then((res) => {
            if (res.success) {
              ElMessage({
                type: "success",
                message: "编辑成功",
              });
              this.selectAll();
            } else {
              ElMessage({
                type: "error",
                message: "编辑失败",
              });
            }
          });
  
          this.dialogFormVisible = false;
        } else {
  
          subject.addOne(this.school).then((res) => {
            console.log(res);
            if (res.success) {
              ElMessage({
                type: "success",
                message: "添加成功",
              });
              //刷新页面
              this.selectAll();
            } else {
              ElMessage({
                type: "error",
                message: "添加失败",
              });
            }
            this.dialogFormVisible = false;
          });
        }
      },
     
      selectById() {
        if(this.serch.city && this.serch.province && this.serch.county){
        
          subject.getSchoolsByRegion(this.serch).then((res)=>{
            console.log(res);
            this.tableData = res.data.schools;
          })
        }else{
          subject.getSchoolsByName(this.serch).then((res)=>{
            console.log(res);
            ElMessage({
                type: "success",
                message: "校验成功",
            });
            this.serch={};
          })
        }
      },
      reset() {
        this.serch = {};
        this.selectAll();
      },
    },
    mounted() {
      this.selectAll();
    },
  });
  </script>
    
    <style lang="scss" scoped>
  .table {
    margin-top: 10px;
  }
  </style>
    
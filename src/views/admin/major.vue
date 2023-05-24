<template>
    <div>
      <el-input
        v-model="searchText"
        placeholder="请输入搜索关键字"
        clearable
        @clear="clearSearch"
        @keyup.enter="performSearch"
        style="width: 300px"
      >
        <template #append>
          <el-button circle type="danger" @click="Getone(this.searchText)">
            <el-icon>
              <Search />
            </el-icon>
          </el-button>
        </template>
      </el-input>
      <el-button type="primary" @click="addAPI"> 新增 </el-button>
    </div>
    <div>
      <el-table
        :data="paginatedData"
        :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
      >
        <el-table-column prop="majorName" label="专业名称"></el-table-column>
        <el-table-column prop="majorDesc" label="专业描述"></el-table-column>
        <el-table-column prop="schoolId" label="学校名称">
          <template #default="{ row }">
            <span>{{ schoolIds(row) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="departId" label="学院名称">
          <template #default="{ row }">
            <span>{{ departIds(row) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="100px">
          <template #default="{ row }">
            <el-button type="primary" @click="editedAPI(row)"> 编辑 </el-button>
            <el-button type="primary" @click="majorDelete(row)"> 删除 </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="currentPage"
        :page-size="pageSize"
        :total="filteredApiList.length"
        @current-change="handlePageChange"
      >
      </el-pagination>
  
      <el-dialog v-model="editDialogVisible" :title="title" center width="50%">
        <el-form :model="form">
          <el-form-item label="专业名称">
            <el-input v-model="form.majorName"></el-input>
          </el-form-item>
          <el-form-item label="专业描述">
            <el-input v-model="form.majorDesc"></el-input>
          </el-form-item>
          <el-form-item label="学校名称">
            <el-select
              v-model="form.schoolId"
              @change="getMajorsForSelectBySchoolId"
            >
              <el-option
                v-for="(item, index) in schools"
                :key="index"
                :label="item.schoolName"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="学院名称">
            <el-select v-model="form.departId">
              <el-option
                v-for="(item, index) in departments"
                :key="index"
                :label="item.departName"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="Cancel">取消</el-button>
            <el-button type="primary" @click="Save"> 保存 </el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </template>
  
  <script>
  import { ElMessageBox, ElMessage } from "element-plus";
  import api from "@/http/major";
  
  export default {
    created() {
      this.init();
      this.school();
      this.department();
    },
    computed: {
      paginatedData() {
        const startIndex = (this.currentPage - 1) * this.pageSize;
        const endIndex = startIndex + this.pageSize;
        console.log(this.apiList);
        return this.filteredApiList.slice(startIndex, endIndex);
      },
      filteredApiList() {
        if (this.searchText && this.apiList) {
          // 使用 Array.prototype.filter() 方法过滤数据
          return this.apiList.filter((item) => {
            return item.majorName == this.searchText;
          });
        } else {
          // 如果搜索条件为空，返回原始数据源
          return this.apiList;
        }
      },
      schoolIds() {
        return (row) => {
          let str = "";
          let obj = this.schools.filter((item) => item.id == row.schoolId)[0];
          if (obj) {
            str = obj.schoolName;
          }
          return str;
        };
      },
      departIds() {
        return (row) => {
          let str = "";
          let obj = this.departments.filter((item) => item.id == row.departId)[0];
          if (obj) {
            str = obj.departName;
          }
          return str;
        };
      },
    },
    // watch: {
    //   "form.schoolId"(val) {
    //     this.getMajorsForSelectBySchoolId(val);
    //   },
    // },
    data() {
      return {
        title: "新增",
        editDialogVisible: false, //修改弹窗显示
        currentPage: 1, // 当前页码
        pageSize: 10, // 每页显示的数据条数
        searchText: "", // 搜索关键字
        apiList: [], // 原始数据列表
        form: {
          createTime: "",
          deleted: 0,
          departId: "",
          id: "",
          majorDesc: "",
          majorName: "",
          schoolId: "",
          updateTime: "",
        },
        schools: [], //学校
        departments: [], //学院
        tableDepartments: [],
      };
    },
    methods: {
      handlePageChange(currentPage) {
        this.currentPage = currentPage;
      },
      // async getMajorsForSelectBySchoolId(val) {
      //   let res = await api.getMajorsForSelectBySchoolId({ schoolId: val });
      //   if (res.code == 1) {
      //     this.departments = res.data.majors;
      //   } else {
      //     this.departments = [];
      //   }
      // },
      async init() {
        let { data } = await api.getMajor();
        this.apiList = data.majors;
      },
      async school() {
        let { data } = await api.school();
        this.schools = data.schools;
      },
      async department() {
        let { data } = await api.department();
        this.departments = data.departments;
      },
      addAPI() {
        this.title = "新增";
        this.clearForm();
        this.editDialogVisible = true;
      },
      editedAPI(item) {
        this.title = "编辑";
        this.form = JSON.parse(JSON.stringify(item));
        this.editDialogVisible = true;
      },
      async Save() {
        if (this.form.id) {
          let res = await api.majorEdit(this.form);
          if (res.code == 1) {
            ElMessage.success("操作成功！");
            this.clearForm();
            this.editDialogVisible = false;
          } else {
            ElMessage.error(res.msg);
          }
        } else {
          let res = await api.majorAdd(this.form);
          if (res.code == 1) {
            ElMessage.success("操作成功！");
            this.clearForm();
            this.editDialogVisible = false;
          } else {
            ElMessage.error(res.msg);
          }
        }
        this.init();
      },
      async majorDelete(row) {
        let res = await api.majorDelete({ id: row.id });
        if (res.code == 1) {
          ElMessage.success("操作成功！");
          this.init();
        } else {
          ElMessage.error(res.msg);
        }
      },
      clearForm() {
        this.form = {
          createTime: "",
          deleted: 0,
          departId: "",
          id: "",
          majorDesc: "",
          majorName: "",
          schoolId: "",
          updateTime: "",
        };
      },
    },
  };
  </script>
  <style>
  body {
    margin: 0;
    padding: 0;
    background-image: url("@/imgs/keli.png");
    background-size: cover;
    opacity: 0.9 !important; /* 使用 !important 提高优先级 */
    background-repeat: no-repeat;
  }
  </style>
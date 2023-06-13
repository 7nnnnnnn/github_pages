<template>
  <div style="display: flex; justify-content: space-between">
    <el-input
      v-model="searchText"
      placeholder="请输入搜索关键字"
      clearable
      @clear="clearSearch"
      @keyup.enter="performSearch"
      style="width: 300px"
    >
    </el-input>
    <el-button style="margin-right: 50px" type="primary" @click="$router.go(-1)"
      >返回</el-button
    >
  </div>

  <div class="competitiones">
    <el-table :data="paginatedData" style="width: 100%" v-if="one">
      <el-table-column prop="title" label="竞赛名称" />
      <el-table-column prop="schoolName" label="学校" />
      <el-table-column prop="name" label="竞赛负责人" />
      <el-table-column prop="status" label="状态" />
      <el-table-column fixed="right" label="操作" width="120">
        <template #default="scope">
          <el-button
            link
            type="primary"
            size="small"
            @click="application(scope.row)"
            >审核</el-button
          >
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
  </div>
  <el-dialog v-model="dialogFormVisible" title="报名信息">
    <el-form :model="competition">
      <el-form-item label="审核" :label-width="formLabelWidth">
        <el-select v-model="competition.studentName">
          <el-option label="通过" value="通过"></el-option>
          <el-option label="驳回" value="驳回"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="save"> 保存 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { ElMessage } from "element-plus";
import { cloneDeep } from "lodash-es";
import api from "@/http/competition.js";
import {
  getallinfo,
  studentAdd,
  studentEdit,
  studentdel,
  getStudentsByNo,
  getall,
  getwant,
} from "@/http/student.js";
export default {
  data() {
    return {
      one: true,
      two: false,
      ids: "",
      levels: [
        {
          label: "国际级",
          value: "国际级",
        },
        {
          label: "国家级",
          value: "国家级",
        },
        {
          label: "省级",
          value: "省级",
        },
        {
          label: "市级",
          value: "市级",
        },
        {
          label: "校级",
          value: "校级",
        },
        {
          label: "院级",
          value: "院级",
        },
      ],
      competitiones: [],
      competitionesqu: [],
      page: {
        total: 0,
        current: 1,
        schoolId: 1,
        size: 10,
      },
      dialogFormVisible: false,
      dialogVisible: false,
      competition: {
        studentName: "",
      },
      formLabelWidth: 110,
      currentPage: 1, // 当前页码
      pageSize: 6, // 每页显示的数据条数
      searchText: "", // 搜索关键字
      apiList: [], // 原始数据列表
      schools: [],
      all: [],
      row: {},
      student: [],
    };
  },
  created() {
    this.getCompetitionPage(1);
    // this.getAll();
  },
  mounted() {},
  computed: {
    paginatedData() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.filteredApiList.slice(startIndex, endIndex);
    },
    filteredApiList() {
      if (this.searchText && this.apiList) {
        // 使用 Array.prototype.filter() 方法过滤数据
        return this.apiList.filter((item) => {
          return item.name == this.searchText;
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
  },
  methods: {
    application(row) {
      this.row = row;
      this.dialogFormVisible = true;
    },
    getAll() {
      getall()
        .then((res) => {
          console.log(res);
          this.all = res.data.students;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async school() {
      let { data } = await api.school();
      this.schools = data.schools;
    },
    handlePageChange(currentPage) {
      this.currentPage = currentPage;
    },
    // 清空搜索关键字
    clearSearch() {
      this.searchText = "";
    },
    toEdit(Competition) {
      console.log(Competition);
      this.dialogFormVisible = true;
      this.competition = cloneDeep(Competition);
    },
    getCompetitionPage(current) {
      let data = localStorage.getItem("student");
      if (data) {
        this.apiList = JSON.parse(data);
      }
    },
    currentchange(current) {
      this.getCompetitionPage(current);
      this.page.current = current;
    },
    //删除
    del(id) {
      console.log(id);
      const params = {
        id: id,
      };
      api
        .competitionDelId(params)
        .then((res) => {
          if (res.success) {
            this.getCompetitionPage(this.page.current);
            ElMessage.success("操作成功");
          } else {
            console.log(res.msg);
            return false;
          }
        })
        .catch((err) => {});
    },
    toAdd() {
      this.dialogFormVisible = true;
      this.competition = {
        id: 0,
        name: "",
        start: "",
        end: "",
        homePage: "",
        type: "",
        level: "",
        organizer: "",
        schoolId: "",
      };
    },
    souos(id) {
      console.log(id);
      const params = {
        id: id,
      };
      api
        .competitionOne(params)
        .then((res) => {
          if (res.success) {
            console.log(res);
            const competitionq = res.data.competition;
            this.competitionesqu = competitionq.competition;
            this.one = false;
            this.two = true;
          } else {
            console.log(res.msg);
            ElMessage("没有这个编号");
            this.one = true;
            this.two = false;
          }
        })
        .catch((err) => {
          ElMessage("没有这个编号");
        });
    },
    save() {
      let data = JSON.parse(localStorage.getItem("student"));
      data.forEach((item) => {
        if (item.name == this.row.name) {
          item.status = this.competition.studentName;
        }
      });
      localStorage.setItem("student", JSON.stringify(data));
      ElMessage.success("修改成功");
      this.dialogFormVisible = false;
      this.getCompetitionPage();
    },
  },
};
</script>

<style lang="scss" scoped></style>

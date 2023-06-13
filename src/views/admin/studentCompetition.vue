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
      <el-table-column fixed prop="id" label="序号" />
      <el-table-column prop="name" label="竞赛名称" />
      <el-table-column prop="homePage" label="竞赛官网" />
      <el-table-column prop="type" label="竞赛类型" />
      <el-table-column prop="level" label="竞赛等级" />
      <el-table-column prop="schoolId" label="学校名称">
        <template #default="{ row }">
          <span>{{ schoolIds(row) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="organizer" label="主办单位" />
      <el-table-column prop="start" label="开始时间" />
      <el-table-column prop="end" label="结束时间" />
      <el-table-column fixed="right" label="操作" width="120">
        <template #default="scope">
          <el-button
            link
            type="primary"
            size="small"
            @click="application(scope.row)"
            >报名</el-button
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
      <el-form-item label="竞赛负责人" :label-width="formLabelWidth">
        <el-select v-model="competition.studentName">
          <el-option
            v-for="(item, index) in all"
            :key="index"
            :label="item.studentName"
            :value="item.studentName"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="学校" :label-width="formLabelWidth">
        <el-select v-model="competition.schoolName">
          <el-option
            v-for="(item, index) in schools"
            :key="index"
            :label="item.schoolName"
            :value="item.schoolName"
          ></el-option>
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
        schoolName: "",
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
    this.getAll();
    this.school();
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
      const data = {
        current: current,
        schoolId: 1,
        size: 10,
      };
      api
        .competitionAll(data)
        .then((res) => {
          console.log(res);
          this.apiList = res.data.competitions;
          // this.page = page;
        })
        .catch((err) => {
          console.log(err);
        });
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
      let data = localStorage.getItem("student");
      let flag = false;
      if (data) {
        JSON.parse(data).forEach((item) => {
          if (item.name == this.competition.studentName) {
            flag = true;
          }
        });
      }
      if (flag) {
        return ElMessage("不能重复报名");
      }
      this.student.push({
        name: this.competition.studentName,
        title: this.row.name,
        schoolName: this.competition.schoolName,
        status: "待审核",
      });
      localStorage.setItem("student", JSON.stringify(this.student));
      ElMessage.success("报名成功，等待审核");
      this.dialogFormVisible = false;
    },
  },
};
</script>

<style lang="scss" scoped></style>

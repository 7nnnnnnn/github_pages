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
    </el-input>
    <el-button type="primary" @click="toAdd">添加</el-button>
    <el-button
      style="float: right; margin-right: 50px"
      type="primary"
      @click="$router.go(-1)"
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
          <el-button link type="primary" size="small" @click="toEdit(scope.row)"
            >编辑</el-button
          >
          <el-button
            link
            type="primary"
            size="small"
            @click="del(scope.row.id)"
          >
            删除
          </el-button>
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
  <el-dialog v-model="dialogFormVisible" title="竞赛编辑">
    <el-form :model="competition">
      <el-form-item label="竞赛名称" :label-width="formLabelWidth">
        <el-input v-model="competition.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="竞赛官网" :label-width="formLabelWidth">
        <el-input v-model="competition.homePage" autocomplete="off" />
      </el-form-item>
      <el-form-item label="竞赛类型" :label-width="formLabelWidth">
        <el-select v-model="competition.type">
          <el-option label="个人赛" value="个人赛"></el-option>
          <el-option label="团体赛" value="团体赛"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="竞赛等级" :label-width="formLabelWidth">
        <el-select v-model="competition.level">
          <el-option
            v-for="(item, index) in levels"
            :key="index"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="学校" :label-width="formLabelWidth">
        <el-select v-model="competition.schoolId">
          <el-option
            v-for="(item, index) in schools"
            :key="index"
            :label="item.schoolName"
            :value="item.id"
          ></el-option>
        </el-select>
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
        <el-button type="primary" @click="save"> 保存 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { ElMessage } from "element-plus";
import { cloneDeep } from "lodash-es";
import api from "@/http/competition.js";
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
        id: 0,
        name: "",
        start: "",
        end: "",
        homePage: "",
        type: "",
        level: "",
        organizer: "",
        schoolId: "",
      },
      formLabelWidth: 80,
      currentPage: 1, // 当前页码
      pageSize: 6, // 每页显示的数据条数
      searchText: "", // 搜索关键字
      apiList: [], // 原始数据列表
      schools: [],
    };
  },
  created() {
    this.school();
  },
  mounted() {
    this.getCompetitionPage(1);
  },
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
      const Competition = this.competition;
      if (Competition.id == 0) {
        api
          .competitionAdd(Competition)
          .then((res) => {
            if (res.success) {
              //刷新页面
              this.dialogFormVisible = false;
              this.getCompetitionPage(this.page.current);
              ElMessage.success(res.msg);
            } else {
              ElMessage(res.msg);
              return false;
            }
          })
          .catch((err) => {
            ElMessage("网络错误联系管理员");
          });
      } else {
        api
          .competitionEdit(Competition)
          .then((res) => {
            if (res.success) {
              //刷新页面
              this.dialogFormVisible = false;
              this.getCompetitionPage(this.page.current);
              ElMessage.success(res.msg);
            } else {
              ElMessage(res.msg);
              return false;
            }
          })
          .catch((err) => {
            ElMessage("网络错误联系管理员");
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>

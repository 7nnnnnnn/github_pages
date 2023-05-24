<template>
  <!-- el-table显示数据,分页 -->

  <div class="courses">
      <div class="course-tools">
          <el-button type="warning" @click="toAdd">添加</el-button>
  <el-input v-model="keyword" placeholder="请输入关键字" style="width: 200px;"></el-input>
  <el-button type="primary" @click="search">搜索</el-button>
      </div>
      <el-table :data="courses" style="width: 100%">
          <el-table-column fixed prop="id" width="150" />
          <el-table-column prop="name" label="课程名称" width="120" />
          <el-table-column prop="nameEn" label="英文课程名称" width="120" />
          <el-table-column prop="courseNo" label="课程编号" width="120" />
          <el-table-column prop="description" label="课程描述" width="120" />
          <el-table-column prop="createTime" label="createTime" width="120" />
          <el-table-column prop="updateTime" label="updateTime" width="120" />
          <el-table-column prop="depart" label="院学" width="120" />
          <el-table-column prop="state" label="状态 1激活 0 未激活" width="120" />
          <el-table-column prop="major" label="专业" width="120" />
          <el-table-column prop="deleted" label="" width="120" />
          <el-table-column prop="courseType" label="课程类型" width="120" />
          <el-table-column prop="school" label="学校" width="120" />
          <el-table-column fixed="right" label="功能管理" width="120">
              <template #default="scope">
                  <el-button link type="primary" size="small" @click="toEdit(scope.row)">更新</el-button>
                  <el-button link type="primary" size="small" @click="del(scope.row.id)">删除</el-button>
              </template>
          </el-table-column>
      </el-table>
      <el-pagination layout="prev, pager, next" :page-size="page.size" :total="page.total"
          @current-change="currentchange" />
  </div>
  <el-dialog v-model="dialogFormVisible" title="课程编辑">
      <el-form :model="course">
          <el-form-item label="name" :label-width="formLabelWidth">
              <el-input v-model="course.name" autocomplete="off" />
          </el-form-item>
          <el-form-item label="nameEn" :label-width="formLabelWidth">
              <el-input v-model="course.nameEn" autocomplete="off" />
          </el-form-item>
          <el-form-item label="courseNo" :label-width="formLabelWidth">
              <el-input v-model="course.courseNo" autocomplete="off" />
          </el-form-item>
          <el-form-item label="description" :label-width="formLabelWidth">
              <el-input v-model="course.description" autocomplete="off" />
          </el-form-item>
          <el-form-item label="createTime" :label-width="formLabelWidth">
              <el-input v-model="course.createTime" autocomplete="off" />
          </el-form-item>
          <el-form-item label="updateTime" :label-width="formLabelWidth">
              <el-input v-model="course.updateTime" autocomplete="off" />
          </el-form-item>
          <el-form-item label="depart" :label-width="formLabelWidth">
              <el-input v-model="course.depart" autocomplete="off" />
          </el-form-item>
          <el-form-item label="state" :label-width="formLabelWidth">
              <el-input v-model="course.state" autocomplete="off" />
          </el-form-item>
          <el-form-item label="major" :label-width="formLabelWidth">
              <el-input v-model="course.major" autocomplete="off" />
          </el-form-item>
          <el-form-item label="deleted" :label-width="formLabelWidth">
              <el-input v-model="course.deleted" autocomplete="off" />
          </el-form-item>
          <el-form-item label="courseType" :label-width="formLabelWidth">
              <el-input v-model="course.courseType" autocomplete="off" />
          </el-form-item>
          <el-form-item label="school" :label-width="formLabelWidth">
              <el-input v-model="course.school" autocomplete="off" />
          </el-form-item>
          <el-form-item label="right" :label-width="formLabelWidth">
              <el-input v-model="course.right" autocomplete="off" />
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
import { coursePage, courseDelId, courseAdd, courseEdit } from '../../http';
import { cloneDeep } from 'lodash-es';
export default defineComponent({
  data() {
      return {
          courses: [],
          page: {
              total: 0,
              current: 1,
              size: 10
          },
          dialogFormVisible: false,
          course: {
              "courseNo": "",
              "courseType": "",
              "createTime": "",
              "deleted": 0,
              "depart": "",
              "description": "",
              "id": 0,
              "major": "",
              "name": "",
              "nameEn": "",
              "school": "",
              "state": 0,
              "updateTime": "",
          },
          formLabelWidth: 80,
          keyword: '',
      }
  },
  mounted() {
      this.getcoursesPage(1)
  },
  methods: {
      toEdit(course) {
          console.log(course)
          this.dialogFormVisible = true;
          this.course = cloneDeep(course);
      },
      search() {
  const data = {
      current: 1,
      size: this.page.size,
      keyword: this.keyword
  }

  coursePage(data).then(res => {
      console.log(res);
      const page = res.data.page;
      this.courses = page.records;
      this.page = page;
  }).catch(err => {
      console.log(err);
  })
},

      
getcoursesPage(current) {
  const data = {
      current: current,
      size: this.page.size,
      keyword: this.keyword
  }

  coursePage(data).then(res => {
      console.log(res);
      const page = res.data.page;
      this.courses = page.records;
      this.page = page;
  }).catch(err => {
      console.log(err);
  })
},

      currentchange(current) {
          // console.log(current);
          this.getcoursesPage(current);
          this.page.current = current;//数据更新到目前显示的页面
      },
      del(id) {
  console.log(id);
  const params = {
      id: id
  }
  courseDelId(params).then(res => {
      if (res.success) {
          this.getcoursesPage(this.page.current)
      } else {
          console.log(res.msg);
          return false
      }
  }).catch(err => {

  })
}
,
toAdd() {
  this.dialogFormVisible = true;
  this.course = {
      "height": "",
      "id": 0,//标志点0 添加>0 更新
      "name": "",
      "width": ""
  }
  this.keyword = ''; // 清空搜索框
}
,
      save() {
          const course = this.course
          if (course.id == 0) {
              courseAdd(course).then(res => {
                  if (res.success) {
                      this.dialogFormVisible = false
                      this.getcoursesPage(this.page.current)
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
              courseEdit(course).then(res => {
                  if (res.success) {
                      this.dialogFormVisible = false
                      this.getcoursesPage(this.page.current)
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
});
</script>
<style lang = "scss" scoped></style>
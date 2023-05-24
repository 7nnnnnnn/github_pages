<template>
  <div class="root">
    <el-button type="success" plain @click="toAdd">新增</el-button>
    <el-dialog v-model="dialogFormVisible" title="表单">
      <el-form :model="articleCat">
        <el-form-item label="类别名称" :label-width="formLabelWidth">
          <el-input v-model="articleCat.catName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="父级id" :label-width="formLabelWidth">
          <el-input v-model="articleCat.parentId" autocomplete="off" />
        </el-form-item>
        <el-form-item label="是否导航显示" :label-width="formLabelWidth">
          <el-input v-model="articleCat.showInNav" autocomplete="off" />
        </el-form-item>
        <el-form-item label="排序" :label-width="formLabelWidth">
          <el-input v-model="articleCat.sortOrder" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="confirm()"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
    <div class="table">
      <el-table :data="list" style="width: 100%">
        <el-table-column fixed prop="id" label="序号" width="80" align="center"/>
        <el-table-column prop="catName" label="类别名称" width="150" align="center"/>
        <el-table-column prop="parentId" label="父级id" width="80" align="center"/>
        <el-table-column prop="showInNav" label="是否导航显示" width="110" align="center"/>
        <el-table-column prop="sortOrder" label="排序" width="80" align="center"/>
        <el-table-column prop="createTime" label="创建时间" width="250" align="center"/>
        <el-table-column prop="updateTime" label="更新时间" width="250" align="center"/>
        <el-table-column fixed="right" label="权限" width="150" align="center">
          <template #default="scope">
            <el-button type="info" plain size="small" @click="handleEdit(scope.row.id)">编辑</el-button>
            <el-button type="danger" plain size="small"  @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
  
  <script>
import articleCat from '@/http/articleCat'
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      list: [],
      articleCat: {},
      dialogFormVisible: false,
      current:1,
      size:10,
      total:0
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      articleCat.entire().then((res) => {
        console.log(res)
        this.list = res.data.articleCats;
      });
    },
    handleDelete(id) {
      const data = { id };
      ElMessageBox.confirm("您是否需要删除该面试题吗?", "提示", {
        confirmButtonText: "ok",
        cancelButtonText: "no",
        type: "warning",
      })
        .then(() => {
          articleCat.remove(data).then((res) => {
            if (res.success) {
              ElMessage({
                type: "success",
                message: "删除成功",
              });
              this.fetchData();
            } else {
              ElMessage({
                type: "error",
                message: "网络出问题，联系管理员",
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
      articleCat.select(data).then((res) => {
        this.articleCat = res.data.articleCat;
      });
    },
    toAdd() {
      this.articleCat = {};
      this.dialogFormVisible = true;
    },
    confirm() {
      console.log(this.articleCat);
      if (this.articleCat.id == undefined) {
        articleCat.add(this.articleCat).then((res) => {
          if (res.success) {
            ElMessage({
              type: "success",
              message: "添加成功",
            });
            this.fetchData();
          } else {
            ElMessage({
              type: "error",
              message: "网络出问题，联系管理员",
            });
          }
          this.dialogFormVisible = false;
        });
      } else {
        articleCat.update(this.articleCat).then((res) => {
          if (res.success) {
            ElMessage({
              type: "success",
              message: "编辑成功",
            });
            this.fetchData();
          } else {
            ElMessage({
              type: "error",
              message: "网络出问题，联系管理员",
            });
          }
        });
        this.dialogFormVisible = false;
      }
    },
  },
});
</script>
  
  <style lang="scss" scoped>

</style>
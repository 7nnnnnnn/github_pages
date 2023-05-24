<template>
    <div>
    <el-input v-model="searchText" placeholder="请输入搜索关键字" clearable @clear="clearSearch" @keyup.enter="performSearch"
      style="margin-bottom: 20px;">
      <template #append>
        <el-button circle type="danger" @click="Getone(this.searchText)">
          <el-icon>
            <Search />
          </el-icon>
        </el-button>
      </template>
    </el-input>
  </div>
    <div class="building">
        <div class="building-tools">
            <el-button type="warning" @click="toAdd">添加</el-button>
        </div>
        <el-table :data="buildings" style="width: 100%">
            <el-table-column prop=id label="建筑编号" width="120" />
            <el-table-column prop=chager label="楼管" width="120" />
            <el-table-column prop="name" label="宿舍楼名称(官方名称)" width="320" />
            <el-table-column prop="schoolId" label="学校" width="120" />


            <el-table-column fixed="right" label="操作" width="120">
                <template #default="scope">
                    <el-button link type="primary" size="small" @click="edit(scope.row)">更新</el-button>
                    <el-button link type="primary" size="small" @click="deleteAPI(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination layout="prev, pager, next" :page-size="page.size" :total="page.total"
            @current-change="currentchange" />
    </div>
    <el-dialog v-model="dialogFormVisible" title="建筑类型编辑">
        <el-form :model="building">
            <el-form-item label="建筑编号" :label-width="formLabelWidth">
                <el-input v-model="building.id" autocomplete="off" />
            </el-form-item>
            <el-form-item label="楼管" :label-width="formLabelWidth">
                <el-input v-model="building.chager" autocomplete="off" />
            </el-form-item>
            
            <el-form-item label="宿舍楼名称" :label-width="formLabelWidth">
                <el-input v-model="building.name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="学校" :label-width="formLabelWidth">
                <el-input v-model="building.schoolId" autocomplete="off" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">Cancel</el-button>
                <el-button type="primary" @click="save">
                    保存
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script>
import { defineComponent } from "vue"
import { add, getBuildingsPage, edit, de,one } from "../../http/building";
import { ElMessage } from 'element-plus'
import { cloneDeep } from 'lodash-es'
export default defineComponent({
    data() {
        return {
            buildings:[],
            page: {
                total: 0,
                current: 1,
                size: 10
            },
            dialogFormVisible: false,
           
            formLabelWidth: 80,
            buildings:[],
            building: {
                "chager": 0,
                "id": 0,
                "name": "",
                "schoolId": 0
            }
        }
    },
    mounted() {
        this.getBuildingsPage(1)
    },
    methods: {
      
        getBuildingsPage(current) {
            const data = {
                current: current,
                size: 999
            }
            getBuildingsPage(data).then(res => {
                console.log(res);
                const page = res.data.page;
                console.log(page);
                this.buildings = page.records;
                this.page = page;
            }).catch(err => {
                console.log(err);
            })

        },
        edit(buildings) {
            console.log(buildings);
            this.dialogFormVisible = true;
            this.building = cloneDeep(buildings);
            console.log();
        },
        SaveEdit() {
      // 保存编辑后的数据
      console.log('Saving API:', this.edit);
      const index = this.apiList.findIndex(item => item.id === this.edit.id);
      if (index !== -1) {
        // 替换原有的数据
        this.apiList.splice(index, 1, this.edit);
      } else {
        // 添加编辑后的数据
        this.apiList.push(this.edit);
      }
      this.editDialogVisible = false;
      ElMessage.success('保存成功！');

    },
    Getone(id) {
      this.apiList = [],
        one(id)
          .then(response => {
            console.log("搜索成功！");
            ElMessage.success('搜索成功！');
            const classrooms = response.data.backendApi;
            this.apiList.push(classrooms);
          })
          .catch(error => {
            ElMessage.error('搜索失败！');
            console.log("搜索失败！");
          });
    },
        currentchange(current) {
            // console.log(current);
            this.getBuildingsPage(current);
            this.page.current = current;//数据更新目前显示的页面
        },
       
        deleteAPI(row) {
      ElMessageBox.confirm('确定要删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        de(row.id)
          .then(response => {
            if (response.success) {
              // 处理删除成功的情况
              // 用户点击了确定按钮，执行删除操作
              const index = this.apiList.findIndex(api => api.id === row.id);
              if (index !== -1) {
                this.apiList.splice(index, 1); // 从数据源中删除API对象
              }
              console.log('删除成功');
              ElMessage.success('删除成功！');

            } else {
              // 处理删除失败的情况
              ElMessage.error(response.msg);

              console.error(response.msg);
            }
          })
          .catch(error => {
            // 处理请求异常
            console.error(error);
          });
        console.log("删除 API");

      }).catch((e) => {
        // 取消删除操作
        console.log("不删除 API", e);
      });
    },
    de(row) {
      // 在这里处理删除逻辑，可以在确认后从数据源中删除API对象或向服务器发送删除请求
      // 这里使用 Element Plus 的 ElMessageBox 弹窗组件来确认删除操作
      ElMessageBox.confirm('确定要删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          // 用户点击了确定按钮，执行删除操作
          const index = this.apiList.findIndex(api => api.id === row.id);
          if (index !== -1) {
            this.apiList.splice(index, 1); // 从数据源中删除API对象
          }
          ElMessage.success('删除成功！');

        })

        .catch(() => {
          ElMessage.error('删除失败！');

          // 用户点击了取消按钮，取消删除操作
          console.log('取消删除 API', row);
        });
    },
        toAdd() {
            //到添加的页面
            this.dialogFormVisible = true;
        },
        save() {
            const Building = this.building;
            if (Building.id == 0) {
                add(Building).then(res => {
                    if (res.success) {
                        //刷新页面
                        this.dialogFormVisible = false;
                        this.getBuildingsPage(this.page.current)
                        console.log(res);
                        ElMessage(res.msg)
                    }
                    else {
                        ElMessage(res.msg)
                        return false
                    }
                }).catch(err => {
                    ElMessage('网络错误联系管理员')
                })
            }
            else {
                edit(adcate).then(res => {
                    if (res.success) {
                        //刷新页面
                        this.dialogFormVisible = false;
                        this.getBuildingsPage(this.page.current)
                        ElMessage(res.msg)
                    }
                    else {
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

<style lang="scss" scoped></style>
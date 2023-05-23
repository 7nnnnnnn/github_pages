<template>
    <div class="head">
        <el-button link type="primary" size="small" @click="addDepartment">添加一个部门</el-button>
        <el-table :data="departments" style="width: 100%">
            <el-table-column fixed prop="id" label="id" width="150" />
            <el-table-column prop="departName" label="departName" width="120" />
            <el-table-column prop="departCode" label="departCode" width="120" />
            <el-table-column prop="departDesc" label="departDesc" width="120" />
            <el-table-column prop="departType" label="departType" width="120" />
            <el-table-column prop="schoolId" label="schoolId" width="120" />
            <el-table-column prop="createTime" label="createTime" width="120" />
            <el-table-column prop="deleted" label="deleted" width="120" />
            <el-table-column prop="updateTime" label="updateTime" width="120" />
            
            <el-table-column fixed="right" label="Operations" width="120">
                <template #default="scope">
                    <el-button link type="primary" size="small" @click="edit(scope.row)">修改</el-button>
                    <el-button link type="primary" size="small" @click="del(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination layout="prev, pager, next" :total="pageinfo.totalpage" :page-size="pageinfo.pageSize"
            @current-change="pageChange" />

    </div>

    <el-dialog v-model="DialogVisible" title="添加部门信息" width="50%" center>
        <el-form :model="department">
            <el-form-item label="departName" :label-width="formLabelWidth">
                <el-input v-model="department.departName" autocomplete="off" />
            </el-form-item>
            <el-form-item label="departCode" :label-width="formLabelWidth">
                <el-input v-model="department.departCode" autocomplete="off" />
            </el-form-item>
            <el-form-item label="departDesc" :label-width="formLabelWidth">
                <el-input v-model="department.departDesc" autocomplete="off" />
            </el-form-item>
            <el-form-item label="departType" :label-width="formLabelWidth">
                <el-input v-model="department.departType" autocomplete="off" />
            </el-form-item>
            <el-form-item label="schoolId" :label-width="formLabelWidth">
                <el-input v-model="department.schoolId" autocomplete="off" />
            </el-form-item>
            <el-form-item label="createTime" :label-width="formLabelWidth">
                <el-input v-model="department.createTime" autocomplete="off" />
            </el-form-item>
            <el-form-item label="deleted" :label-width="formLabelWidth">
                <el-input v-model="department.deleted" autocomplete="off" />
            </el-form-item>
            
            <el-form-item label="updateTime" :label-width="formLabelWidth">
                <el-input v-model="department.updateTime" autocomplete="off" />
            </el-form-item>
            
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="DialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="confirmAdd">
                    Confirm
                </el-button>
            </span>
        </template>
    </el-dialog>
    <el-dialog v-model="EditDialogVisible" title="修改部门信息" width="50%" center>
        <el-form :model="department">
            <el-form-item label="departName" :label-width="formLabelWidth">
                <el-input v-model="department.departName" autocomplete="off" />
            </el-form-item>
            <el-form-item label="departCode" :label-width="formLabelWidth">
                <el-input v-model="department.departCode" autocomplete="off" />
            </el-form-item>
            <el-form-item label="departDesc" :label-width="formLabelWidth">
                <el-input v-model="department.departDesc" autocomplete="off" />
            </el-form-item>
            <el-form-item label="departType" :label-width="formLabelWidth">
                <el-input v-model="department.departType" autocomplete="off" />
            </el-form-item>
            <el-form-item label="schoolId" :label-width="formLabelWidth">
                <el-input v-model="department.schoolId" autocomplete="off" />
            </el-form-item>
            <el-form-item label="createTime" :label-width="formLabelWidth">
                <el-input v-model="department.createTime" autocomplete="off" />
            </el-form-item>
            <el-form-item label="deleted" :label-width="formLabelWidth">
                <el-input v-model="department.deleted" autocomplete="off" />
            </el-form-item>
            
            <el-form-item label="updateTime" :label-width="formLabelWidth">
                <el-input v-model="department.updateTime" autocomplete="off" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="EditDialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="confirmEdit">
                    Confirm
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script>
import { defineComponent } from "vue"
import {getallDepartment,getoneDepartment,addDepartment,editDepartment,deleteDepartment} from '@/http/department'//在http的文件夹里index.js 是相对应的
import { cloneDeep } from 'lodash-es'
import { ElMessage, ElMessageBox } from 'element-plus';
export default defineComponent({
    data() {
        return {
            departments: [],//自己取
            pageinfo: {
                "currentPage": 1,
                "pageSize": 5,
                "totalpage": 10
            },
            department: {//自己取 里面的内容就是老师提供的表，在那个api文档也可以看 可以直接cv 我的视频有说
                "createTime": "",
                "deleted": 0,
                "departCode": "",
                "departDesc": "",
                "departName": "",
                "departType": "",
                "id": 0,
                "schoolId": 0,
                "updateTime": ""
            },
            DialogVisible: false,
            EditDialogVisible: false
        }
    },
    mounted() {
        
        this.getdepartments()

    },
    methods: {
        
        
        pageChange(currentPage) {
            this.pageinfo.currentPage = currentPage;
            this.getdepartments();
        },
        //获取老师那个api库的内容函数 没有数据得自己加
        getdepartments() {
            let start = this.pageinfo.pageSize * (this.pageinfo.currentPage - 1);
            let end = this.pageinfo.currentPage * this.pageinfo.pageSize;

            getallDepartment().then(res => {
                //const sortedDormitorys = res.data.dormitories
                if (res.success) {
                    this.departments = res.data.departments.slice(start, end);//去浏览器的控制台看名字 我发的视频里也有
                    this.pageinfo.totalpage = res.data.departments.length;
                    //ElMessage(res.msg)
                } else {
                    ElMessage(res.msg)
                    return false
                }

                //console.log(this.pageinfo.totalpage);
                //console.log(res);
            }).catch(err => {
                console.log(err);
            })


        },
        //添加记录 在第3行
        addDepartment() {
            
            this.DialogVisible = true
        },
        
        confirmAdd() {

            const one = this.department;//第128行 记得改，等号左边的随便取，改了的话下面一行也得改，里面的参数
            addDepartment(one).then(res => {//第116行 记得一起改 
                this.getdepartments()//174行 记得改
                //console.log(res);
            }).catch(err => {
                console.log(err);
            })
            this.DialogVisible = false
        },
        
        
        edit(department) {
            //console.log(dormitory)
            this.EditDialogVisible = true;
            this.department = cloneDeep(department);//这个cloneDeep括号里的参数要对应edit括号里的参数，在295行

        },
        //在第106行 改名要一起改
        confirmEdit() {
            let department = this.department; //等号左边的变量名随便取，右边的名字和第128行的对象名一样，有改名记得一起改
            //console.log(dormitory)
            editDepartment(department).then(res => {//这个函数在116行 改名记得一起
                if (res.success) {
                    this.EditDialogVisible = false;
                    this.getdepartments();//这个函数在176行 改名记得一起
                    ElMessage(res.msg)
                } else {
                    ElMessage(res.msg)
                    return false
                }

            }).catch(err => {
                ElMessage('网络错误联系管理员')
            })
        },
        //删除 del在19行被调用了，如果你要改名记得一起改
        del(id) {
            console.log(id);
            const params = {
                id: id
            }
            ElMessageBox.confirm(
                '是否确认删除',
                'Warning',
                {
                    confirmButtonText: '确认删除',
                    cancelButtonText: '在考虑一下',
                    type: 'warning',
                }
            )
                .then(() => {
                    ElMessage({
                        type: 'success',
                        message: '删除成功',
                    }),
                        //下面这个deleteDormitory要改名的话 代码第116行也得改，改成一样的
                        deleteDepartment(params).then(res => {
                            if (res.success) {
                                this.getdepartments();//这个函数在176行 改名记得一起
                            } else {
                                console.log(res.msg);
                                return false
                            }
                        }).catch(err => {
                            console.log(err);

                        })
                })
                .catch(() => {
                    ElMessage({
                        type: 'info',
                        message: '在考虑一下',
                    })
                })

        },
        




    }

});
</script>

<style lang="scss" scoped></style>

<template>
    <div class="head">
        <el-button link type="primary" size="small" @click="adddormitory">添加</el-button>
        <el-table :data="Roles" style="width: 100%">
            <el-table-column fixed prop="id" label="id" width="150" />
            <el-table-column prop="deleted" label="deleted" width="120" />
            <el-table-column prop="description" label="description" width="120" />
            <el-table-column prop="createTime" label="createTime" width="120" />
            <el-table-column prop="roleName" label="roleName" width="120" />
            <el-table-column prop="status" label="status" width="120" />
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

    <el-dialog v-model="DialogVisible" title="添加" width="50%" center>
        <el-form :model="Role">
            <el-form-item label="id" :label-width="formLabelWidth">
                <el-input v-model="Role.id" autocomplete="off" />
            </el-form-item>
            <el-form-item label="deleted" :label-width="formLabelWidth">
                <el-input v-model="Role.deleted" autocomplete="off" />
            </el-form-item>
            <el-form-item label="description" :label-width="formLabelWidth">
                <el-input v-model="Role.description" autocomplete="off" />
            </el-form-item>
            <el-form-item label="createTime" :label-width="formLabelWidth">
                <el-input v-model="Role.createTime" autocomplete="off" />
            </el-form-item>
            <el-form-item label="roleName" :label-width="formLabelWidth">
                <el-input v-model="Role.roleName" autocomplete="off" />
            </el-form-item>
            <el-form-item label="status" :label-width="formLabelWidth">
                <el-input v-model="Role.status" autocomplete="off" />
            </el-form-item>
            <el-form-item label="updateTime" :label-width="formLabelWidth">
                <el-input v-model="Role.updateTime" autocomplete="off" />
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
    <el-dialog v-model="EditDialogVisible" title="修改" width="50%" center>
        <el-form :model="Role">
            <el-form-item label="id" :label-width="formLabelWidth">
                <el-input v-model="Role.id" autocomplete="off" />
            </el-form-item>
            <el-form-item label="deleted" :label-width="formLabelWidth">
                <el-input v-model="Role.deleted" autocomplete="off" />
            </el-form-item>
            <el-form-item label="description" :label-width="formLabelWidth">
                <el-input v-model="Role.description" autocomplete="off" />
            </el-form-item>
            <el-form-item label="createTime" :label-width="formLabelWidth">
                <el-input v-model="Role.createTime" autocomplete="off" />
            </el-form-item>
            <el-form-item label="roleName" :label-width="formLabelWidth">
                <el-input v-model="Role.roleName" autocomplete="off" />
            </el-form-item>
            <el-form-item label="status" :label-width="formLabelWidth">
                <el-input v-model="Role.status" autocomplete="off" />
            </el-form-item>
            <el-form-item label="updateTime" :label-width="formLabelWidth">
                <el-input v-model="Role.updateTime" autocomplete="off" />
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
import { getalldormitory, addDormitory, getonedormitory, deleteDormitory, editDormitory } from "@/http/role"//在http的文件夹里index.js 是相对应的
import { cloneDeep } from 'lodash-es'
import { ElMessage, ElMessageBox } from 'element-plus';
export default defineComponent({
    data() {
        return {
            Roles: [],//自己取
            pageinfo: {
                "currentPage": 1,
                "pageSize": 5,
                "totalpage": 10
            },
            Role: {
                "createTime": "",
                "deleted": 0,
                "description": "",
                "id": 0,
                "roleName": "",
                "status": 0,
                "updateTime": ""
            },
            DialogVisible: false,
            EditDialogVisible: false
        }
    },
    mounted() {
        //this.tested()
        //this.adds()
        this.getdormitorys()

    },
    methods: {
        //不用康
        tested() {
            console.log("2#A211".split(""))
            const a = "2#A211".split("")
            console.log("a" + 1 + 2)
        },
        //排序 不用看
        dsort(dormitorys) {

            for (var i = 0; i < dormitorys.length; i++) {

                dormitorys[i].id = i + 1;



            }
            return dormitorys;
        },
        pageChange(currentPage) {
            this.pageinfo.currentPage = currentPage;
            this.getdormitorys();
            //console.log(this.dormitory)
        },
        //获取老师那个api库的内容函数 没有数据得自己加
        getdormitorys() {
            let start = this.pageinfo.pageSize * (this.pageinfo.currentPage - 1);
            let end = this.pageinfo.currentPage * this.pageinfo.pageSize;

            getalldormitory().then(res => {
                //const sortedDormitorys = res.data.dormitories
                if (res.success) {
                    // this.dormitorys = res.data.dormitories.slice(start, end);//去浏览器的控制台看名字 我发的视频里也有
                    this.pageinfo.totalpage = res.data.roles.length;
                    this.Roles=res.data.roles.slice(start, end);
                    ElMessage(res.msg)
                } else {
                    ElMessage(res.msg)
                    return false
                }

                //console.log(this.pageinfo.totalpage);
                console.log(res);
            }).catch(err => {
                console.log(err);
            })


        },
        //添加记录 在第3行
        adddormitory() {
            //除了第211行，其他的够可以删了202到210行
            this.DialogVisible = true
        },
        //第64行 改名记得一起改
        confirmAdd() {

            const one = this.Role;//第12
            addDormitory(one).then(res => {//第116行
                this.getdormitorys()//174行
                //console.log(res);
            }).catch(err => {
                console.log(err);
            })
            this.DialogVisible = false
        },

        
        //修改 这个在18行，要改名记得看一下，edit()括号里的参数名随便取
        edit(Role) {
            //console.log(Role)
            this.EditDialogVisible = true;
            this.Role = cloneDeep(Role);//这个cloneDeep括号里的参数要对应edit括号里的参数，在295行

        },
        //在第106行 改名要一起改
        confirmEdit() {
            let Role = this.Role; //
            console.log(Role)
            editDormitory(Role).then(res => {//这个函数在116行 改名记得一起
                if (res.success) {
                    this.EditDialogVisible = false;
                    this.getdormitorys();//这个函数在176行 改名记得一起
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
                    cancelButtonText: '再考虑一下',
                    type: 'warning',
                }
            )
                .then(() => {
                    ElMessage({
                        type: 'success',
                        message: '删除成功',
                    }),
                        //下面这个deleteDormitory要改名的话 代码第116行也得改，改成一样的
                        deleteDormitory(params).then(res => {
                            if (res.success) {
                                this.getdormitorys();//这个函数在176行 改名记得一起
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
                        message: '再考虑一下',
                    })
                })

        },
        //删除所有记录  这个不用管
        delall() {
            //console.log(this.dormitorys.length)
            for (let i = 1; i <= this.pageinfo.totalpage; i++) {
                let params = {
                    id: i
                }

                deleteDormitory(params).then(res => {
                    if (res.success) {
                        this.getdormitorys();
                    } else {
                        console.log(res.msg);
                        return false
                    }
                }).catch(err => {
                    console.log(err);

                })
            }
        }




    }

});
</script>

<style lang="scss" scoped></style>

<template>
    <div class="head">
        <el-button link type="primary" size="small" @click="addclassinfo">添加一个班级</el-button>
        <el-table :data="classinfos" style="width: 100%">
            <el-table-column fixed prop="id" label="id" width="150" />
            <el-table-column prop="name" label="name" width="120" />
            <el-table-column prop="state" label="state" width="120" />
            <el-table-column prop="school" label="school" width="120" />
            <el-table-column prop="depart" label="depart" width="120" />
            <el-table-column prop="major" label="major" width="120" />


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

    <el-dialog v-model="DialogVisible" title="添加班级信息" width="50%" center>
        <el-form :model="classinfo">
            <el-form-item label="name" :label-width="formLabelWidth">
                <el-input v-model="classinfo.name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="state" :label-width="formLabelWidth">
                <el-input v-model="classinfo.state" autocomplete="off" />
            </el-form-item>
            <el-form-item label="school" :label-width="formLabelWidth">
                <el-input v-model="classinfo.school" autocomplete="off" />
            </el-form-item>
            <el-form-item label="depart" :label-width="formLabelWidth">
                <el-input v-model="classinfo.depart" autocomplete="off" />
            </el-form-item>
            <el-form-item label="major" :label-width="formLabelWidth">
                <el-input v-model="classinfo.major" autocomplete="off" />
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
    <el-dialog v-model="EditDialogVisible" title="修改班级信息" width="50%" center>
        <el-form :model="classinfo">
            <el-form-item label="name" :label-width="formLabelWidth">
                <el-input v-model="classinfo.name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="state" :label-width="formLabelWidth">
                <el-input v-model="classinfo.state" autocomplete="off" />
            </el-form-item>
            <el-form-item label="school" :label-width="formLabelWidth">
                <el-input v-model="classinfo.school" autocomplete="off" />
            </el-form-item>
            <el-form-item label="depart" :label-width="formLabelWidth">
                <el-input v-model="classinfo.depart" autocomplete="off" />
            </el-form-item>
            <el-form-item label="major" :label-width="formLabelWidth">
                <el-input v-model="classinfo.major" autocomplete="off" />
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
    <!-- 根据school、depart和major查询班级信息 -->
    <el-form-item label="学校">
        <el-input v-model="school"></el-input>
    </el-form-item>
    <el-form-item label="院系">
        <el-input v-model="depart"></el-input>
    </el-form-item>
    <el-form-item label="专业">
        <el-input v-model="major"></el-input>
    </el-form-item>
    <el-button type="primary" @click="getClassinfoBySchoolAndDepartAndMajor">查询</el-button>

    <!-- 分页查询班级信息 -->
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
        :total="total">
    </el-pagination>

    <!-- 根据school分页查询班级信息 -->
    <el-form-item label="学校">
        <el-input v-model="school"></el-input>
    </el-form-item>
    <el-button type="primary" @click="getClassinfosPageBySchool">查询</el-button>

    <!-- 根据majorId查询班级信息，用于下拉框选择 -->
    <el-form-item label="专业">
        <el-select v-model="majorId" placeholder="请选择">
            <el-option v-for="item in majorList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
    </el-form-item>
</template>

<script>
import { defineComponent } from "vue"
import { getallclassinfo, addclassinfo, editclassinfo, deleteclassinfo } from '@/http/classinfo'//在http的文件夹里index.js 是相对应的
import { cloneDeep } from 'lodash-es'
import { ElMessage, ElMessageBox } from 'element-plus';
import { getClassinfoBySchoolAndDepartAndMajor, getClassinfosPage, getClassinfosPageBySchool, getClassinfosForSelectByMajorId } from '@/http/classinfo'
export default defineComponent({

    data() {
        return {
            school: '',
            depart: '',
            major: '',
            majorId: '',
            majorList: [],
            currentPage: 1,
            pageSize: 10,
            total: 0,
            classList: [],
            classinfos: [],//自己取
            pageinfo: {
                "currentPage": 1,
                "pageSize": 5,
                "totalpage": 10
            },
            classinfo: {
                "depart": "",
                "id": 0,
                "major": "",
                "name": "",
                "school": "",
                "state": 0
            },
            DialogVisible: false,
            EditDialogVisible: false
        }
    },
    mounted() {

        this.getclassinfos()
        this.getClassinfosPage()



    },
    methods: {



        pageChange(currentPage) {
            this.pageinfo.currentPage = currentPage;
            this.getclassinfos();
        },
        //获取老师那个api库的内容函数 没有数据得自己加
        getclassinfos() {
            let start = this.pageinfo.pageSize * (this.pageinfo.currentPage - 1);
            let end = this.pageinfo.currentPage * this.pageinfo.pageSize;

            getallclassinfo().then(res => {
                //const sortedDormitorys = res.data.dormitories
                if (res.success) {
                    this.classinfos = res.data.classinfos.slice(start, end);//去浏览器的控制台看名字 我发的视频里也有
                    this.pageinfo.totalpage = res.data.classinfos.length;
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
        addclassinfo() {

            this.DialogVisible = true
        },


        confirmAdd() {

            const one = this.classinfo;//第128行 记得改，等号左边的随便取，改了的话下面一行也得改，里面的参数
            addclassinfo(one).then(res => {//第116行 记得一起改 
                this.getclassinfos()//174行 记得改
                //console.log(res);
            }).catch(err => {
                console.log(err);
            })
            this.DialogVisible = false
        },


        edit(classinfo) {
            //console.log(dormitory)
            this.EditDialogVisible = true;
            this.classinfo = cloneDeep(classinfo);//这个cloneDeep括号里的参数要对应edit括号里的参数，在295行

        },
        //在第106行 改名要一起改
        confirmEdit() {
            let classinfo = this.classinfo; //等号左边的变量名随便取，右边的名字和第128行的对象名一样，有改名记得一起改
            //console.log(dormitory)
            editclassinfo(classinfo).then(res => {//这个函数在116行 改名记得一起
                if (res.success) {
                    this.EditDialogVisible = false;
                    this.getclassinfos();//这个函数在176行 改名记得一起
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
                        deleteclassinfo(params).then(res => {
                            if (res.success) {
                                this.getclassinfos();//这个函数在176行 改名记得一起
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
        async getClassinfoBySchoolAndDepartAndMajor() {
            const { data } = await getClassinfoBySchoolAndDepartAndMajor(this.school, this.depart, this.major)
            this.classList = data
        },
        handleSizeChange(val) {
            this.pageSize = val
            this.getClassinfosPage()
        },
        handleCurrentChange(val) {
            this.currentPage = val
            this.getClassinfosPage()
        },
        async getClassinfosPage() {
            const { data } = await getClassinfosPage(this.currentPage, this.pageSize)
            this.classList = data.list
            this.total = data.total
        },
        async getClassinfosForSelectByMajorId() {
            const { data } = await getClassinfosForSelectByMajorId(this.majorId)
            this.classList = data
        },
        async getClassinfosForSelectByMajorId() {
            const { data } = await getClassinfosForSelectByMajorId(this.majorId)
            this.classList = data
        },




    }

});
</script>

<style lang="scss" scoped></style>

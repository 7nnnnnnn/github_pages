<template>
    <div class="interviewtype">
            <div class="interviewtype-tools">
                <div class="itt1"> <el-button type="warning" @click="toAdd" >添加</el-button></div>
                <div class="itt2">
                    <el-col :span="7">
                        <!-- 搜索与添加区域 -->
                        <el-input placeholder="请输入内容" v-model="go" clearable>
                            <el-button slot="append" icon="Search" @click="getone()"></el-button>
                            <template #append>
                <el-button circle type="danger" @click="getone(this.searchText)">
                    <el-icon>
                        <Search />
                    </el-icon>
                </el-button>
            </template>
                        </el-input>
                    </el-col>
                </div>
            </div>
            <el-dialog v-model="dialogFormVisible" title="面试题型编辑">
            <el-form :model="interviewtype">
                <el-form-item label="面试题型" :label-width="formLabelWidth">
                    <el-input v-model="interviewtype.typeName" autocomplete="off" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取消</el-button>
                    <el-button type="primary" @click="save" :disable="!interviewtype.typeName">
                        保存
                    </el-button>
                </span>
            </template>
        </el-dialog>

    </div>
    <el-table :data="ites" style="width: 100%">
            <el-table-column fixed prop="id" label="id" width="50" />
            <el-table-column prop="typeName" label="面试题型" />
            <el-table-column fixed="right" label="操作" width="120">
                <template #default="scope">
                    <el-button link type="primary" size="small" v-on:click="toEdit(scope.row)">更新</el-button>
                    <el-button link type="primary" size="small" v-on:click="del(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
            <el-pagination background layout="prev, pager, next"  :total="100" @current-change="currentchange" />

</template>

<script>
import{Search} from '@element-plus/icons-vue'
import{defineComponent} from "vue"
import { ElMessage ,ElMessageBox} from "element-plus";
import {interviewtypeadd,interviewtypeedit,interviewtypegetall,interviewtypedelete,interviewtypegetone} from "../../http/interviewtype.js"
// import { id } from 'element-plus/es/locale';



export default defineComponent({
    data() {
        return {
            dialogFormVisible: false,
            interviewtype: {
                "id": 0,//标志点 0添加 >0 更新
                "typeName": "",



            },
            formLabelWidth: 80,
            ites: [],
            all: {
                total: 0,
                current: 1,
                size: 10
            },

            query: ''


        }
    },
    mounted() {
        this.getinterviewtypegetall(1)
    },

    computed: {
        filteredItems() {
            return this.items.filter(item => {
                return item.toLowerCase().includes(this.query.toLowerCase());
            });
        }
    },
    // created(){
    //     this.interviewtypegetonePage();
    // },


    methods: {
        toAdd() {
            this.dialogFormVisible = true;
            this.interviewtype = {
                id:0,
                typeName:"",
            };
        },
        save() {
            const it = this.interviewtype;
            if (it.id == 0) {
                interviewtypeadd(it).then(res => {
                    // this.ites.push(this.ites);
                    console.log(res)
                    if (res.success) {
                        //刷新页面
                        ElMessage.success("数据添加成功");
                        this.getinterviewtypegetall();
                        this.dialogFormVisible = false;
                        ElMessage(res.msg)
                    }
                    else {
                        ElMessage.error("数据添加失败！");
                        return false;
                    }
                }).catch(err => {
                    ElMessage.error("网络请求失败,请重试");
                    this.dialogFormVisible = false;
                    return false;
                })
            }
            else {
                interviewtypeedit(it).then(res => {
                    if (res.success) {
                        //刷新页面
                        ElMessage.success("数据更新成功！");
                        this.dialogFormVisible = false;
                        this.getinterviewtypegetall();
                        this.getinterviewtypeedit(this.ites.current);
                        ElMessage(res.msg)
                    }
                    else {
                        ElMessage.error("数据更新失败！");
                        return false
                    }
                }).catch(err => {
                    ElMessage('网络错误联系管理员');
                    this.dialogFormVisible = false;
                    return false;
                })
            }

        },
        // getoneresult() {
        //     if (this.getone == '') {
        //         for (let i = 0; i < this.blogs.length; i++) {
        //             this.blogs[i].id = i;
        //         }
        //         return this.blogs;
        //     }
        //     else {
        //         if (this.flag) {
        //             return this.blogs.filter((blog) => {
        //                 return blog.id.match(this.search)

        //             })
        //         }
        //         else {
        //             return this.blogs.filter((blog) => {
        //                 return blog.typeName.match(this.search)
        //             })
        //         }


        //     }

        // },
        getinterviewtypegetall() {

            interviewtypegetall().then(res => {
                console.log(res);
                this.ites = res.data.interviewTypes
            }).catch(err => {
                console.log(err);
            })

        },
        currentchange(current) {
            // console.log(current);
            this.getinterviewtypegetall(current);
            this.all.current = current;//数据更新目前显示的页面
        },
        toEdit(scope) {
            // console.log(ites);
            this.dialogFormVisible = true;
            this.interviewtype = {
                id:0,
                typeName:"",
            };
            // this.interviewtype = this.ites(scope.index);
            // this.ites.push(this.ites);    
        },
        del(scope) {
            ElMessageBox.confirm('此操作将永久删除用户, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'

            });
            const params={
                id:id
            }
            
           
            
            interviewtypedelete(params).then(res=>{
                if (res.success) {
                    ElMessage.success("数据删除成功！");
                    this.getinterviewtypegetall();
                    this.getinterviewtypegetall(this.all.current)
            //         this.dialogVisible = false;
                } else {
                    ElMessage.error("数据删除失败！");
                    console.log(res.msg);
                    return false
                }
            }).catch(err => {
                ElMessage('网络错误联系管理员');
                return false;
                
            })

            
            //     .then(async () => {
                    // const { data: res } = await this.$http.delete('users/' + id);
                    // //     this.$http.interviewtypedelete("http://localhost:5173/api/interviewType/delete"+ites.id);

                    // if (res.meta.status !== 200) {
                    //     return this.$message.error('删除用户失败！');
                    // }
                    // this.ElMessage({ type: 'success', message: '删除成功!' });
                    // this.getinterviewtypegetall();
                // })
                // .catch(() => {
                //     ElMessage({ type: 'info', message: '已取消删除' });
                // })
        },
        getone(){
            let data ={};
            interviewtypegetone(data).then(res=>{
                const page = res;
                this.ites = page;
            }).catch(err => {
                ElMessage('网络错误联系管理员');
                return false;
                
            })

        },
        
    }





});

</script>
<style lang="scss" scoped>
.itt2 {
    margin: 10px;
    height: 100px;

}

.b1 {
    background-color: beige;

}    

</style>

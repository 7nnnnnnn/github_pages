<template>
  <div class="head">
      <el-button link type="primary" size="small" @click="adduserinfo">添加一个用户</el-button>
      <el-table :data="userinfo" style="width: 100%">
          <el-table-column fixed prop="user_name" label="用户账号" width="150" />
          <el-table-column prop="password" label="密码" width="120" />
          <el-table-column prop="user_type" label="学生,教师,教学辅助,管理员,后勤" width="120" />
          <el-table-column prop="deleted" label="标记删除" width="120" />
          <el-table-column prop="state" label="状态 1激活 0未激活" width="120" />
          <el-table-column prop="binding" label="绑定：学生,教师,教辅,后勤1绑定 0 未绑定" width="120" />
          <el-table-column prop="email" label="邮箱" width="120" />
          <el-table-column prop="mobile" label="移动电话" width="120" />
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

  <el-dialog v-model="DialogVisible" title="添加用户" width="50%" center>
      <el-form :model="userinfo">
          <el-form-item label="用户账号" :label-width="formLabelWidth">
              <el-input v-model="userinfo.user_name" autocomplete="off" />
          </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth">
              <el-input v-model="userinfo.password" autocomplete="off" />
          </el-form-item>
          <el-form-item label="学生,教师,教学辅助,管理员,后勤" :label-width="formLabelWidth">
              <el-input v-model="userinfo.user_type" autocomplete="off" />
          </el-form-item>
          <el-form-item label="标记删除" :label-width="formLabelWidth">
              <el-input v-model="userinfo.deleted" autocomplete="off" />
          </el-form-item>
          <el-form-item label="状态 1激活 0未激活" :label-width="formLabelWidth">
              <el-input v-model="userinfo.state" autocomplete="off" />
          </el-form-item>          
          <el-form-item label="绑定：学生,教师,教辅,后勤1绑定 0 未绑定" :label-width="formLabelWidth">
              <el-input v-model="userinfo.binding" autocomplete="off" />
          </el-form-item>
          <el-form-item label="邮箱" :label-width="formLabelWidth">
              <el-input v-model="userinfo.email" autocomplete="off" />
          </el-form-item>
          <el-form-item label="移动电话" :label-width="formLabelWidth">
              <el-input v-model="userinfo.mobile" autocomplete="off" />
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
  <el-dialog v-model="EditDialogVisible" title="修改宿舍" width="50%" center>
    <el-form :model="userinfo">
          <el-form-item label="用户账号" :label-width="formLabelWidth">
              <el-input v-model="userinfo.user_name" autocomplete="off" />
          </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth">
              <el-input v-model="userinfo.password" autocomplete="off" />
          </el-form-item>
          <el-form-item label="学生,教师,教学辅助,管理员,后勤" :label-width="formLabelWidth">
              <el-input v-model="userinfo.user_type" autocomplete="off" />
          </el-form-item>
          <el-form-item label="标记删除" :label-width="formLabelWidth">
              <el-input v-model="userinfo.deleted" autocomplete="off" />
          </el-form-item>
          <el-form-item label="状态 1激活 0未激活" :label-width="formLabelWidth">
              <el-input v-model="userinfo.state" autocomplete="off" />
          </el-form-item>          
          <el-form-item label="绑定：学生,教师,教辅,后勤1绑定 0 未绑定" :label-width="formLabelWidth">
              <el-input v-model="userinfo.binding" autocomplete="off" />
          </el-form-item>
          <el-form-item label="邮箱" :label-width="formLabelWidth">
              <el-input v-model="userinfo.email" autocomplete="off" />
          </el-form-item>
          <el-form-item label="移动电话" :label-width="formLabelWidth">
              <el-input v-model="userinfo.mobile" autocomplete="off" />
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
import { getalldormitory, addDormitory, getonedormitory, deleteDormitory, editDormitory } from "@/http/dormitory"//在http的文件夹里index.js 是相对应的
import { cloneDeep } from 'lodash-es'
import { ElMessage, ElMessageBox } from 'element-plus';
export default defineComponent({
    data() {
        return {
            dormitorys: [],//自己取
            pageinfo: {
                "currentPage": 1,
                "pageSize": 5,
                "totalpage": 10
            },
            dormitory: {//自己取 里面的内容就是老师提供的表，在那个api文档也可以看 可以直接cv 我的视频有说
                "id": 0,
                "comment": "",
                "name": "",
                "leader": 0,
                "leftNumber": 0,
                "liveNumber": 0,
                "maxNumber": 0,
                "building": "",
                "school": "",
                "status": 0,
                "type": 0
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
            console.log("2#A211".slice(3,6))
            const a="2#A211".split("")
            console.log(parseInt("2")+1)
        },
        getid(name){
            const arr=name.split("");
            if(arr[2]=="A"){
                return 1000+parseInt(name.slice(3,6))
            }else{
                return 2000+parseInt(name.slice(3,6))
            }
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
            this.getdormitorys();//记得改 改成和 176行一样的名字，都以176行的名字改
            //console.log(this.dormitory)
        },
        //获取老师那个api库的内容函数 没有数据得自己加
        getdormitorys() {
            let start = this.pageinfo.pageSize * (this.pageinfo.currentPage - 1);
            let end = this.pageinfo.currentPage * this.pageinfo.pageSize;

            getalldormitory().then(res => {
                //const sortedDormitorys = res.data.dormitories
                if (res.success) {
                    this.dormitorys = res.data.dormitories.slice(start, end);//去浏览器的控制台看名字 我发的视频里也有
                    this.pageinfo.totalpage = res.data.dormitories.length;
                    ElMessage(res.msg)
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
        adduserinfo() {
            //除了第211行，其他的够可以删了202到210行
            this.userinfo.comment;
            this.userinfo.name ;
            this.userinfo.maxNumber ;
            this.userinfo.leftNumber ;
            this.userinfo.liveNumber ;
            this.userinfo.status ;
            this.userinfo.school ;
            this.userinfo.type ;
            this.userinfo.building;
            this.DialogVisible = true
        },
        //第64行 改名记得一起改
        confirmAdd() {

            const one = this.dormitory;//第128行 记得改，等号左边的随便取，改了的话下面一行也得改，里面的参数
            one.id=this.getid(this.dormitory.name)
            addDormitory(one).then(res => {//第116行 记得一起改 
                this.getdormitorys()//174行 记得改
                //console.log(res);
            }).catch(err => {
                console.log(err);
            })
            this.DialogVisible = false
        },
       
        //修改 这个在18行，要改名记得看一下，edit()括号里的参数名随便取
        edit(dormitory) {
            //console.log(dormitory)
            this.EditDialogVisible = true;
            this.dormitory = cloneDeep(dormitory);//这个cloneDeep括号里的参数要对应edit括号里的参数，在295行

        },
        //在第106行 改名要一起改
        confirmEdit() {
            let dormitory = this.dormitory; //等号左边的变量名随便取，右边的名字和第128行的对象名一样，有改名记得一起改
            console.log(dormitory)
            editDormitory(dormitory).then(res => {//这个函数在116行 改名记得一起
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
                        message: '在考虑一下',
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

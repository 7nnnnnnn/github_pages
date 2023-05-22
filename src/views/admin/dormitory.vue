<template>
    <div class="head">
        <el-button link type="primary" size="small" @click="adddormitory">添加一个宿舍</el-button>
        <el-table :data="dormitorys" style="width: 100%">
            <el-table-column fixed prop="id" label="宿舍编号" width="150" />
            <el-table-column prop="name" label="宿舍名" width="120" />
            <el-table-column prop="leader" label="宿舍长" width="120" />
            <el-table-column prop="maxNumber" label="总床位数" width="120" />
            <el-table-column prop="leftNumber" label="空床位数" width="120" />
            <el-table-column prop="liveNumber" label="入住人数" width="120" />
            <el-table-column prop="status" label="宿舍入住情况" width="120" />
            <el-table-column prop="comment" label="备注" width="120" />
            <el-table-column prop="school" label="学校" width="120" />
            <el-table-column prop="type" label="宿舍类型" width="120" />
            <el-table-column prop="building" label="建筑名" width="120" />
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

    <el-dialog v-model="DialogVisible" title="添加宿舍" width="50%" center>
        <el-form :model="dormitory">
            <el-form-item label="宿舍名" :label-width="formLabelWidth">
                <el-input v-model="dormitory.name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="宿舍长" :label-width="formLabelWidth">
                <el-input v-model="dormitory.leader" autocomplete="off" />
            </el-form-item>
            <el-form-item label="总床位数" :label-width="formLabelWidth">
                <el-input v-model="dormitory.maxNumber" autocomplete="off" />
            </el-form-item>
            <el-form-item label="空床位数" :label-width="formLabelWidth">
                <el-input v-model="dormitory.leftNumber" autocomplete="off" />
            </el-form-item>
            <el-form-item label="入住人数" :label-width="formLabelWidth">
                <el-input v-model="dormitory.liveNumber" autocomplete="off" />
            </el-form-item>
            <el-form-item label="宿舍入住情况" :label-width="formLabelWidth">
                <el-input v-model="dormitory.status" autocomplete="off" />
            </el-form-item>
            <el-form-item label="备注" :label-width="formLabelWidth">
                <el-input v-model="dormitory.comment" autocomplete="off" />
            </el-form-item>
            <el-form-item label="学校" :label-width="formLabelWidth">
                <el-input v-model="dormitory.school" autocomplete="off" />
            </el-form-item>
            <el-form-item label="宿舍类型" :label-width="formLabelWidth">
                <el-input v-model="dormitory.type" autocomplete="off" />
            </el-form-item>
            <el-form-item label="建筑名" :label-width="formLabelWidth">
                <el-input v-model="dormitory.building" autocomplete="off" />
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
        <el-form :model="dormitory">
            <el-form-item label="宿舍名" :label-width="formLabelWidth">
                <el-input v-model="dormitory.name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="宿舍长" :label-width="formLabelWidth">
                <el-input v-model="dormitory.leader" autocomplete="off" />
            </el-form-item>
            <el-form-item label="总床位数" :label-width="formLabelWidth">
                <el-input v-model="dormitory.maxNumber" autocomplete="off" />
            </el-form-item>
            <el-form-item label="空床位数" :label-width="formLabelWidth">
                <el-input v-model="dormitory.leftNumber" autocomplete="off" />
            </el-form-item>
            <el-form-item label="入住人数" :label-width="formLabelWidth">
                <el-input v-model="dormitory.liveNumber" autocomplete="off" />
            </el-form-item>
            <el-form-item label="宿舍入住情况" :label-width="formLabelWidth">
                <el-input v-model="dormitory.status" autocomplete="off" />
            </el-form-item>
            <el-form-item label="备注" :label-width="formLabelWidth">
                <el-input v-model="dormitory.comment" autocomplete="off" />
            </el-form-item>
            <el-form-item label="学校" :label-width="formLabelWidth">
                <el-input v-model="dormitory.school" autocomplete="off" />
            </el-form-item>
            <el-form-item label="宿舍类型" :label-width="formLabelWidth">
                <el-input v-model="dormitory.type" autocomplete="off" />
            </el-form-item>
            <el-form-item label="建筑名" :label-width="formLabelWidth">
                <el-input v-model="dormitory.building" autocomplete="off" />
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
        adddormitory() {
            //除了第211行，其他的够可以删了202到210行
            this.dormitory.comment = '宿舍编号第一个数字1代表A面,2代表B面,后面三位代表门牌号';
            this.dormitory.name = '2#';
            this.dormitory.maxNumber = 6;
            this.dormitory.leftNumber = 0;
            this.dormitory.liveNumber = 6;
            this.dormitory.status = 1;
            this.dormitory.school = '泉州信息工程学院';
            this.dormitory.type = 0;
            this.dormitory.building = '2号楼';
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
        //下面这个不用看 要删掉也可以
        adds() {
            let onedot = this.dormitory;
            onedot.comment = '宿舍编号第一个数字1代表A面,2代表B面,后面三位代表门牌号';
            
            onedot.maxNumber = 6;
            onedot.leftNumber = 0;
            onedot.liveNumber = 6;
            onedot.status = 1;
            onedot.school = '泉州信息工程学院';
            onedot.type = 0;
            onedot.building = '2号楼';
            for(let i=1;i<=10;i++){
                for(let j=1;j<=22;j++){
                    
                    switch(i){
                        case 1:if(j<10){onedot.name="2#A2"+0+j}else{onedot.name="2#A2"+j};
                        onedot.id=1200+j;
                        addDormitory(onedot);
                        //this.getdormitorys()
                        break;
                        case 2:if(j<10){onedot.name="2#B2"+0+j}else{onedot.name="2#B2"+j};
                        onedot.id=2200+j;
                        addDormitory(onedot);
                        //this.getdormitorys()
                        break;
                        case 3:if(j<10){onedot.name="2#A3"+0+j}else{onedot.name="2#A3"+j};
                        onedot.id=1300+j;
                        addDormitory(onedot);
                        //this.getdormitorys()
                        break;
                        case 4:if(j<10){onedot.name="2#B3"+0+j}else{onedot.name="2#B3"+j};
                        onedot.id=2300+j;
                        addDormitory(onedot);
                        //this.getdormitorys()
                        break;
                        case 5:if(j<10){onedot.name="2#A4"+0+j}else{onedot.name="2#A4"+j};
                        onedot.id=1400+j;
                        addDormitory(onedot);
                        //this.getdormitorys()
                        break;
                        case 6:if(j<10){onedot.name="2#B4"+0+j}else{onedot.name="2#B4"+j};
                        onedot.id=2400+j;
                        addDormitory(onedot);
                        //this.getdormitorys()
                        break;
                        case 7:if(j<10){onedot.name="2#A5"+0+j}else{onedot.name="2#A5"+j};
                        onedot.id=1500+j;
                        addDormitory(onedot);
                        //this.getdormitorys()
                        break;
                        case 8:if(j<10){onedot.name="2#B5"+0+j}else{onedot.name="2#B5"+j};
                        onedot.id=2500+j;
                        addDormitory(onedot);
                        //this.getdormitorys()
                        break;
                        case 9:if(j<10){onedot.name="2#A6"+0+j}else{onedot.name="2#A6"+j};
                        onedot.id=1600+j;
                        addDormitory(onedot);
                        //this.getdormitorys()
                        break;
                        case 10:if(j<10){onedot.name="2#B6"+0+j}else{onedot.name="2#B6"+j};
                        onedot.id=2600+j;
                        addDormitory(onedot);
                        //this.getdormitorys()
                        break;
                        
                    }
                    

                }
            }
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

<template>
    
    <div>
    	<input type="text" menuName="" id="" placeholder="搜索" v-model="search"/> 
  	<button @click="menuOne">搜索</button>
  	<ul v-for="list in searchData">
  		<li>
  			<span>{{list.menuName}}</span>
  			<span>{{list.id}} </span>
  		
  		</li>
  	</ul>


  </div>
    
    <div class="menus">
        <div class="menuall-tools">
            <el-button type="warning" @click="toAdd">添加</el-button>
        </div>
        <el-table :data="menus" style="width: 100%">
            <el-table-column fixed prop="id" width="150" />
            <el-table-column prop="menuName" label="menuName" width="120" />
            <el-table-column prop="menuUrl" label="menuUrl" width="120" />
            <el-table-column prop="pid" label="pid" width="120" />
            <el-table-column prop="menuSort" label="menuSort" width="120" />
            <el-table-column prop="description" label="description" width="120" />
            <el-table-column prop="hasChildren" label="hasChildren" width="120" />
            <el-table-column fixed="right" label="功能管理" width="120">
                <template #default="scope">
                    <el-button link type="primary" size="small" @click="toEdit(scope.row)">更新</el-button>
                    <el-button v-confirm='您确定要删除吗' v-on:click="handleDelete" link type="primary" size="small" @click="del(scope.row.id)">删除</el-button>
                </template>

            </el-table-column>
        </el-table>
        <el-pagination layout="prev, allr, next" :all-size="all.size"  :total="all.total" @current-change="currentchange" />
    </div>
    <el-dialog v-model="dialogFormVisible" title="menuName编辑">
    <el-form :model="menu">
      <el-form-item label="menuName" :label-width="formLabelWidth">
        <el-input v-model="menu.menuName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="menuUrl" :label-width="formLabelWidth">
        <el-input v-model="menu.menuUrl" autocomplete="off" />
    </el-form-item>
    <el-form-item label="pid" :label-width="formLabelWidth">
        <el-input v-model="menu.pid" autocomplete="off" />
    </el-form-item>
    <el-form-item label="menuSort" :label-width="formLabelWidth">
        <el-input v-model="menu.menuSort" autocomplete="off" />
    </el-form-item><el-form-item label="description" :label-width="formLabelWidth">
        <el-input v-model="menu.description" autocomplete="off" />
    </el-form-item><el-form-item label="hasChildren" :label-width="formLabelWidth">
        <el-input v-model="menu.hasChildren" autocomplete="off" />
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
import { menuall,menuAdd,menuDelId,menuEdit,menuOne } from '../../http/frontend-menu';
import { cloneDeep } from 'lodash-es';
export default defineComponent({
    directives: {
    confirm: {
      bind: function (el, binding) {
        el.addEventListener('click', function () {
          if (confirm(binding.value)) {
            binding.arg()
          }
        })
      }
    }
  },

    data(){
        return{
            searchText:'',
            search:'',
            searchData: [], 
            newList: [],
            menus:[],
            all:{
                total:0,
                current:1,
                size:10
            },
            dialogFormVisible:false,
            menu:{
                "menuUrl":"",
                "id":"",
                "menuName":"",
                "pid":"",
                "menuSort":"", 
                "description":"", 
                "hasChildren":"",
                
            },  
            formLabelWidth:80
        }
    },
    mounted(){
        this.getmunes(1)
    },
    methods:{
        handleDelete() {
      // 执行删除操作
    },

        toEdit(menu){
            console.log(menu)
            this.dialogFormVisible=true;
            this.menu=cloneDeep(menu);
        },

        getmunes(current){
            const data={
                current:current,
                size:2
            }

            menuall(data).then(res=>{
                console.log(res);
                const communities=res.data.communities;
                this.menus=communities;
                this.communities=communities;
            }).catch(err=>{
                console.log(err);
            })
        },
        currentchange(current){
            // console.log(current);
            this.getmunes(current);
            this.all.current=current;//数据更新到目前显示的页面
        },
        del(id){
            if (confirm("您确认要删除吗") == true) 
                console.log(id);
            console.log(id);
            const params = {
                id:id
        }
        menuDelId(params).then(res=>{
            if(res.success){
                this.getmunes(this.all.current)
            }else{
                console.log(res.msg);
                return false
            }
            }).catch(err=>{
                
            })
        },
        toAdd(){
            this.dialogFormVisible=true;
            this.newmenu={
                "menuUrl":"",
                "id":1,
                "name":"",
                "pid":"",
                "menuSort":"", 
                "description":"", 
                "hasChildren":"",
            } ,this.newList.push(newmenu);
        },
        menuOnen() {
            if(this.searchText===''||this.searchText==null){
                        this.searchData=JSON.parse(JSON.stringify(this.searchData));
                        return;
                    }
                    //搜索
                    let list=this.searchData.filter(item=>item.indexOf(this.searchText)>=0);
                    this.searchData=list;
                    
                },
                reset(){
                    this.searchData=JSON.parse(JSON.stringify(this.menu))
                },
        save(){
            const menu= this.menu
            if (menu.id==0) {
                menuAdd(menu).then(res=>{
            if (res.success) {
                this.dialogFormVisible=false
                this.getmunes(this.all.current)
                ElMessage(res.msg)
            }else{
                ElMessage(res.msg)
                return false
            }
        }).catch(err=>{
            ElMessage('网络错误联系管理员')
        })
            }
            else{
                menuEdit(menu).then(res=>{
            if (res.success) {
                this.dialogFormVisible=false
                this.getmunes(this.all.current)
                ElMessage(res.msg)
            }else{
                ElMessage(res.msg)
                return false
            }

            }).catch(err=>{
                ElMessage('网络错误联系管理员')
            })
            }
        }
    }
});
</script>
<style lang = "scss" scoped></style>
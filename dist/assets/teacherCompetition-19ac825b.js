import{_ as x,e as E,E as m,o as f,c as S,a as d,b as o,z as N,w as s,t as P,G as k,F,n as I,g as z,h as L,j as T,k as A,l as u,m as B,u as D,s as O,p as q,q as j}from"./index-db1a1148.js";/* empty css                        *//* empty css                 */import{a as h}from"./competition-9334a145.js";import{g as J}from"./student-24caf182.js";const K={data(){return{one:!0,two:!1,ids:"",levels:[{label:"国际级",value:"国际级"},{label:"国家级",value:"国家级"},{label:"省级",value:"省级"},{label:"市级",value:"市级"},{label:"校级",value:"校级"},{label:"院级",value:"院级"}],competitiones:[],competitionesqu:[],page:{total:0,current:1,schoolId:1,size:10},dialogFormVisible:!1,dialogVisible:!1,competition:{studentName:""},formLabelWidth:110,currentPage:1,pageSize:6,searchText:"",apiList:[],schools:[],all:[],row:{},student:[]}},created(){this.getCompetitionPage(1)},mounted(){},computed:{paginatedData(){const e=(this.currentPage-1)*this.pageSize,t=e+this.pageSize;return this.filteredApiList.slice(e,t)},filteredApiList(){return this.searchText&&this.apiList?this.apiList.filter(e=>e.name==this.searchText):this.apiList},schoolIds(){return e=>{let t="",l=this.schools.filter(c=>c.id==e.schoolId)[0];return l&&(t=l.schoolName),t}}},methods:{application(e){this.row=e,this.dialogFormVisible=!0},getAll(){J().then(e=>{console.log(e),this.all=e.data.students}).catch(e=>{console.log(e)})},async school(){let{data:e}=await h.school();this.schools=e.schools},handlePageChange(e){this.currentPage=e},clearSearch(){this.searchText=""},toEdit(e){console.log(e),this.dialogFormVisible=!0,this.competition=E(e)},getCompetitionPage(e){let t=localStorage.getItem("student");t&&(this.apiList=JSON.parse(t))},currentchange(e){this.getCompetitionPage(e),this.page.current=e},del(e){console.log(e);const t={id:e};h.competitionDelId(t).then(l=>{if(l.success)this.getCompetitionPage(this.page.current),m.success("操作成功");else return console.log(l.msg),!1}).catch(l=>{})},toAdd(){this.dialogFormVisible=!0,this.competition={id:0,name:"",start:"",end:"",homePage:"",type:"",level:"",organizer:"",schoolId:""}},souos(e){console.log(e);const t={id:e};h.competitionOne(t).then(l=>{if(l.success){console.log(l);const c=l.data.competition;this.competitionesqu=c.competition,this.one=!1,this.two=!0}else console.log(l.msg),m("没有这个编号"),this.one=!0,this.two=!1}).catch(l=>{m("没有这个编号")})},save(){let e=JSON.parse(localStorage.getItem("student"));e.forEach(t=>{t.name==this.row.name&&(t.status=this.competition.studentName)}),localStorage.setItem("student",JSON.stringify(e)),m.success("修改成功"),this.dialogFormVisible=!1,this.getCompetitionPage()}}},U={style:{display:"flex","justify-content":"space-between"}},W={class:"competitiones"},G={class:"dialog-footer"};function M(e,t,l,c,a,n){const _=I,p=z,r=B,b=L,C=T,g=D,V=O,y=q,v=j,w=A;return f(),S(F,null,[d("div",U,[o(_,{modelValue:a.searchText,"onUpdate:modelValue":t[0]||(t[0]=i=>a.searchText=i),placeholder:"请输入搜索关键字",clearable:"",onClear:n.clearSearch,onKeyup:N(e.performSearch,["enter"]),style:{width:"300px"}},null,8,["modelValue","onClear","onKeyup"]),o(p,{style:{"margin-right":"50px"},type:"primary",onClick:t[1]||(t[1]=i=>e.$router.go(-1))},{default:s(()=>[u("返回")]),_:1})]),d("div",W,[a.one?(f(),P(b,{key:0,data:n.paginatedData,style:{width:"100%"}},{default:s(()=>[o(r,{prop:"title",label:"竞赛名称"}),o(r,{prop:"schoolName",label:"学校"}),o(r,{prop:"name",label:"竞赛负责人"}),o(r,{prop:"status",label:"状态"}),o(r,{fixed:"right",label:"操作",width:"120"},{default:s(i=>[o(p,{link:"",type:"primary",size:"small",onClick:H=>n.application(i.row)},{default:s(()=>[u("审核")]),_:2},1032,["onClick"])]),_:1})]),_:1},8,["data"])):k("",!0),o(C,{"current-page":a.currentPage,"page-size":a.pageSize,total:n.filteredApiList.length,onCurrentChange:n.handlePageChange},null,8,["current-page","page-size","total","onCurrentChange"])]),o(w,{modelValue:a.dialogFormVisible,"onUpdate:modelValue":t[4]||(t[4]=i=>a.dialogFormVisible=i),title:"报名信息"},{footer:s(()=>[d("span",G,[o(p,{onClick:t[3]||(t[3]=i=>a.dialogFormVisible=!1)},{default:s(()=>[u("取消")]),_:1}),o(p,{type:"primary",onClick:n.save},{default:s(()=>[u(" 保存 ")]),_:1},8,["onClick"])])]),default:s(()=>[o(v,{model:a.competition},{default:s(()=>[o(y,{label:"审核","label-width":a.formLabelWidth},{default:s(()=>[o(V,{modelValue:a.competition.studentName,"onUpdate:modelValue":t[2]||(t[2]=i=>a.competition.studentName=i)},{default:s(()=>[o(g,{label:"通过",value:"通过"}),o(g,{label:"驳回",value:"驳回"})]),_:1},8,["modelValue"])]),_:1},8,["label-width"])]),_:1},8,["model"])]),_:1},8,["modelValue"])],64)}const $=x(K,[["render",M]]);export{$ as default};

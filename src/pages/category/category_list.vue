<template>
    <div id="category">
        <!-- 按钮 -->
        <el-button type="primary" @click="modalshow">添加分类</el-button>
        <el-button type="danger" @click="pi_deletehandler">批量删除</el-button>
        <!-- 搜索 -->
                <!-- {{page_data}} {{form}} -->
        <el-form class="serch_btn" @submit.prevent>
            <el-form-item>
                <el-row>
                    <el-col :span="4">
                        <el-input clearable placeholder="输入搜索内容" v-model="search_data.name" @keydown.prevent @keyup.prevent @keypress.prevent @submit.prevent></el-input>
                    </el-col>
                    <!-- <el-col :span="1">
                        -
                    </el-col> -->
                    <el-col :span="2">
                        <el-button type="success" @click="searchhandler">搜索</el-button>
                    </el-col>
                </el-row>
                
                
            </el-form-item>
        </el-form>
        <!-- 表格 -->
        <el-table v-loading="myloading" 
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        :data="categorys.list" border @selection-change = "handleSelectionChange">
            <el-table-column type="selection" label="#" align="center" width="55px"></el-table-column>
            <el-table-column label="姓名" prop="name" align="center"></el-table-column>
            <el-table-column label="序号" prop="num" align="center"></el-table-column>
            <el-table-column label="图标" prop="icon" align="center">
                <template #default="bb">
                    <img :src="bb.row.icon" style="width:100px;" alt="无图">
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="300px">
                <template #default="aa">
                    <el-button type="warning" size="small" @click="modifyhandler(aa.row)">修改</el-button>
                    <el-button type="danger" size="small" @click="deletehandler(aa.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 翻页 -->
            <el-pagination
            @current-change="pagechange"
            background
            layout="prev, pager, next"
            :current-page="page_data.page + 1"
            :page-size="page_data.pageSize"
            :total="total">
            </el-pagination>
        <!-- modal -->
            <el-dialog :title="title" :visible.sync="modalval" width="30%" @close="modalclose">
                <el-form :model="form" :rules="rules" ref="categoryForm" class="demo-form">
                    <el-form-item label="类名" prop="name" label-width="100px">
                        <el-input v-model="form.name" autocomplete="off" placeholder="输入2-10长度"></el-input>
                    </el-form-item>
                    <el-form-item label="序号" prop="num" label-width="100px">
                        <el-input v-model="form.num" autocomplete="off" placeholder="输入数字"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="图标" prop="icon" label-width="100px">
                        <el-input v-model="form.icon" autocomplete="off"></el-input>
                    </el-form-item> -->
                    <el-form-item label="图片" prop="photo" label-width="100px" placeholder="上传图片地址">

                        <el-upload
                        class="upload-demo"
                        action="http://134.175.154.93:6677/file/upload"
                        :on-success="uploadSuccesshandler"
                        :file-list="fileList"
                        list-type="picture">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload>

                    </el-form-item>

                </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="modalclose">取 消</el-button>
                <el-button type="primary" @click="submithandler">确 定</el-button>
            </div>
            </el-dialog>      
        <!-- /modal -->
    </div>
</template>

<script>
import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'

export default {
    data(){
        return {
            myloading:true,
            page_data:{
                page:0,
                pageSize:5,
                name:""
            },
            total:new Number,
            search_data:{
                name:""
            },
            form:{},
            ids:[],
            rules:{
                name:[
                    { required: true, message: '请输入类名', trigger: 'blur' },
                    { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' },
                ],
                num:[
                    {required:true,message:'请输入序号',trigger:'blur'}
                    // {type:Number,message:'请输入数字',trigger:'blur'}
                ]
            },
            fileList:[]
        }
    },
    created(){
        this.findAllCategory(this.page_data)
        
        setTimeout(() => {
            this.total = this.categorys.total
            this.myloading = false
        }, 1000);
        
    },
    computed:{
        ...mapState("category",["categorys","modalval","title"])
    },
    methods:{
        ...mapActions("category",["findAllCategory","modalVal","saveOrUpdate","deleteById","batchDelete","modifyTitle"]),
        ...mapMutations("category",[]),

        //普通方法
        pagechange(page){
            this.page_data.page = page - 1
            this.findAllCategory(this.page_data)
        },
        searchhandler(){
            this.page_data.name = this.search_data.name
            this.findAllCategory(this.page_data)
            setTimeout(() => {
                this.total = this.categorys.total
            }, 1000);
        },
        modalshow(){
            this.modifyTitle("New Category")
            this.form = {}
            this.fileList = []
            this.modalVal(true)
            
        },
        modalclose(){
            this.$refs.categoryForm.resetFields();
            this.modalVal(false)
            // this.form = {}
            let old_page_data = this.page_data
            this.findAllCategory(old_page_data)
        },
        async submithandler(){
        this.$refs.categoryForm.validate(async(valid) => {
          if (valid) {
            await this.saveOrUpdate(this.form)
            await this.modalclose()

            let old_page_data = {}
            // if(this.total % 5 == 0){alert(1);old_page_data = this.page_data; old_page_data.page++;}
            // else{old_page_data = this.page_data}
            await this.findAllCategory()
            .then((re)=>{
                // alert(JSON.stringify(re))
                this.total = re.data.total
                this.$message({type:'success',message:"提交成功"})
                this.form = {}
            })
            this.page_data.page = 0
            
          } else {
            return false;
          }
        });
        },
        // },
        modifyhandler(data){
            this.modalshow()
            this.modifyTitle("Modify")
            this.form = data
            this.fileList.push({
                name:"j",
                url:data.icon
            })
        },
        async deletehandler(id){
            await this.deleteById(id)
            await this.findAllCategory()
            .then((re)=>{
                this.total = re.data.total
                this.$message({type:'success',message:"删除成功"})
            })
            this.page_data.page = 0
        },
        handleSelectionChange(val){
            // alert(JSON.stringify(val.map(item=>item.id)))
            this.ids = val.map(item=>item.id)
        },
        async pi_deletehandler(){
            await this.batchDelete(this.ids)
            .then((re)=>{
                alert(JSON.stringify(re))
                // this.total = re.data.list.total
                this.$message({type:'success',message:"批量删除成功"})
            })
            await this.findAllCategory()
            .then((re)=>{
                this.total = re.data.list.total
            })
            this.page_data.page = 0
        },
        uploadSuccesshandler(res,file,fileList){
            // console.log("a:",res,"b:",file,"c:",fileList)
            // this.fileList = Object.assign({},fileList)

            let id = res.data.id
            let groupname = res.data.groupname
            let url = "http://134.175.154.93:8888/"+groupname+"/"+id
            this.form.icon = url
        }
    }
}
</script>

<style scoped>
    .serch_btn{
        margin-top: 20px;
    }
    /* .el-dialog__headerbtn {
        display: none!important;
    } */
</style>
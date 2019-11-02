<template>
    <div id="customer">
        <!-- 按钮 -->
        <!-- <el-button type="primary" @click="modalshow">添加顾客</el-button> -->
        <!-- <el-button type="danger" @click="pi_deletehandler">批量删除</el-button> -->
        <!-- 搜索 -->
                <!-- {{page_data}} --> 
        <el-form class="serch_btn" @submit.prevent>
            <el-form-item>
                <el-row>
                    <el-col :span="4">
                        <el-input clearable placeholder="输入搜索内容" v-model="search_data.realname" @keydown.prevent @keyup.prevent @keypress.prevent @submit.prevent></el-input>
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
        
        :data="customers.list" border @selection-change = "handleSelectionChange">
            <el-table-column type="selection" label="#" align="center" width="55px"></el-table-column>
            <el-table-column label="姓名" prop="realname" align="center"></el-table-column>
            <el-table-column label="电话" prop="telephone" align="center"></el-table-column>
            <el-table-column label="状态" prop="status" align="center"></el-table-column>
            <el-table-column label="详情" align="center" width="120">
                <template #default="xq">
                    <div>
                        <el-button type="text" @click="xqhandler(xq.row.id)">详情</el-button>
                    </div>
                </template>
            </el-table-column>
            <!-- <el-table-column label="操作" align="center" width="300px">
                <template #default="aa"> -->
                    <!-- <el-button type="warning" size="small" @click="modifyhandler(aa.row)">修改</el-button>
                    <el-button type="danger" size="small" @click="deletehandler(aa.row.id)">删除</el-button> -->
<!-- 
                    <el-button type="info" size="small" @click="laheihandler(aa.row)">拉黑</el-button>
                </template>
            </el-table-column> -->
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
                <el-form :model="form" :rules="rules" ref="customerForm" class="demo-form">
                    <!-- <el-form-item label="姓名" prop="realname" label-width="100px">
                        <el-input v-model="form.realname" autocomplete="off" placeholder="输入2-5长度的名字"></el-input>
                    </el-form-item>
                    <el-form-item label="电话" prop="telephone" label-width="100px">
                        <el-input v-model="form.telephone" autocomplete="off" placeholder="输入11位的手机号"></el-input>
                    </el-form-item>
                    <el-form-item label="照片" prop="photo" label-width="100px">
                        <el-input v-model="form.photo" autocomplete="off"></el-input>
                    </el-form-item> -->

                    <el-form-item label="状态" prop="status" label-width="100px">
                        <el-select v-model="form.status" placeholder="请选择活动区域">
                            <el-option label="正常" value="正常"></el-option>
                            <el-option label="拉黑" value="拉黑"></el-option>
                        </el-select>
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
                realname:""
            },
            total:new Number,
            search_data:{
                realname:""
            },
            form:{},
            ids:[],
            rules:{
                realname:[
                    { required: true, message: '请输入姓名', trigger: 'blur' },
                    { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' },
                ],
                telephone:[
                    {required:true,message:'请输入电话',trigger:'blur'},
                    {min:11,max:11,message:'请输入正确的手机号码',trigger:'blur'}
                ]
            },
        }
    },
    created(){
        this.findAllCustomer(this.page_data)
        
        setTimeout(() => {
            this.total = this.customers.total
            this.myloading = false
        }, 1000);
        
    },
    computed:{
        ...mapState("customer",["customers","modalval","title","loading"]),

    },
    methods:{
        ...mapActions("customer",["findAllCustomer","modalVal","saveOrUpdate","deleteById","batchDelete","modifyTitle"]),
        ...mapMutations("customer",["openLoading","closeLoading"]),

        //普通方法
        pagechange(page){
            this.page_data.page = page - 1
            this.findAllCustomer(this.page_data)
        },
        searchhandler(){
            this.page_data.realname = this.search_data.realname
            this.findAllCustomer(this.page_data)
            setTimeout(() => {
                this.total = this.customers.total
            }, 1000);
        },
        modalshow(){
            this.modifyTitle("New Customer")
            this.form = {}
            this.modalVal(true)
        },
        modalclose(){
            this.$refs.customerForm.resetFields();

            this.modalVal(false)
            // this.form = {}
        },
        async submithandler(){
        this.$refs.customerForm.validate(async(valid) => {
          if (valid) {
            await this.saveOrUpdate(this.form)
            await this.modalclose()
            await this.findAllCustomer()
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
        modifyhandler(data){
            this.modalshow()
            this.modifyTitle("Modify")
            this.form = data
        },
        async deletehandler(id){
            await this.deleteById(id)
            await this.findAllCustomer()
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
                // alert(JSON.stringify(re))
                this.$message({type:'success',message:"批量删除成功"})
            })
            await this.findAllCustomer()
            this.page_data.page = 0
        },
        xqhandler(id){
            // this.$router.push('/customer_xq')
            this.$router.push({
                path:'/customer/customer_xq',
                query:{id}
            })
        },
        laheihandler(v){
            this.form = v
            this.modalshow()
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
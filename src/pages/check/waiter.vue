<template>
    <div id="waiter">
        <!-- 按钮 -->
        <!-- <el-button type="primary" @click="modalshow">添加员工</el-button> -->
        <!-- <el-button type="danger" @click="pi_deletehandler">批量删除</el-button> -->
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
        :data="waiters.list" border @selection-change = "handleSelectionChange">
            <el-table-column type="selection" label="#" align="center" width="55px"></el-table-column>
            <el-table-column label="姓名" prop="realname" align="center"></el-table-column>
            <el-table-column label="电话" prop="telephone" align="center"></el-table-column>
            <!-- <el-table-column label="密码" prop="password" align="center"></el-table-column> -->
            <el-table-column label="idcard" prop="idcard" align="center"></el-table-column>
            <el-table-column label="图片" prop="photo" align="center">
                <template #default="bb">
                    <img :src="bb.row.photo" style="150px;" alt="无图">
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="300px">
                <template #default="aa">
                    <!-- <el-button type="warning" size="small" @click="modifyhandler(aa.row)">修改</el-button> -->
                    <!-- <el-button type="danger" size="small" @click="deletehandler(aa.row.id)">删除</el-button> -->
                    
                    <el-button v-if="aa.row.password.slice(-1)!=='T'" type="danger" size="small" @click="FREEZEhandler(aa.row)">冻结账号</el-button>
                    <el-button v-else type="success" size="small" @click="noFREEZEhandler(aa.row)">恢复</el-button>

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
                <el-form :model="form" :rules="rules" ref="waiterForm" class="demo-form">
                    <el-form-item label="姓名" prop="realname" label-width="100px">
                        <el-input v-model="form.realname" autocomplete="off" placeholder="输入2-10长度的名字"></el-input>
                    </el-form-item>
                    <el-form-item label="电话" prop="telephone" label-width="100px">
                        <el-input v-model="form.telephone" autocomplete="off" placeholder="最多输入30个字符"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password" label-width="100px">
                        <el-input type="password" v-model="form.password" autocomplete="off" placeholder="输入价格￥"></el-input>
                    </el-form-item>
                    <el-form-item label="idcard" prop="idcard" label-width="100px">
                        <el-input v-model="form.idcard" autocomplete="off" placeholder="输入价格￥"></el-input>
                    </el-form-item>
                    <el-form-item label="状态" prop="status"  label-width="100px">
                        <!-- <el-input v-model="form.status" autocomplete="off" placeholder="选择状态"></el-input> -->
                        <el-select v-model="form.status" label="请选择">
                            <!-- <el-option :key="1" :label="有货" value="有货"></el-option>
                            <el-option :key="2" :label="缺货" value="缺货"></el-option>
                            <el-option :key="3" :label="正常" value="缺货"></el-option>
                            <el-option :key="4" :label="null" value="缺货"></el-option> -->
                            <el-option :key="1" :label="null" value="正常"></el-option>
                        </el-select>

                    </el-form-item>
                    <el-form-item label="图片" prop="photo" label-width="100px" placeholder="上传图片地址">
                        <el-input v-model="form.photo" autocomplete="off"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="父类" prop="categoryId" label-width="100px">
                            <el-select v-model="form.categoryId">
                                <el-option v-for="v in categorys.list" :key="v.id" :label="v.name" :value="v.id"></el-option>
                            </el-select>
                    </el-form-item> -->

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
                realname:[
                    { required: true, message: '请输入姓名', trigger: 'blur' },
                    { min: 2, max: 10, message: '长度在 2 到 5 个字符', trigger: 'blur' },
                ],
                telephone:[
                    {required:true,message:'请输入电话',trigger:'blur'},
                    {min:11,max:11,message:'电话号码为11位',trigger:'blur'}
                ],
                password:[
                    {required:true,message:'请输入密码',trigger:'blur'}
                ],
                status:[
                    {required:true,message:'请选择状态',trigger:'blur'}
                ],
            },
        }
    },
    created(){
        this.findAllWaiter(this.page_data)
        this.findAllCategory({page:0,pageSize:99,name:""})
        
        setTimeout(() => {
            this.total = this.waiters.total
            this.myloading = false
        }, 1000);
        
    },
    computed:{
        ...mapState("waiter",["waiters","modalval","title"]),
        ...mapState("category",["categorys"])
    },
    methods:{
        ...mapActions("waiter",["findAllWaiter","modalVal","saveOrUpdate","deleteById","batchDelete","modifyTitle","FREEZEhandler","noFREEZEhandler"]),
        ...mapActions("category",["findAllCategory"]),
        ...mapMutations("waiter",[]),

        //普通方法
        pagechange(page){
            this.page_data.page = page - 1
            this.findAllWaiter(this.page_data)
        },
        searchhandler(){
            this.page_data.name = this.search_data.name
            this.findAllWaiter(this.page_data)
            setTimeout(() => {
                this.total = this.waiters.total
            }, 1000);
        },
        modalshow(){
            this.modifyTitle("New Waiter")
            this.form = {}
            this.modalVal(true)
        },
        modalclose(){
            this.$refs.waiterForm.resetFields();

            this.modalVal(false)
            // this.form = {}
            let old_page_data = this.page_data
            
            this.findAllWaiter(old_page_data)
        },
        async submithandler(){
        this.$refs.waiterForm.validate(async(valid) => {
          if (valid) {
            await this.saveOrUpdate(this.form)
            await this.modalclose()

            let old_page_data = {}
            // if(this.total % 5 == 0){alert(1);old_page_data = this.page_data; old_page_data.page++;}
            // else{old_page_data = this.page_data}
            await this.findAllWaiter()
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
            await this.findAllWaiter()
            .then((re)=>{
                // alert(JSON.stringify(re))
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
                // this.total = re.data.total
                this.$message({type:'success',message:"批量删除成功"})
            })
            await this.findAllWaiter()
            this.page_data.page = 0
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
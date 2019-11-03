<template>
    <div id="comment">
        <!-- 你好{{comments}}{{orders}} -->
        <!-- 按钮 -->
        <!-- <el-button type="primary" @click="modalshow">添加评论</el-button> -->
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
        :data="comments.list" border @selection-change = "handleSelectionChange">
            <el-table-column type="selection" label="#" align="center" width="55px"></el-table-column>
            <el-table-column label="评论内容" prop="content" align="center"></el-table-column>
            <!-- <el-table-column label="评论时间" align="center">
                <template #default="gettime">
                    <div>
                        {{$moment(gettime.row.commentTime).format("20"+"YY/MM/DD"+"   "+"HH:mm:ss")}}
                    </div>
                </template>
            </el-table-column> -->
            <!-- <el-table-column label="订单ID" prop="orderId" align="center"></el-table-column> -->
            <!-- <el-table-column label="图片" prop="photo" align="center">
                <template #default="bb">
                    <img :src="bb.row.photo" style="150px;" alt="无图">
                </template>
            </el-table-column> -->
            <el-table-column label="操作" align="center" width="300px">
                <template #default="aa">
                    <!-- <el-button type="warning" size="small" @click="modifyhandler(aa.row)">修改</el-button> -->
                    <!-- <el-button type="danger" size="small" @click="deletehandler(aa.row.id)">删除</el-button> -->

                    <el-button type="primary" size="small" @click="backCallhandler(aa.row)">回评</el-button>
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
                <el-form :model="form" :rules="rules" ref="commentForm" class="demo-form">
                    <el-form-item label="评价内容" prop="content" label-width="100px">
                        <el-input type="textarea" v-model="form.content" autocomplete="off" placeholder="最多输入30个字符"></el-input>
                    </el-form-item>
                    <el-form-item label="评价时间" prop="commentTime" label-width="100px">
                        <el-input v-model="form.commentTime" autocomplete="off" placeholder="自动录入评价时间" disabled></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="订单ID" prop="orderId" label-width="100px">
                        <el-input v-model="form.orderId" autocomplete="off" placeholder="选择订单ID"></el-input>
                    </el-form-item>
                    <el-form-item label="idcard" prop="idcard" label-width="100px">
                        <el-input v-model="form.idcard" autocomplete="off" placeholder="输入价格￥"></el-input>
                    </el-form-item> -->
                    <!-- <el-form-item label="状态" prop="status"  label-width="100px"> -->
                        <!-- <el-input v-model="form.status" autocomplete="off" placeholder="选择状态"></el-input> -->
                        <!-- <el-select v-model="form.status" label="请选择"> -->
                            <!-- <el-option :key="1" :label="有货" value="有货"></el-option>
                            <el-option :key="2" :label="缺货" value="缺货"></el-option>
                            <el-option :key="3" :label="正常" value="缺货"></el-option>
                            <el-option :key="4" :label="null" value="缺货"></el-option> -->
                            <!-- <el-option :key="1" :label="null" value="正常"></el-option> -->
                        <!-- </el-select> -->

                    <!-- </el-form-item> -->
                    <!-- <el-form-item label="图片" prop="photo" label-width="100px" placeholder="上传图片地址">
                        <el-input v-model="form.photo" autocomplete="off"></el-input>
                    </el-form-item> -->
                    <el-form-item label="订单ID" prop="orderId" label-width="100px">
                            <el-select v-model="form.orderId">
                                <el-option v-for="v in orders" :key="v.orderId" :label="v.id" :value="v.id"></el-option>
                            </el-select>
                    </el-form-item>
                    <!-- <el-form-item label="订单ID" prop="orderId" label-width="100px">
                            <el-select v-model="form.orderId">
                                <el-option v-for="v in order.data" :key="v.orderId" :label="v.customerName" :value="v.orderId"></el-option>
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
                content:[
                    { required: true, message: '请评价', trigger: 'blur' },
                    {  max: 30, message: '最多输入 30 个字符', trigger: 'blur' },
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
        this.findAllComment(this.page_data)
        // this.findAllCategory({page:0,pageSize:99,name:""})
        this.findAllOrder()
        //重置comment//
        // this.findAllCommentNoquery()
        
        setTimeout(() => {
            this.total = this.comments.total
            this.myloading = false
        }, 1000);
        
    },
    computed:{
        ...mapState("comment",["comments","modalval","title"]),
        ...mapState("order",["orders"])
    },
    methods:{
        ...mapActions("comment",["findAllComment","modalVal","saveOrUpdate","deleteById","batchDelete","modifyTitle","backCall"]),
        ...mapActions("comment",["findAllCommentNoquery"]), //不分页的查询
        ...mapActions("order",["findAllOrder"]),
        ...mapMutations("comment",[]),

        //普通方法
        pagechange(page){
            this.page_data.page = page - 1
            this.findAllComment(this.page_data)
        },
        searchhandler(){
            this.page_data.name = this.search_data.name
            this.findAllComment(this.page_data)
            setTimeout(() => {
                this.total = this.comments.total
            }, 1000);
        },
        modalshow(){
            this.modifyTitle("New Comment")
            this.form = {}
            this.modalVal(true)
        },
        modalclose(){
            this.$refs.commentForm.resetFields();

            this.modalVal(false)
            // this.form = {}
            let old_page_data = this.page_data
            
            this.findAllComment(old_page_data)
        },
        async submithandler(){
        this.$refs.commentForm.validate(async(valid) => {
          if (valid) {

              this.form.commentTime = Date.now()
            await this.saveOrUpdate(this.form)
            await this.modalclose()

            let old_page_data = {}
            // if(this.total % 5 == 0){alert(1);old_page_data = this.page_data; old_page_data.page++;}
            // else{old_page_data = this.page_data}
            await this.findAllComment()
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
            await this.findAllComment()
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
            await this.findAllComment()
            this.page_data.page = 0
        },
        backCallhandler(v){
            this.modalshow()
            this.form = v
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
<template>
    <div class="list">
        <!-- Nav Menu -->
            
            <el-tabs v-model="activeName">
                <!-- 所有订单 -->
                <el-tab-pane label="所有订单" name="first">
                    <el-table :data="orders">
                        <el-table-column type="selection" width="55" />
                        <el-table-column prop="id" label="编号" />
                <el-table-column label="下单时间">
                    <template #default="time">
                        <div>{{$moment(time.row.orderTime).format("20"+"YY/MM/DD"+"   "+"HH:mm:ss")}}</div>
                        <!-- moment(time.row.orderTime).format("20"+"YY/MM/DD"+"   "+"HH:mm:ss") -->
                    </template>   
                </el-table-column>
                        <el-table-column prop="total" label="总单数" />
                        <el-table-column prop="customerId" label="顾客ID" />
                        <el-table-column prop="waiterId" label="员工ID" />
                        <el-table-column prop="addressId" label="地址ID" />
                        <el-table-column prop="status" label="状态" />
                    </el-table>
                </el-tab-pane>
                <!-- 待派单 -->
                <el-tab-pane label="待派单" name="second">
                    <el-table :data="orders.filter(item=>item.status=='待派单'||item.status=='')">
                        <el-table-column type="selection" width="55" />
                        <el-table-column prop="id" label="编号" />
                <el-table-column label="下单时间">
                    <template #default="time">
                        <div>{{$moment(time.row.orderTime).format("20"+"YY/MM/DD"+"   "+"HH:mm:ss")}}</div>
                        <!-- moment(time.row.orderTime).format("20"+"YY/MM/DD"+"   "+"HH:mm:ss") -->
                    </template>   
                </el-table-column>
                        <el-table-column prop="total" label="总单数" />
                        <el-table-column prop="customerId" label="顾客ID" />
                        <el-table-column prop="waiterId" label="员工ID" />
                        <el-table-column prop="addressId" label="地址ID" />
                        <el-table-column prop="status" label="状态" />
                        <el-table-column label="操作">
                            <template #default="scope">
                                <el-button size="mini" @click="paidanhandler(scope.row.id)">派单</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <!-- 待接单 -->
                <el-tab-pane label="待接单" name="third">
                    <el-table :data="orders.filter(item=>item.status=='待接单')">
                        <el-table-column type="selection" width="55" />
                        <el-table-column prop="id" label="编号" />
                <el-table-column label="下单时间">
                    <template #default="time">
                        <div>{{$moment(time.row.orderTime).format("20"+"YY/MM/DD"+"   "+"HH:mm:ss")}}</div>
                        <!-- moment(time.row.orderTime).format("20"+"YY/MM/DD"+"   "+"HH:mm:ss") -->
                    </template>   
                </el-table-column>
                        <el-table-column prop="total" label="总单数" />
                        <el-table-column prop="customerId" label="顾客ID" />
                        <el-table-column prop="waiterId" label="员工ID" />
                        <el-table-column prop="addressId" label="地址ID" />
                        <el-table-column prop="status" label="状态" />
                        <el-table-column label="操作">
                            <template #default="scope">
                                <el-button size="mini" @click="cancel_oreder_handler(scope.row.id)">取消派单</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <!-- 待服务 -->
                <el-tab-pane label="待服务" name="fourth">
                    <el-table :data="orders.filter(item=>item.status=='待服务')">
                        <el-table-column type="selection" width="55" />
                        <el-table-column prop="id" label="编号" />
                <el-table-column label="下单时间">
                    <template #default="time">
                        <div>{{$moment(time.row.orderTime).format("20"+"YY/MM/DD"+"   "+"HH:mm:ss")}}</div>
                        <!-- moment(time.row.orderTime).format("20"+"YY/MM/DD"+"   "+"HH:mm:ss") -->
                    </template>   
                </el-table-column>
                        <el-table-column prop="total" label="总单数" />
                        <el-table-column prop="customerId" label="顾客ID" />
                        <el-table-column prop="waiterId" label="员工ID" />
                        <el-table-column prop="addressId" label="地址ID" />
                        <el-table-column prop="status" label="状态" />
                    </el-table>
                </el-tab-pane>
                <!-- 待确认 -->
                <el-tab-pane label="待确认" name="five">
                    <el-table :data="orders.filter(item=>item.status=='待确认')">
                        <el-table-column type="selection" width="55" />
                        <el-table-column prop="id" label="编号" />
                <el-table-column label="下单时间">
                    <template #default="time">
                        <div>{{$moment(time.row.orderTime).format("20"+"YY/MM/DD"+"   "+"HH:mm:ss")}}</div>
                        <!-- moment(time.row.orderTime).format("20"+"YY/MM/DD"+"   "+"HH:mm:ss") -->
                    </template>   
                </el-table-column>
                        <el-table-column prop="total" label="总单数" />
                        <el-table-column prop="customerId" label="顾客ID" />
                        <el-table-column prop="waiterId" label="员工ID" />
                        <el-table-column prop="addressId" label="地址ID" />
                        <el-table-column prop="status" label="状态" />
                    </el-table>
                </el-tab-pane>
                <!-- 已完成 -->
                <el-tab-pane label="已完成" name="six">
                    <el-table :data="orders.filter(item=>item.status=='已完成')">
                        <el-table-column type="selection" width="55" />
                        <el-table-column prop="id" label="编号" />
                <el-table-column label="下单时间">
                    <template #default="time">
                        <div>{{$moment(time.row.orderTime).format("20"+"YY/MM/DD"+"   "+"HH:mm:ss")}}</div>
                        <!-- moment(time.row.orderTime).format("20"+"YY/MM/DD"+"   "+"HH:mm:ss") -->
                    </template>   
                </el-table-column>
                        <el-table-column prop="total" label="总单数" />
                        <el-table-column prop="customerId" label="顾客ID" />
                        <el-table-column prop="waiterId" label="员工ID" />
                        <el-table-column prop="addressId" label="地址ID" />
                        <el-table-column prop="status" label="状态" />
                    </el-table>     
                </el-tab-pane>
            </el-tabs>
        <!-- modal -->
            <el-dialog title="派单" :visible.sync="modalval" width="30%" @close="modalval = false">
                <el-form :model="form" class="demo-form">
                    <el-form-item label="订单ID" prop="orderId" label-width="100px">
                        <el-input disabled v-model="form.orderId" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="员工ID" prop="waiterId" label-width="100px">
                        <el-input v-model="form.waiterId" autocomplete="off" placeholder="员工ID：29号/30号/31号"></el-input>
                    </el-form-item>

                </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="modalval = false">取消派单</el-button>
                <el-button type="primary" @click="submithandler">派 单</el-button>
            </div>
            </el-dialog>      
        <!-- /modal -->



        <!-- <el-menu :router="true" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
        >
        <el-menu-item index="/order/order_list/order_all">所有订单</el-menu-item>
        
        <el-menu-item index="/order/order_list/order_paidan">待派单</el-menu-item>
        <el-menu-item index="/order/order_list/order_jiedan">待接单</el-menu-item>
        <el-menu-item index="/order/order_list/order_daifuwu">待服务</el-menu-item>
        <el-menu-item index="/order/order_list/order_daiqueren">待确认</el-menu-item>
        <el-menu-item index="/order/order_list/order_end">已完成</el-menu-item>
        </el-menu> -->
        <!-- <el-menu-item index="/order/order_zhifu">待支付</el-menu-item> -->
        <!-- /Nav Menu -->

        <!-- 业务逻辑 -->
        <!-- <div :style="process_style">
            <h1>业务流程</h1>
            <br>
            <h2>用户下单 -> superManger将订单派给自己的员工 -> 员工收到派送给自己的订单（接受/拒绝）-> <br><br>
            1.  拒绝 -> 此订单回退到待派单环节 <br><br>
            2.  接受 -> 进入到待服务环节 -> 员工开始工作 -> 工作完成,员工点击完单 -> 客户收到信息，选择确认完单 -> 订单状态-已完成   
            </h2>            
        </div> -->

        <!-- <router-view></router-view> -->
    </div>
</template>

<script>
import Cookies from 'js-cookie'
// import {setCookie,getCookie,removeCookie} from '@/store/modules/setproCookie'
import {mapState,mapActions} from 'vuex'

export default {
    data(){
        return {
        activeName:'first',
        activeIndex: '1',
        activeIndex2: '1',
        process_style:"",
        status:true,
        modalval:false,
        form:{
            // orderId:new Number,
            // waiterId: 26
        }
        }
    },
    created(){
        // Cookies.set("process_style","")
        this.findAllOrder()
    },
    computed:{
        ...mapState("order",["orders"])
        // ...mapState("process_style",["process_style"])
    },
    methods:{
        // ...mapActions("process_style",["SET_PROCESS_STYLE"]),
        ...mapActions("order",["findAllOrder","sendOrder","cancelsendOrder"]),

        handleSelect(key, keyPath) {
            // console.log(key, keyPath);
            this.process_style = "display:none"
            // this.status == false
            Cookies.set("process_style",this.process_style)

            // this.SET_PROCESS_STYLE("display:none;")
            
            
        },
        paidanhandler(orderId){
            this.modalval = true
            this.form.orderId = orderId
        },
        submithandler(){
            this.form.waiterId = this.form.waiterId||29
            this.sendOrder(this.form)
            .then((re)=>{
                this.$message.success("派单成功")
                this.modalval = false
                this.form = {}
            })
            .catch((re)=>{
                this.$message.error("派单失败")
                this.modalval = false
                this.form = {}
            })
        },
        cancel_oreder_handler(orderId){
            this.cancelsendOrder({orderId:orderId})
            .then((re)=>{
                if(re.status == 200){
                    this.$message.success("取消成功")
                    this.findAllOrder()
                }else{
                    this.$message.error("取消失败！用户可能已经拒绝了此订单")
                    this.findAllOrder()
                }
            })
        }
    }
}
</script>
<template>
    <div class="paidan">
        <div class="all_container">
            <el-table :data="orders.filter(item=>item.status == '待派单'||item.status == ''||
                item.status == null||item.status == 'null')">
                <el-table-column prop="id" label="# 订单ID"></el-table-column>
                <el-table-column label="下单时间">
                    <template #default="time">
                        <div>{{$moment(time.row.orderTime).format("20"+"YY/MM/DD"+"   "+"HH:mm:ss")}}</div>
                        <!-- moment(time.row.orderTime).format("20"+"YY/MM/DD"+"   "+"HH:mm:ss") -->
                    </template>   
                </el-table-column>
                <el-table-column prop="total" label="总价"></el-table-column>
                <el-table-column prop="status" label="状态"></el-table-column>
                <el-table-column prop="customerId" label="顾客ID"></el-table-column>
                <!-- <el-table-column prop="waiterId" label="服务员ID"></el-table-column> -->
                <el-table-column label="操作">
                    <template #default="scope">
                        <el-button size="mini" @click="paidanhandler(scope.row.id)">派单</el-button>
                    </template>
                </el-table-column>

            </el-table>
        </div>
        <!-- modal -->
            <el-dialog title="派单" :visible.sync="modalval" width="30%" @close="modalval = false">
                <el-form :model="form" class="demo-form">
                    <el-form-item label="订单ID" prop="orderId" label-width="100px">
                        <el-input disabled v-model="form.orderId" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="员工ID" prop="waiterId" label-width="100px">
                        <el-input v-model="form.waiterId" autocomplete="off" placeholder="选择员工"></el-input>
                    </el-form-item>

                </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="modalval = false">取消派单</el-button>
                <el-button type="primary" @click="submithandler">派 单</el-button>
            </div>
            </el-dialog>      
        <!-- /modal -->
    </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
// import moment from 'moment'

export default {
    data(){
        return {
            modalval:false,
            form:{
                // orderId:new Number,
                // waiterId: new Number
            }
        }
    },
    created(){
        this.findAllOrder()
    },
    computed:{
        ...mapState("order",["orders"])
    },
    methods:{
        ...mapActions("order",["findAllOrder","sendOrder"]),

        paidanhandler(orderId){
            this.modalval = true
            this.form.orderId = orderId
        },
        submithandler(){
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
        }
    }
}
</script>

<style scoped>

</style>
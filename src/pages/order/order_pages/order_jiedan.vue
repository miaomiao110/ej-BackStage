<template>
    <div class="jiedan">
        <div class="all_container">
            <el-table :data="orders.filter(item=>item.status == '待接单')">
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
                <el-table-column prop="waiterId" label="服务员ID"></el-table-column>
                <el-table-column label="操作">
                    <template #default="scope">
                        <el-button size="mini" @click="cancel_oreder_handler(scope.row.id)">取消派单</el-button>
                    </template>
                </el-table-column>

            </el-table>
        </div>
    </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
// import moment from 'moment'

export default {
    data(){
        return {

        }
    },
    created(){
        this.findAllOrder()
    },
    computed:{
        ...mapState("order",["orders"])
    },
    methods:{
        ...mapActions("order",["findAllOrder","cancelsendOrder"]),
        
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

<style scoped>

</style>
<template>
    <div class="daiqueren">
        <div class="all_container">
            <el-table :data="orders.filter(item=>item.status == '待确认'||item.status == '未确认')">
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
                <!-- <el-table-column label="操作">
                    <template #default="scope">
                        <el-button size="mini">详情</el-button>
                    </template>
                </el-table-column> -->

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
        ...mapActions("order",["findAllOrder"])
    }
}
</script>

<style scoped>

</style>
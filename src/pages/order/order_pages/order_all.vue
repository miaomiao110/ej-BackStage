<template>
    <div class="all">
        <div class="all_container">
        <!-- 搜索 -->
        <!-- {{search_data}}
        <el-form class="serch_btn" @submit.prevent>
            <el-form-item>
                <el-row>
                    <el-col :span="4">
                        <el-input clearable placeholder="输入搜索内容" v-model="search_data.customerId" @keydown.prevent @keyup.prevent @keypress.prevent @submit.prevent></el-input>
                    </el-col>
                    <el-col :span="2">
                        <el-button type="success" @click="searchhandler(search_data)">搜索</el-button>
                    </el-col>
                </el-row>
            </el-form-item>
        </el-form> -->
        <!-- /搜索 -->
            <el-table :data="orders">
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
import customer from '../../../store/modules/customer'
// import moment from 'moment'

export default {
    data(){
        return {
            search_data:{
                // orderId:new Number,
                // customerId:new Number
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
        ...mapActions("order",["findAllOrder"]),//"searchByCustomerIdOrWaiterId"
        // searchhandler(data){
        //     console.log(this.search_data)
        //     this.searchByCustomerIdOrWaiterId(this.search_data)
        //     // this.$forceUpdate()
        // }
    }
}
</script>

<style scoped>

</style>
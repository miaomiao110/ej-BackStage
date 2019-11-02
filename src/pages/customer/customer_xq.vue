<template>
    <div class="customer_xq">
        <div class="xq_address">
            <el-button type="primary" @click="backpagehandler" round>＜ 返回</el-button>
        <h3>地址</h3>
            <el-table :data="address" border max-height="250">
                <el-table-column label="省份" prop="province"></el-table-column>
                <el-table-column label="城市" prop="city"></el-table-column>
                <el-table-column label="地域" prop="area"></el-table-column>
                <el-table-column label="街道" prop="address"></el-table-column>
                <el-table-column label="电话" prop="telephone"></el-table-column>
            </el-table>            
        </div>
        <div class="xq_order">
        <h3>订单</h3>
            <el-table :data="orders" border max-height="250">
                <el-table-column label="顾客姓名" prop="customerName"></el-table-column>
                <el-table-column label="服务者" prop="waiterName"></el-table-column>
                <el-table-column label="地址" prop="address"></el-table-column>
                <el-table-column label="数量" prop="total"></el-table-column>
                <el-table-column label="下单时间" prop="orderTime"></el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import {mapState,mapActions} from "vuex"

export default {

    created(){
        // alert(this.$route.query.id)
        // alert(this.id)
        this.findAddressByCustomerId(this.id)
        this.findOrderByCustomerId(this.id)
    },
    data(){
        return {
            id:this.$route.query.id
        }
    },
    computed:{
        ...mapState("address",["address"]),
        ...mapState("order",["orders"])
    },
    methods:{
        ...mapActions("address",["findAddressByCustomerId"]),
        ...mapActions("order",["findOrderByCustomerId"]),
        backpagehandler(){
            this.$router.go(-1)
        }
    }
}
</script>

<style scoped>
.customer_xq{
    box-sizing: border-box;
    overflow: auto;
}
    .xq_order{
        margin-top: 30px;
    }
</style>
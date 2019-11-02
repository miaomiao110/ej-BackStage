<template>
    <div class="list">
        <!-- Nav Menu -->
        <el-menu :router="true" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
        >
        <el-menu-item index="/order/order_list/order_all">所有订单</el-menu-item>
        <!-- <el-menu-item index="/order/order_zhifu">待支付</el-menu-item> -->
        <el-menu-item index="/order/order_list/order_paidan">待派单</el-menu-item>
        <el-menu-item index="/order/order_list/order_jiedan">待接单</el-menu-item>
        <el-menu-item index="/order/order_list/order_daifuwu">待服务</el-menu-item>
        <el-menu-item index="/order/order_list/order_daiqueren">待确认</el-menu-item>
        <el-menu-item index="/order/order_list/order_end">已完成</el-menu-item>
        </el-menu>
        <!-- /Nav Menu -->
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    data(){
        return {
        activeIndex: '1',
        activeIndex2: '1'
        }
    },
    methods:{
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
      }
    }
}
</script>
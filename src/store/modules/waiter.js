import request from '@/utils/request'
// import {get,post,post_array,post_json} from '../http/axios'
import {get,post,post_array,post_json} from '@/utils/request'
import axios from 'axios'

export default {
    namespaced:true,

    state:{
        waiters:[],
        modalval:false,
        page_total:new Number,
        page_data:{
            page:0,
            pageSize:5,
            name:""
        },
        title:"New Waiter"
    },
    getters:{
        
    },
    mutations:{
        refreshWaiters(state,data){
            state.waiters = data
        },
        refreshModalval(state,data){
            state.modalval = data
        },
        refreshTitle(state,data){
            state.title = data
        }
    },
    actions:{
        async findAllWaiter(context,page_data){
            page_data = page_data || {
                page:0,
                pageSize:5,
                name:""
            }
            // console.log(page_data)
            let res = await post("/waiter/query",page_data)
            if(res.status == 200){
                context.commit("refreshWaiters",res.data)
                // console.log(res)
                return res
            }else {
                
            }
        },
        async findAllWaiterNoquery(context){
            let res = await get("/waiter/findAll")
            if(res.status == 200){
                context.commit("refreshWaiters",res.data)
                return res
            }else {

            }
        },
        modalVal(context,status){
            context.commit("refreshModalval",status)
        },
        async saveOrUpdate(context,data){
            let res = await post("/waiter/saveOrUpdate",data)
            if(res.status == 200){
                // console.log(res)
            }else {

            }
            context.dispatch("findAllWaiter",{page:0,pageSize:5,name:""})
        },
        async deleteById(context,id){
            let res = await get("/waiter/deleteById?id="+id)
            if(res.status == 200){
                // context.dispatch("findAllWaiter")
                return res
            }else {

            }
        },
        async batchDelete(context,ids){
            let res = await post_array("/waiter/batchDelete",{ids})
            if(res.status == 200){
                return res
            }else {
                return res
            }

        },
        modifyTitle(context,title){
            context.commit("refreshTitle",title)
        },
        async FREEZEhandler(context,data){
            data.password = data.password + "T"
            let res = await post("/waiter/saveOrUpdate",data)
            if(res.status == 200){
                // console.log(res)
                context.dispatch("findAllWaiter")
                // this.$message.success("冻结成功")
            }else {
                return res
            } 
        },
        async noFREEZEhandler(context,data){
            data.password = data.password.split("").reverse().join("").slice(1).split("").reverse().join("")
            let res = await post("/waiter/saveOrUpdate",data)
            if(res.status == 200){
                // console.log(res)
                context.dispatch("findAllWaiter")
                // this.$message.success("冻结成功")
            }else {
                return res
            } 
        },
        
        
    }

}
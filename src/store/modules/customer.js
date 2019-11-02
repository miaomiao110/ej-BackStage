import request from '@/utils/request'

// import {get,post,post_array,post_json} from '../http/axios'
import {get,post,post_array,post_json} from '@/utils/request'

import axios from 'axios'

export default {
    namespaced:true,

    state:{
        customers:[],
        modalval:false,
        page_total:new Number,
        page_data:{
            page:0,
            pageSize:5,
            name:""
        },
        title:"New Customer",
        loading:false
    },
    getters:{
        
    },
    mutations:{
        refreshCustomers(state,data){
            state.customers = data
        },
        refreshModalval(state,data){
            state.modalval = data
        },
        refreshTitle(state,data){
            state.title = data
        },
        openLoading(state){
            state.loading = true
        },
        closeLoading(state){
            // setTimeout(()=>{
                state.loading = false
            // },1000)
        }
    },
    actions:{
        async findAllCustomer(context,page_data){
            // context.commit("openLoading")
            page_data = page_data || {
                page:0,
                pageSize:5,
                name:""
            }
            let res = await post_array("/customer/query",page_data)
            if(res.status == 200){
                context.commit("refreshCustomers",res.data)

                // setTimeout(()=>{
                    // context.commit("closeLoading")
                // },2000)
                
                return res
            }else {

            }
        },
        modalVal(context,status){
            context.commit("refreshModalval",status)
        },
        async saveOrUpdate(context,data){
            let res = await post("/customer/saveOrUpdate",data)
            if(res.status == 200){
                
            }else {

            }
            context.dispatch("findAllCustomer",{page:0,pageSize:5,name:""})
        },
        async deleteById(context,id){
            let res = await get("/customer/deleteById?id="+id)
            if(res.status == 200){
                // context.dispatch("findAllCustomer",{page:0,pageSize:5,name:""})
                return res
            }else {

            }
        },
        async batchDelete(context,ids){
            let res = await post_array("/customer/batchDelete",{ids})
            if(res.status == 200){
                // return res
            }else {
                // return res
            }

        },
        modifyTitle(context,title){
            context.commit("refreshTitle",title)
        }
        
        
    }

}
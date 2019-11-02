import request, { get_params } from '@/utils/request'
// import {get,post,post_array,post_json} from '../http/axios'
import {get,post,post_array,post_json} from '@/utils/request'
import axios from 'axios'

export default {
    namespaced:true,

    state:{
        products:[],
        modalval:false,
        page_total:new Number,
        page_data:{
            page:0,
            pageSize:5,
            name:""
        },
        title:"New Product"
    },
    getters:{
        
    },
    mutations:{
        refreshProducts(state,data){
            state.products = data
        },
        refreshModalval(state,data){
            state.modalval = data
        },
        refreshTitle(state,data){
            state.title = data
        }
    },
    actions:{
        async findAllProduct(context,page_data){
            page_data = page_data || {
                page:0,
                pageSize:5,
                name:""
            }
            // console.log(page_data)
            let res = await post("/product/queryProductCascadeCategory",page_data)
            if(res.status == 200){
                context.commit("refreshProducts",res.data)
                // console.log(res)
                return res
            }else {
                
            }
        },
        modalVal(context,status){
            context.commit("refreshModalval",status)
        },
        async saveOrUpdate(context,data){
            let res = await post("/product/saveOrUpdate",data)
            if(res.status == 200){
                // console.log(res)
            }else {

            }
            context.dispatch("findAllProduct",{page:0,pageSize:5,name:""})
        },
        async deleteById(context,id){
            let res = await get_params("/product/deleteById",{id})
            if(res.status == 200){
                // context.dispatch("findAllProduct")
                return res
            }else {

            }
        },
        async batchDelete(context,ids){
            let res = await post_array("/product/batchDelete",{ids})
            if(res.status == 200){
                return res
            }else {
                return res
            }

        },
        modifyTitle(context,title){
            context.commit("refreshTitle",title)
        }
        
        
    }

}
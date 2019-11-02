import request from '@/utils/request'
// import {get,post,post_array,post_json} from '../http/axios'
import {get,post,post_array,post_json} from '@/utils/request'
import axios from 'axios'

export default {
    namespaced:true,

    state:{
        categorys:[],
        modalval:false,
        page_total:new Number,
        page_data:{
            page:0,
            pageSize:5,
            name:""
        },
        title:"New Category"
    },
    getters:{
        
    },
    mutations:{
        refreshCategorys(state,data){
            state.categorys = data
        },
        refreshModalval(state,data){
            state.modalval = data
        },
        refreshTitle(state,data){
            state.title = data
        }
    },
    actions:{
        async findAllCategory(context,page_data){
            page_data = page_data || {
                page:0,
                pageSize:5,
                name:""
            }
            // console.log(page_data)
            let res = await post_array("/category/query",page_data)
            if(res.status == 200){
                context.commit("refreshCategorys",res.data)
                return res
            }else {
                
            }
        },
        modalVal(context,status){
            context.commit("refreshModalval",status)
        },
        async saveOrUpdate(context,data){
            let res = await post("/category/saveOrUpdate",data)
            if(res.status == 200){
                
            }else {

            }
            context.dispatch("findAllCategory",{page:0,pageSize:5,name:""})
        },
        async deleteById(context,id){
            let res = await get("/category/deleteById?id="+id)
            if(res.status == 200){
                // context.dispatch("findAllCategory")
                return res
            }else {

            }
        },
        async batchDelete(context,ids){
            let res = await post_array("/category/batchDelete",{ids})
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
import request from '@/utils/request'
// import {get,post,post_array,post_json} from '../http/axios'
import {get,post,post_array,post_json} from '@/utils/request'
import axios from 'axios'

export default {
    namespaced:true,

    state:{
        comments:[],
        modalval:false,
        page_total:new Number,
        page_data:{
            page:0,
            pageSize:5,
            name:""
        },
        title:"New Comment"
    },
    getters:{
        
    },
    mutations:{
        refreshComments(state,data){
            state.comments = data
        },
        refreshModalval(state,data){
            state.modalval = data
        },
        refreshTitle(state,data){
            state.title = data
        }
    },
    actions:{
        async findAllComment(context,page_data){
            page_data = page_data || {
                page:0,
                pageSize:5,
                name:""
            }
            // console.log(page_data)
            let res = await post("/comment/query",page_data)
            if(res.status == 200){
                context.commit("refreshComments",res.data)
                // console.log(res)
                return res
            }else {
                
            }
        },
        modalVal(context,status){
            context.commit("refreshModalval",status)
        },
        async saveOrUpdate(context,data){
            let res = await post("/comment/saveOrUpdate",data)
            if(res.status == 200){
                // console.log(res)
            }else {

            }
            context.dispatch("findAllComment",{page:0,pageSize:5,name:""})
        },
        async deleteById(context,id){
            let res = await get("/comment/deleteById?id="+id)
            if(res.status == 200){
                // context.dispatch("findAllComment")
                return res
            }else {

            }
        },
        async batchDelete(context,ids){
            let res = await post_array("/comment/batchDelete",{ids})
            if(res.status == 200){
                return res
            }else {
                return res
            }

        },
        modifyTitle(context,title){
            context.commit("refreshTitle",title)
        },
        async backCall(context,data){
            let res = await post("/comment/saveOrUpdate",data)
            
            context.dispatch("findAllComment",{page:0,pageSize:5,name:""})
        }
        
        
    }

}
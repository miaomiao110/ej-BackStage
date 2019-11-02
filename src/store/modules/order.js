import request, { get_params } from '@/utils/request'
// import {get} from '../http/axios'
import {get,post,post_array,post_json} from '@/utils/request'
import { Script } from 'vm'

export default {
    namespaced:true,
    state:{
        orders:[]
    },
    getters:{

    },
    mutations:{
        refreshOrder(state,data){
            state.orders = data
        }
    },
    actions:{
        async findAllOrder({commit,dispatch}){
            let res = await get_params("/order/findAll")
            commit("refreshOrder",res.data)
            return res
        },
        async findOrderByCustomerId({commit,dispatch},customerId){
            let res = await get_params("/order/queryBasic?customerId"+customerId)
            commit("refreshOrder",res.data)
        },
        async sendOrder({commit,dispatch},data){
            let res = await get_params("/order/sendOrder",data)
            if(res.status == 200){
                dispatch("findAllOrder")
                return res
            }else {
                return res
            }
        },
        async cancelsendOrder({commit,dispatch},data){
            let res = await get_params("/order/cancelSendOrder",data)
            if(res.status == 200){
                dispatch("findAllOrder")
                return res
            }else {
                return res
            }
        },
        // async searchByCustomerIdOrWaiterId({commit,dispatch},data){
        //     let res = await get("/order/query",data)
        //     if(res.status == 200){
        //         commit("refreshOrder",res.data)
        //         // dispatch("findAllOrder")
        //         console.log(res)
        //         return res
        //     }else {
        //         return res
        //     }
        // }
    }
}
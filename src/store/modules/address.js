import request from '@/utils/request'
// import {get} from '../http/axios'
import {get,post,post_array,post_json} from '@/utils/request'

export default {
    namespaced:true,
    state:{
        address:[]
    },
    getters:{

    },
    mutations:{
        refreshAddress(state,data){
            state.address = data
        }
    },
    actions:{
        findAllAddress(){

        },
        async findAddressByCustomerId({commit,dispatch},id){
            let res = await get("/address/findByCustomerId?id="+id)
            if(res.status == 200){
                commit("refreshAddress",res.data)
                return res
            }
            else {
                return res
            }
        }
    }
}
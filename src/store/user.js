import {createSlice, createEntityAdapter, nanoid} from "@reduxjs/toolkit";

const {actions,reducer:UserReducer} = createSlice({
    name:'user',
    initialState:{
        info:{}
    },
    reducers:{
        //更新用户信息
        updateInfo:{
            reducer(state,action){
                state.info = action.payload
            },
            prepare(payload){
                // 删除对象中的敏感属性值
                delete payload.password
                delete payload.token
                payload.id = nanoid()
                return{
                    payload
                }
            }
        },
        signOut: state =>{
            state.info = {}
        }
    },
})

// action creator
export const {updateInfo,signOut} = actions

export default UserReducer

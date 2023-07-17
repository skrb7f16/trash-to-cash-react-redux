const reducer=(state=null,action)=>{
   if(action.type==="show"){
    return action.payload
   }else if(action.type==='hide'){
    state=null
    return state
   }else return state
}

export default reducer
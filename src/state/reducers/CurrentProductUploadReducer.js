const reducer=(state=null,action)=>{
    if(action.type==="SetCurrentProductUpload"){
        return action.payload
    }else{
        return state
    }
}

export default reducer
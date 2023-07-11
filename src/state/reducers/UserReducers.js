const reducer=(state=null, action)=>{
    if(action.type==="SetCurrentUser"){
        return action.payload
    }
    else return state
}

export default reducer
const reducer=(state="home",action)=>{

    if(action.type==="SetSelectedNavBar"){
        return action.payload
    }else return state
}

export default reducer
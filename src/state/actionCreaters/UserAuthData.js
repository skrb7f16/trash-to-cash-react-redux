const SetCurrentUser=(user)=>{
    return (dispatch)=>{
        dispatch({
            type:'SetCurrentUser',
            payload:user
        })
        
    }
}

export default SetCurrentUser
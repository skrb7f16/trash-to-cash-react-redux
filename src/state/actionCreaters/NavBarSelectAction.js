 const SetNavBar = (val)=>{

    return (dispatch)=>{
        dispatch({
            type:"SetSelectedNavBar",
            payload:val
        })
    }
}

export default SetNavBar
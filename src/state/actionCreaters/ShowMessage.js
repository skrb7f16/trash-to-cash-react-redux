const ShowMessage=(mes,type)=>{
    return (dispatch)=>{
        dispatch({
            type:type,
            payload:mes
        })
    }
}

export default ShowMessage
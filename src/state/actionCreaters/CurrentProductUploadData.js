const SetCurrentProductUpload = (productData)=>{
    return (dispatch)=>{
        dispatch({
            type:'SetCurrentProductUpload',
            payload:productData
        })
    }
}

export default SetCurrentProductUpload
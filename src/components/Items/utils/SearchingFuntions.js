export const SearchByKeyWord=(key,data)=>{
    let result=[]
    data.map(val=>{
        if(val.desc.includes(key) || val.title.includes(key) || val.type.includes(key)){
            result.push(val)
        }
    })
    return result
}


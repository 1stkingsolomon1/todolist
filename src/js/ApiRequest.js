const ApiRequest = async(url = '', optionObj = null) =>{
    let errMsg = null;
try{
    const resp = await fetch( url, optionObj )
    if (!resp.ok) throw Error('Unable to load the Url')
}catch(err){
errMsg = err.message
}finally{
    return errMsg
}
    
};

export default ApiRequest
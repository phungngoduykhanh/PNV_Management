import axios from "axios";

export const getDataUser = async ()=>{
    const res = await axios.get(`https://63c2ccd0b0c286fbe5f3efa4.mockapi.io/api/user`);
    const ress =res.data;
    var a;
    var i=0;
    for(i in ress){
        if(ress[i].login===true){
            a=ress[i]
            break;
        }
    }

    if(a){
        return a
    }
    else{
        return false
    }
}

import axios from 'axios';
export const search = async (debounced,members)=>{

    const res = await axios.post(`http://127.0.0.1:8000/api/search`,{
        term:debounced,
        members:members
    });

    return res
    

};
import axios from 'axios';
export const search = async (debounced)=>{
    const res = await axios.get(`https://63c2ccd0b0c286fbe5f3efa4.mockapi.io/api/video`);
    const ress= res.data;
    let a;
    ress.map((res,index)=>{
        if (debounced === ress[index].nameauthor){
            a = ress[index];
        }
        return a
    })

    if (a===undefined){
        return [];
    }
    else {
        return [a]
    };
};

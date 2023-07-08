// import { useEffect, useState } from "react";
// import { db } from "../firebase/config";

// const useFirestore = (collection,condition)=>{
//     const [documents, setDocuments] = useState([]);
//     useEffect(()=>{
//         let conllectionRef = db.collection(collection).orderBy('createdAt');
//         if(condition){
//             if(!condition.compareValue || !condition.compareValue.length){
//                 return;
//             }

//             conllectionRef.where(
//                 condition.fieldName,
//                 condition.operator,
//                 condition.compareValue
//             );
//         }

//         const unsubscribe = conllectionRef.onSnapshot((snapshot)=>{
//             const documents = snapshot.docs.map(doc=>({
//                 ...doc.data(),
//                 id:doc.id
//             }))

//             setDocuments(documents);
//         });

//         return unsubscribe;
//     },[])
// }

// export default useFirestore;
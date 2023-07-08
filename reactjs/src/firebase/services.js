// import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';

// export const addUserIfNotExists = async(db,userData)=>{
//     const usersCollection = collection(db,'users');
//     const userId = userData.id;

//     const q = query(usersCollection, where('id', '==', userId));
//     const querySnapshot = await getDocs(q);

//     if(querySnapshot.empty){
//         const document = { ...userData, id: userId };
//         return addDoc(usersCollection, document)
//         .then((docRef)=>{
//             if (docRef) {
//               console.log('Document added with ID: ', docRef.id);
//               return docRef;
//               }
//             })
//             .catch((error) => {
//               console.error('Error adding document: ', error);
//               throw error
//             });
//     }
//     else{
//         console.log('User already exists in Firestore');
//         return Promise.resolve();
//     }
// }

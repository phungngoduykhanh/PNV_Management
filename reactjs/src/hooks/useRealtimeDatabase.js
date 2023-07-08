import { useEffect, useState } from "react";

import { database } from "../firebase/config";
import { ref, query, onValue, off, orderByChild,equalTo } from "firebase/database";
const useRealtimeDatabase = ({ collection, condition, setDocuments })=>{

    useEffect(()=>{
        let collectionRef  = ref(database, collection);
        if(condition && condition.compareValue){
          const queryRef = query(collectionRef,orderByChild(condition.fieldName), equalTo(condition.compareValue));

            const handleSnapshot = (snapshot) => {
                const data = snapshot.val();
                if (data) {
                  const documents = Object.keys(data).map((key) => ({
                    ...data[key],
                    id: key,
                  }));
                  setDocuments(documents);
                }
              };
              onValue(queryRef, handleSnapshot);
              return () => {
                off(queryRef, handleSnapshot);
              };
        }
      }, [collection, condition,setDocuments]);
      
      };
export default useRealtimeDatabase;
import ShowChatRoom from "../../components/ShowChatRoom/ShowChatRoom";
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
const cx = classNames.bind(styles);
import CreateChatRoom from '../../components/CreateChatRoom/CreateChatRoom';
import { useEffect, useRef, useState } from "react";

import axios from "axios";

function Home() {
    const[user,setUser] =useState('');
    const isFirstRender = useRef(true);

    useEffect(()=>{
        const token = localStorage.getItem('token'); 
        if (isFirstRender.current && token) {
          isFirstRender.current = false;
          axios.get('http://127.0.0.1:8000/api/user', {
              headers: {
                Authorization: `Bearer ${token}`, 
              },
            })
            .then(async (response) => {
              setUser(response.data);
            })
            .catch(error => {
              console.error(error);
            })
        }
    },[]);
    return (
        <div className={cx('wrapper')}>
          {user &&(
            <>
              <CreateChatRoom/>
              <ShowChatRoom/>
            </>
          )}
        </div>

    )
}
export default Home;
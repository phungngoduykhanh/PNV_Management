import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Button, Form, Input, Tooltip } from 'antd';
import Message from '../../components/Message';

import classNames from 'classnames/bind';
import styles from './ChatRoom.module.scss';
import { useContext, useEffect, useMemo, useState, } from 'react';
import { AppContext } from '../../Context/AppProvider';
import InviteMember from '../../components/InviteMember/InviteMember';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { database } from '../../firebase/config';
import { format, formatRelative } from 'date-fns';
import { ref, push,orderByChild,equalTo  , query, onValue, off,serverTimestamp, set } from 'firebase/database';
const cx = classNames.bind(styles);

export const useRealtimeDatabase = ({ collection, condition, setDocuments })=>{

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

function formatDate (seconds) {
    let formattedDate = '';
    if(seconds){
        formattedDate = formatRelative(new Date(seconds *1000),new Date())

        formattedDate = formattedDate.charAt(0).toUpperCase()+formattedDate.slice(1);
    }
    return formattedDate
}

export default function ChatRoom() {

  const {id} = useParams();
  const [messages, setMessages] = useState([]);

  const{selectedChannel,setisInviteMemberVisible} = useContext(AppContext);
  const [isMembersLoaded, setIsMembersLoaded] = useState(true);
  const [members, setMembers] = useState([]);
  const [channelId, setchannelId] = useState();
  const [user, setUser] = useState();
  const[form] = Form.useForm();

  const [inputValue, setInputValue] = useState('');
  
  const handleInviteMember= ()=>{
    setisInviteMemberVisible(true);
  }
  useEffect(()=>{
    const token = localStorage.getItem('token'); 
      if (token) {
        axios.get('http://127.0.0.1:8000/api/user', {
            headers: {
              Authorization: `Bearer ${token}`, 
            },
          })
          .then(response => {
            setUser(response.data);
          })
          .catch(error => {
            console.error(error);
          });
  }},[]);

  const condition = useMemo(()=>{
    setMessages([])
    return  {fieldName: 'channel_id',compareValue: channelId}
  },[channelId])
  
  useRealtimeDatabase({
  collection: 'messages',
  condition:condition,
  setDocuments: setMessages
  });

  useEffect(() => {
    if (selectedChannel != undefined) {
      const channel_id = selectedChannel.id;
      console.log("channel_id",channel_id);
      setchannelId(channel_id);
      axios
        .get(`http://127.0.0.1:8000/api/member/${channel_id}`)
        .then((res) => {
          setMembers(res.data);
          setIsMembersLoaded(false);
    })
    }
  }, [selectedChannel]);
  

  if (isMembersLoaded) {
    return <div>Waiting...</div>;
  }

  const handleInputChange = (e)=>{
      setInputValue(e.target.value)
  }
  const handleOnSubmit = ()=>{
    const userId= user.id;
    const img= user.img;
    const name= user.name;

    const messagesRef = ref(database, 'messages'); 

    push(messagesRef, {
        text: inputValue,
        userId,
        img,
        channel_id:channelId,
        name,
        createdAt: serverTimestamp()
    });

    form.resetFields(['message']);
    form.setFieldsValue({ buttonMessage: '' });
  }



  return (
    <div className={cx('wrapper')}>
        <div className={cx('header')}>
          <div className={cx('info-room')}>
            <p>{selectedChannel.channelname}</p>

          </div>
          <div className={cx('user')}>
              <Button className={cx('button')} type='text' onClick={handleInviteMember}><FontAwesomeIcon icon={faUserPlus}/>Mời</Button>
              <InviteMember members={members} channel_id={channelId}/>
              <Avatar.Group className={cx('avatar')} maxCount={2}>
                  {members.map((member) => (
                      <Tooltip title={member.name} key={member.id}>
                        <Avatar src={member.img}>{member.name}</Avatar>
                      </Tooltip>
                  ))}
              </Avatar.Group>
          </div>
        </div>

        <div className={cx('content')}>
            <div className={cx('message')}>
              {
                messages.map(mes=>(
                  <Message  key={mes.id} text={mes.text} img={mes.img} displayName={mes.name} createAt={formatDate(mes.createdAt?.seconds)}  />
                ))
              }
                
            </div>
            <Form name="message" className={cx('form')} form={form}>
                  <Input name="message"  className={cx('input') } 
                    onChange={handleInputChange} 
                    onPressEnter={handleOnSubmit}
                    bordered={false} 
                    autoComplete='off' 
                    placeholder='Nhập tin nhắn....'/>
                <Button name="buttonMessage" className={cx('button')} onClick={handleOnSubmit}>Gửi</Button>
            </Form>
        </div>
    </div>
  )
}

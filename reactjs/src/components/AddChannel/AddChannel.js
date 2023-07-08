import React, { useContext, useEffect, useState } from 'react'
import {Form, Modal,Input,Select,Button  } from 'antd';
import { AppContext } from '../../Context/AppProvider';
import axios from 'axios';

const { Option } = Select;

export default function AddChannel({chatroom_id}) {
    const {isAddChannelVisible,setisAddChannelVisible} =useContext(AppContext);
    const[form] = Form.useForm();
    const [isPrivate,setIsPrivate] =  useState(false);
    const [emailOptions, setEmailOptions] = useState([
     
    ]);
    const [selectedEmails, setSelectedEmails] = useState([]);
    const handleOK = ()=>{
        const token = localStorage.getItem('token'); 
        const formValues = form.getFieldValue();
        const updatedFormValues = { ...formValues, chatroom_id: chatroom_id};
        console.log(updatedFormValues);
        axios.post(`http://127.0.0.1:8000/api/addchannel/${token}`,updatedFormValues).then((res)=>{
          alert(res.data.message);
        }).catch((err)=>{
          console.log(err);
        })

        form.resetFields();

        setisAddChannelVisible(false)
    }
    const handleCancel = ()=>{
        setisAddChannelVisible(false)
    }

    const handleTypeChange = (value)=>{
      setIsPrivate(value === 'private');
    }
    const handleEmailChange = (values) => {
      setSelectedEmails(values);
    };

    useEffect(()=>{
      const token = localStorage.getItem('token'); 
      axios.get(`http://127.0.0.1:8000/api/getemail/${chatroom_id}`,{
        headers: {
          Authorization: `Bearer ${token}`, 
        }},
      ).then((res)=>{
        setEmailOptions(res.data);
      }).catch((err)=>{
        console.log(err);
      })
    },[])

  return (
    <div>
    <Modal
        title="Create channel"
        visible={isAddChannelVisible}
        onOk={handleOK}
        onCancel={handleCancel}
    >
      <Form form={form} layout='vertical'>
        <Form.Item label="Channel Name" name="channelname">
          <Input />
        </Form.Item>
        <Form.Item label="Mode" name="mode">
          <Select onChange={handleTypeChange}>
            <Option value="public">Public</Option>
            <Option value="private">Private</Option>
          </Select>
        </Form.Item>
        {isPrivate && (
          <>

          <Form.Item label="Email" name="email">
            <Select
                mode="tags"
                placeholder="Enter Email addresses"
                onChange={handleEmailChange}
                value={selectedEmails}
            >
              {emailOptions.map((email) => (
                  <Option key={email} value={email}>
                    {email}
                  </Option>
                ))}
            </Select>
          </Form.Item>
        </>
        )}
      </Form>
    </Modal>
  </div>
  )
}

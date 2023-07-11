import React, { useContext, useEffect, useMemo, useState } from 'react'
import {Form, Modal,Input,Select,Button, Spin, Avatar  } from 'antd';
import { AppContext } from '../../Context/AppProvider';
import axios from 'axios';
import useDebounce from '../../hooks/useDebounce';
const { Option } = Select;

export default function InviteMember({members,channel_id}) {
    const {isInviteMemberVisible,setisInviteMemberVisible} =useContext(AppContext);
    const[form] = Form.useForm();
    const [emailOptions, setEmailOptions] = useState([]);
    const [selectedEmails, setSelectedEmails] = useState([]);
    //search
    const [searchValue, setSearchValue] = useState('');

    const debounced = useDebounce(searchValue,500);

    const handleOK = ()=>{
        const formValues = form.getFieldValue();
        const updatedFormValues = { ...formValues};
        axios.post(`http://127.0.0.1:8000/api/addmember/${channel_id}`,updatedFormValues).then((res)=>{
          alert(res.data.message);
        }).catch((err)=>{
          console.log(err);
        })

        form.resetFields();

        setisInviteMemberVisible(false)
    }
    const handleCancel = ()=>{
        setisInviteMemberVisible(false)
    }

    const handleEmailChange = (values) => {
      setSelectedEmails(values);
    };

    const handleSearchChange = (values) => {
        setSearchValue(values);
      };

    useEffect(()=>{
        if(!debounced){
            setSearchValue([])
        }

        axios.post('http://127.0.0.1:8000/api/search',
            {
                term:debounced,
                members:members
            }
        ).then((res)=>{
            setEmailOptions(res.data);
        }).catch((err)=>{
            console.log(err);
        })


        
    },[debounced])
    
  return (
    <div>
    <Modal
        title="Invite Member"
        visible={isInviteMemberVisible}
        onOk={handleOK}
        onCancel={handleCancel}
    >
      <Form form={form} layout='vertical'>
          <Form.Item label="Email" name="email">
            <Select
                mode="tags"
                placeholder="Enter Email addresses"
                onChange={handleEmailChange}
                onSearch={handleSearchChange}
                value={selectedEmails}
            >
              {emailOptions.map((email) => (
                  <Option key={email} value={email}>
                    {email}
                  </Option>
                ))}
            </Select>
          </Form.Item>
      </Form>
    </Modal>
  </div>
  )
}

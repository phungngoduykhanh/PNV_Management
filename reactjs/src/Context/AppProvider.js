import React, { useEffect, useMemo, useState } from 'react'
import useRealtimeDatabase from '../hooks/useRealtimeDatabase';

export const AppContext = React.createContext();

export default function AppProvider({children}) {
  const [isAddChannelVisible,setisAddChannelVisible] = useState(false);
  const [isInviteMemberVisible,setisInviteMemberVisible] = useState(false);
  const [selectedChannelId,setSelectedChannelId] = useState(null);
  const [channels, setChannel] = useState([]);
  
  const useRealtimeChannels = (id) => {
    const condition = useMemo(() => {
      return { fieldName: "chatroom_id", compareValue: parseInt(id) };
    }, [id]);
  
    useRealtimeDatabase({
      collection: "channels",
      condition,
      setDocuments: setChannel
    });
  };

  const selectedChannel = useMemo (()=>{
    if (!selectedChannelId && channels.length > 0) {
      return channels[0];
    }

    return channels.find(channel=>channel.id == selectedChannelId)
  }
  ,[channels,selectedChannelId]);

    return (
    <AppContext.Provider value={{
      isAddChannelVisible,
      setisAddChannelVisible,
      selectedChannelId,
      setSelectedChannelId,
      channels,
      useRealtimeChannels,
      selectedChannel,
      isInviteMemberVisible,
      setisInviteMemberVisible
      }}>
        {children}
    </AppContext.Provider>
  )
}

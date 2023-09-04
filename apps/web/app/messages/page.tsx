"use client"
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {useRecoilState, useSetRecoilState, useRecoilValue} from 'recoil'
import {userState, usersState, allThreadsState, threadsState} from 'store'
import {useToast} from '@ui/components/use-toast'
import { Button } from "@ui/components/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@ui/components/popover"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@ui/components/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@ui/components/tabs"
import {Label} from '@ui/components/label'
import {Input} from '@ui/components/input'
import io, { Socket } from 'socket.io-client';

type tokenType = {
  id: string,
  username: string
}
function page() {
  useEffect(() => {
    join()
  })
  let socket: Socket;
  const join = () => {
    socket = io("http://localhost:3010/");
  };
  const router = useRouter()
  const { toast } = useToast()
  const setUserState = useSetRecoilState(userState)
  const user = useRecoilState(userState)
  const setUsersState = useSetRecoilState(usersState)
  const setThreadsState = useSetRecoilState(threadsState)
  const followingThreadsState = useRecoilState(threadsState)
  const setAllThreadsState = useSetRecoilState(allThreadsState)
  const currThreadsState = useRecoilState(allThreadsState)
  const [chats, setChats] = useState([])
  const [chatNames, setChatNames] = useState([])
  const [currentUsername, setCurrentUsername] = useState("")
  const [currentUserChatId, setCurrentUserChatId] = useState("")
  async function getUserDecodedToken() {
    const res = await axios.get("http://localhost:3010/decodedToken", {
        headers: {
           'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
    })
    const data = await res.data;
    return data;
  }
  async function getUserFromDecodedToken(token: tokenType) {
    const res = await axios.post("http://localhost:3010/getUser", {
        id: token.id,
        username: token.username
    })
    const data = await res.data;
    return data;
  }
  async function getRecommendedUsers() {
    const res = await axios.get("http://localhost:3010/all_users", {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`
     }
    })
    const data = await res.data;
    return data;
  }
  async function getThreadsOfFollowing() {
    const res = await axios.get("http://localhost:3010/get_following_threads", {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`
     }
    })
    const data = await res.data;
    return data;
  }
  async function getAllThreads() {
    const res = await axios.get("http://localhost:3010/all_threads", {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`
     }
    })
    const data = await res.data;
    return data;
  }
  async function getChatNames() {
    const res = await axios.get("http://localhost:3010/get_sidebar_chats", {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`
     }
    })
    const data = await res.data;
    console.log(data)
    return data;
  }
  async function getMessages(chatId: string) {
    const res = await axios.post("http://localhost:3010/get_messages", {
      chatId: chatId
    })
    const data = await res.data;
    console.log(data)
    return data;
  }
  async function callStack() {
    const userDecodedToken = await getUserDecodedToken();
    const user = await getUserFromDecodedToken(userDecodedToken?.userDecodedToken)
    setUserState(user.user)
    const recommendedUsers = await getRecommendedUsers();
    setUsersState(recommendedUsers.users)
    const threadsOfFollowing = await getThreadsOfFollowing()
    setThreadsState(threadsOfFollowing.threads)
    const allThreads = await getAllThreads();
    setAllThreadsState(allThreads.threads);
    const getUserChatNames = await getChatNames();
    setChatNames(getUserChatNames.chats)
  }
  useEffect(() => {
    !localStorage.getItem("token") ? router.push("/") : callStack()
  }, [])
    return (
    <div style={{display: "flex"}}>
    <div style={{display: "flex", justifyContent: "left", width: "30%", position: 'sticky'}}>
     <Tabs defaultValue="account" className="w-full max-w-4xl">
        <div className="overflow-y-auto max-h-[calc(100vh-3rem)]">
    <TabsContent value="account">
    <Card style={{marginBottom: "10px"}}>
        <CardHeader>
        <h2 className="scroll-m-20 border-b pb-2 pr-4 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
          Messages
        </h2>
          <CardDescription>
            @{user[0].username}
          </CardDescription>
        </CardHeader>
        {chatNames.map((chat) => (
          <>
          <CardContent className="space-y-2 border-solid border-2 border-dotted-500 pt-5 rounded-lg" onClick={async () => {
            const data = await getMessages(chat._id)
            setChats(data.messages)
            setCurrentUsername(chat.users[1].username)
            setCurrentUserChatId(chat.users[1]._id)
          }}>
          <div className="space-y-1" style={{display: "flex", paddingRight: "10px", minWidth: "300px"}}>
            <div>
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            <img src={chat.users[1].profile_pic} style={{borderRadius: "25px", height: "40px", width: "40px", marginBottom: "10px"}}/> 
            </h3>
            </div>
            <div className='ml-5'>
                <h1 className='scroll-m-20 text-2xl font-semibold tracking-tight'>@{chat.users[1].username}</h1>
            </div>
          </div>
        </CardContent>
        </>
        ))}
      </Card>
    </TabsContent>
    </div>
  </Tabs>
</div>
{chats.length > 0 && (
 <div style={{marginLeft: "10px", marginTop: "6px"}}>
 <Card className="w-[950px]">
       <CardHeader>
         <CardTitle>@{currentUsername}</CardTitle>
       </CardHeader>
       <div style={{  display: "flex", flexDirection: "column" }}>
  {chats.map((text) => (
    <>
    <p
      key={text._id} 
      style={{
        alignSelf: user[0]._id === text.sender ? "flex-end" : "flex-start", 
        backgroundColor: user[0]._id === text.sender ? "#085c67" : "#851414", 
        padding: "5px", 
        borderRadius: "10px", 
        maxWidth: "70%", 
        marginBottom: "15px", 
        marginRight: "10px"
      }}
    >
      {text.message}
    </p>
    </>
  ))}
</div>
       <div style={{display: "flex"}}>
       <Input>
       </Input>
       <Button variant='outline'>Send</Button>
       </div>
     </Card>
 </div>
)}

</div>
    )
}

export default page




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



function page() {
  const router = useRouter()
  const { toast } = useToast()
  const setUserState = useSetRecoilState(userState)
  const user = useRecoilState(userState)
  const setUsersState = useSetRecoilState(usersState)
  const setThreadsState = useSetRecoilState(threadsState)
  const followingThreadsState = useRecoilState(threadsState)
  const setAllThreadsState = useSetRecoilState(allThreadsState)
  const currThreadsState = useRecoilState(allThreadsState)
  const [comment, setComment] = useState("")
  const [threadData, setThreadData] = useState("")
  async function getUserDecodedToken() {
    const res = await axios.get("http://localhost:3010/decodedToken", {
        headers: {
           'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
    })
    const data = await res.data;
    return data;
  }
  async function getUserFromDecodedToken(token) {
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
  async function likeThread(threadId: string, userId: string) {
    await axios.post("http://localhost:3010/like_thread", {
      userId: userId,
      threadId: threadId
    });
    alert("thread liked!")
  }
  async function addComment(threadId: string, comment: string, userId: string) {
    await axios.post("http://localhost:3010/create_comment", {
      userId: userId,
      threadId: threadId,
      comment: comment
    });
    alert("commented on thread!")
  }
  async function addThread(thread: string, userId: string) {
    await axios.post("http://localhost:3010/create_threads", {
      userId: userId,
      thread: thread
    });
    alert("created thread!")
    window.location.reload()
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
  }
  useEffect(() => {
    !localStorage.getItem("token") ? router.push("/") : callStack()
  }, [])
    return (
    <div style={{display: "flex", flexDirection: "column"}}>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px", marginRight: "25px" }}>
      <div>
        <img src="https://variety.com/wp-content/uploads/2016/04/shrek.jpg?w=772" style={{ borderRadius: "99px", height: "70px", width: "80px", marginTop: "10px", marginLeft: "10px" }} />
      </div>
    <div>
    <Button variant="outline" style={{ marginLeft: "10px", marginRight: "10px"}} onClick={() => router.push("/messages")}>Messages</Button>
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Create Thread</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Create Thread:</h4>
            <p className="text-sm text-muted-foreground">
              Text for the Thread:
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="width">Text:</Label>
              <Input
                id="width"
                value={threadData}
                onChange={(e) => setThreadData(e.target.value)}
                className="col-span-2 h-8"
              />
              <Button onClick={() => addThread(threadData, user[0]._id)}>Create</Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  </div>
  </div>
  <div style={{display: "flex", justifyContent: "center"}}>
     <Tabs defaultValue="account" className="w-full max-w-4xl">
     <TabsList className="grid w-full grid-cols-2 sticky top-0 bg-blue z-10">
    <TabsTrigger value="account">All Threads</TabsTrigger>
    <TabsTrigger value="password">Following Threads</TabsTrigger>
  </TabsList>
  <div className="overflow-y-auto max-h-[calc(100vh-3rem)]">
    <TabsContent value="account">
    <Card style={{marginBottom: "20px"}}>
        <CardHeader>
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
          Recommended Threads
        </h2>
          <CardDescription>
            Find new people to interact with!
          </CardDescription>
        </CardHeader>
        {currThreadsState[0].map((thread) => (
          <CardContent className="space-y-2 border-solid border-2 border-dotted-500 pt-15 rounded-lg mr-4 ml-4">
          <div className="space-y-1">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            <img src={thread.userId.profile_pic} style={{borderRadius: "25px", height: "40px", width: "40px", marginBottom: "10px"}}/> {thread.userId.email}
            </h3>
            <CardDescription>
                @{thread.userId.username}
            </CardDescription>
          </div>
          <div className="space-y-1">
          <blockquote className="mt-6 border-l-2 pl-6 italic mb-10">
     {thread.thread}
    </blockquote>
          </div>
          <div style={{display: "flex", marginTop: "20px"}}>
          <Button variant="outline" style={{marginRight: "15px"}} onClick={() => {
            likeThread(thread._id, user[0]._id)
          }}>❤️</Button>
          <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">💬</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Comment:</h4>
            <p className="text-sm text-muted-foreground">
              Comment for the thread:
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="width">Text:</Label>
              <Input
                id="width"
                className="col-span-2 h-8"
                value={comment} 
                onChange={(e) => setComment(e.target.value)}
              />
              <Button onClick={() => addComment(thread._id, comment, user[0]._id)}>Comment</Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
          </div>
        </CardContent>
        ))}
      </Card>
    </TabsContent>
    </div>
    <TabsContent value="password">
    <Card style={{marginBottom: "20px"}}>
        <CardHeader>
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
          Threads of people you follow
        </h2>
          <CardDescription>
            Interact with your friends!
          </CardDescription>
        </CardHeader>
        {followingThreadsState[0].map((thread) => (
          <CardContent className="space-y-2 border-solid border-2 border-dotted-500 pt-15 rounded-lg mr-4 ml-4">
          <div className="space-y-1">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            <img src={thread.userId.profile_pic} style={{borderRadius: "25px", height: "40px", width: "40px", marginBottom: "10px"}}/> {thread.userId.email}
            </h3>
            <CardDescription>
                @{thread.userId.username}
            </CardDescription>
          </div>
          <div className="space-y-1">
          <blockquote className="mt-6 border-l-2 pl-6 italic mb-10">
     {thread.thread}
    </blockquote>
          </div>
          <div style={{display: "flex", marginTop: "20px"}}>
          <Button variant="outline" style={{marginRight: "15px"}}>❤️</Button>
          <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">💬</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Comment:</h4>
            <p className="text-sm text-muted-foreground">
              Comment for the thread:
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="width">Text:</Label>
              <Input
                id="width"
                defaultValue="hello!"
                className="col-span-2 h-8"
              />
              <Button>Comment</Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
          </div>
        </CardContent>
        ))}
      </Card>
    </TabsContent>
  </Tabs>
</div>
</div>

    )
}

export default page


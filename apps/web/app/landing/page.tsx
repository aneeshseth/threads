"use client"
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {useRecoilState, useSetRecoilState, useRecoilValue} from 'recoil'
import {userState, usersState, threadsState, allThreadsState} from 'store'



function page() {
  const router = useRouter()
  const setUserState = useSetRecoilState(userState)
  const setUsersState = useSetRecoilState(usersState)
  const setThreadsState = useSetRecoilState(threadsState)
  const setAllThreadsState = useSetRecoilState(allThreadsState)
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
      <>
      <div>
          landing page 
      </div>
       </>
    )
}

export default page



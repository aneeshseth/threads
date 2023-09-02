"use client"
import { useEffect, useState } from "react"; 
import { Button } from "@ui/components/button";
import { Input } from "@ui/components/input";
import { useRouter } from "next/navigation";
import {signupInput} from 'types'


import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@ui/components/card"
import { Label } from "@ui/components/label"

import { useTheme } from "next-themes";
import axios from 'axios'




export default function Page() {
  const { setTheme } = useTheme();
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [profileForNow, setProfileForNow] = useState("")
  const [file, setFile] = useState("")
  async function handleSignup() {
    try {
      const res = await axios.post("http://localhost:3010/signup", {
        username: username, 
        password: password,
        profile_pic: profileForNow,
        email: email,
        role: "user"
      })
      const data = await res.data;
      router.push("/login")
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    localStorage.getItem("token") ? router.push("/landing") : ""
  }, [])
  return (
    <>
      <button onClick={() => setTheme("system")}>🌙</button>
      <button onClick={() => setTheme("light")}>🔅</button>
      <Card className="w-[350px]">
      <CardHeader>
      <CardTitle>Signup into Threads</CardTitle>
          <CardDescription>Creating relationships for life.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Username</Label>
              <Input id="name" placeholder="aneeshseth" value={username} onChange={(e)=>setUsername(e.target.value)} />
            </div>
             <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Password</Label>
              <Input id="name" placeholder="we9hou2eukdh" type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </div>
             <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Email Address</Label>
              <Input id="name" placeholder="randomemail@gmail.com" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            <div>
              <input placeholder="profile for now" value={profileForNow} onChange={(e)=>setProfileForNow(e.target.value)}></input>
            </div>
             <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Profile Picture {"(optional)"}</Label>
              <Input id="name" type="file" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button onClick={handleSignup}>Signup</Button>
      </CardFooter>
    </Card>
    <Link href="/login">Have an account? Login Instead.</Link>
    </>
  );
}

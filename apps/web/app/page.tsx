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
  const [file, setFile] = useState<File | null>()
  const [profileForNow, setProfileForNow] = useState("")
  const submit = async (event) => {
    try {
      event.preventDefault()
      const formData = new FormData()
      formData.append("image", file)
      const setProfilePic = await axios.post("http://localhost:3010/api/posts", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      const data = await setProfilePic.data;
      setProfileForNow(data.image)
      alert("Profile picture has been set!")
    } catch (err) {
      console.log(err)
    }
  }
  async function handleSignup() {
    try {
      const res = await axios.post("http://localhost:3010/signup", {
        username: username, 
        password: password,
        profile_pic: profileForNow === "" ? "https://ih0.redbubble.net/image.1046392278.3346/raf,360x360,075,t,fafafa:ca443f4786.jpg" : profileForNow,
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
            <form onSubmit={submit}>
              <Input onChange={(e) => setFile(e.target.files[0])} type="file" accept="image/*"/>
              <Button type="submit" style={{marginLeft: "50px", marginTop: "20px"}}>Set as profile picture</Button>
            </form>
            </div>
          </div>
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

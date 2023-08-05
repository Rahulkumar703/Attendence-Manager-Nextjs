"use client"
import { useState } from "react";
import Input from "@/components/Input";
import './style.css'
import Button from "@/components/Button";
import { toast } from 'react-toastify';
import Link from "next/link";
import { BiLogIn } from "react-icons/bi";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from 'next-auth/react'




export default function LoginPage() {

    const router = useRouter();
    const params = useSearchParams();

    const [loginForm, setLoginForm] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setLoginForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const res = await fetch('/api/login', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginForm),
                cache: 'no-cache'
            })

            const data = await res.json();

            if (res.ok) {
                if (data.type === "success") {
                    await signIn('credentials', {
                        redirect: false,
                        ...loginForm,
                    });
                    toast[data.type](data.message);
                    const callbackUrl = params.get('callbackUrl') || '/dashboard';
                    router.push(callbackUrl);
                }
            }

        } catch (error) {
            toast.error(error.message);
        }
        finally {
            setIsLoading(false)
        }
    }


    return (
        <main className="login">
            <div className="outer_box login_box">
                <h3 className="box_title">Login</h3>
                <form className="inner_box" onSubmit={handleSubmit}>
                    <Input type={"number"} name={"roll"} id={"roll"} label={"Roll No."} onChange={handleChange} />
                    <Input type={"password"} name={"password"} id={"password"} label={"Password"} onChange={handleChange} />
                    <div className="extra_links">
                        <Link href={'/forgot'}>forgot password ?</Link>
                    </div>
                    <Button type="submit" varrient="filled" onClick={handleSubmit} loading={isLoading} icon={<BiLogIn size={20} />}>Login</Button>
                </form>
                <div className="extra_links">
                    <p>{"Don't have an account ?"}</p><Link href={'/signup'}>Register now</Link>
                </div>
            </div>
        </main>
    )
}

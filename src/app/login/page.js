"use client"
import { useState } from "react";
import Input from "@/components/Input";
import styles from '@/styles/login_signup.module.scss'
import Button from "@/components/Button";
import { toast } from 'react-toastify';
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from 'next-auth/react'
import { FiLogIn } from "react-icons/fi";


export default function LoginPage() {


    const router = useRouter();
    const params = useSearchParams();

    const [loginForm, setLoginForm] = useState({
        userId: '',
        password: ''
    });

    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setLoginForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        const { signal } = new AbortController()
        try {
            setIsLoading(true);
            const res = await fetch('/api/login', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginForm),
                cache: 'no-store'
            }, { signal })

            const data = await res.json();

            if (res.ok) {
                if (data.type === "success") {
                    await signIn('credentials', {
                        redirect: false,
                        ...loginForm,
                    });

                    const callbackUrl = params.get('callbackUrl') || 'student/dashboard';
                    router.push(callbackUrl);
                }
            }
            toast[data.type](data.message, { toastId: 'login' });

        } catch (error) {
            toast.error(error.message, { toastId: 'loginError' });
        }
        finally {
            setIsLoading(false)
        }
    }

    return (
        <div className={styles.login}>
            <div className={styles.outer_box}>
                <h3 className={styles.box_title}>Login</h3>
                <form className={styles.inner_box} onSubmit={handleSubmit}>
                    <Input
                        type={"number"}
                        name={"userId"}
                        id={"userId"}
                        label={"Roll No."}
                        value={loginForm.userId}
                        onChange={handleChange}
                        disabled={isLoading}
                    />
                    <Input
                        type={"password"}
                        name={"password"}
                        id={"password"}
                        label={"Password"}
                        value={loginForm.password}
                        onChange={handleChange}
                        disabled={isLoading}
                    />
                    <div className={styles.extra_links}>
                        <p>Having Trouble?</p>
                        <Link href={'/forgot'}>reset password</Link>
                    </div>
                    <Button
                        type="submit"
                        varrient="filled"
                        onClick={handleSubmit}
                        loading={isLoading}
                    >
                        <FiLogIn size={20} />
                        Login
                    </Button>
                </form>
            </div>
        </div>
    )
}

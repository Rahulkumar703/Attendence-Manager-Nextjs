"use client"
import { useEffect, useState } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { toast } from 'react-toastify';
import './style.css';
import Link from "next/link";
import { HiOutlineUserAdd } from 'react-icons/hi'
import { useRouter } from "next/navigation";



export default function SignupPage() {

    const router = useRouter();

    const [loginForm, setLoginForm] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [disabled, setDisabled] = useState(true);

    const [department, setDepartment] = useState();

    useEffect(() => {
        const getDepartment = async () => {
            try {
                const res = await fetch('/api/department', {
                    method: "GET",
                });

                const data = await res.json();
                if (data.type === 'success') {
                    setDepartment(data.department);
                }
            } catch (error) {
                toast.error(error.message);
            }
            finally {
                setDisabled(false);
            }
        }
        getDepartment();

    }, [])

    const handleChange = (e) => {
        setLoginForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setIsLoading(true);
            const res = await fetch('/api/signup', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    cache: "no-cache",
                },
                body: JSON.stringify(loginForm)
            });

            const data = await res.json();

            toast[data.type](data.message);

            if (res.ok) {
                if (data.type === "success") {
                    router.push('/login');
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
        <main className="signup">
            <div className="outer_box signup_box">
                <h3 className="box_title">Signup</h3>
                <form method="POST" className="inner_box" onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="input_section">
                            <div className="section_heading">
                                <h3>College Details:</h3>
                            </div>
                            <div className="section_body">
                                <Input
                                    type={"number"}
                                    name={"roll"}
                                    id={"roll"}
                                    label={"Roll No."}
                                    onChange={handleChange}
                                    min={10000} max={90000} />
                                <Input
                                    type={"number"}
                                    name={"semester"}
                                    id={"semester"}
                                    label={"Semester"}
                                    onChange={handleChange}
                                    min={1} max={8} />
                                <Input
                                    type={"select"}
                                    options={department}
                                    name={"branch"}
                                    id={"branch"}
                                    label={"Branch"}
                                    onChange={handleChange}
                                    disabled={disabled}
                                />
                            </div>
                        </div>
                        <div className="input_section">
                            <div className="section_heading">
                                <h3>Personal Details:</h3>
                            </div>
                            <div className="section_body">
                                <Input type={"text"} name={"name"} id={"name"} label={"Name"} onChange={handleChange} />
                                <Input type={"email"} name={"email"} id={"email"} label={"Email"} onChange={handleChange} />
                                <Input type={"password"} name={"password"} id={"password"} label={"Password"} onChange={handleChange} />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <Button type="submit" varrient="filled" onClick={handleSubmit} loading={isLoading} icon={<HiOutlineUserAdd size={20} />}>Signup</Button>
                    </div>
                </form>
                <div className="extra_links">
                    <p>{"Already have an account ?"}</p><Link href={'/login'}>Login here</Link>
                </div>
            </div>
        </main>
    )
}

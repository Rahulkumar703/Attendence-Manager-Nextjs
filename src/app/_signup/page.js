"use client"
import { useEffect, useState } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { toast } from 'react-toastify';
import styles from '@/styles/login_signup.module.scss';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiUserPlus } from "react-icons/fi";



export default function SignupPage() {

    const router = useRouter();

    const [signupForm, setSignupForm] = useState({
        name: '',
        email: '',
        password: '',
        userId: '',
        department: { _id: '', name: '' }
    });
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
                    setDepartment(data.departments);
                }
            } catch (error) {
                toast.error(error.message, { toastId: 'getDepartmentError' });
            }
            finally {
                setDisabled(false);
            }
        }
        getDepartment();

    }, [])

    const handleChange = (e) => {
        setSignupForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setIsLoading(true);
            const { signal } = new AbortController()
            const res = await fetch('/api/signup', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...signupForm, department: signupForm.department._id }),
                cache: "no-store"
            }, { signal });

            const data = await res.json();

            toast[data.type](data.message, { toastId: 'signup' });

            if (res.ok) {
                if (data.type === "success") {
                    router.push('/login');
                }
            }
        } catch (error) {
            toast.error(error.message, { toastId: 'signupError' });
        }
        finally {
            setIsLoading(false)
        }

    }


    return (
        <div className={styles.signup}>
            <div className={styles.outer_box}>
                <h3 className={styles.box_title}>Signup</h3>
                <form method="POST" className={styles.inner_box} onSubmit={handleSubmit}>
                    <div className={styles.row}>
                        <div className={styles.input_section}>
                            <div className={styles.section_heading}>
                                <h3>Personal Details:</h3>
                            </div>
                            <div className={styles.section_body}>
                                <Input
                                    type={"text"}
                                    name={"name"}
                                    id={"name"}
                                    label={"Name"}
                                    onChange={handleChange}
                                    value={signupForm.name}
                                    disabled={isLoading}
                                />
                                <Input
                                    type={"email"}
                                    name={"email"}
                                    id={"email"}
                                    label={"Email"}
                                    onChange={handleChange}
                                    value={signupForm.email}
                                    disabled={isLoading}
                                />
                                <Input
                                    type={"password"}
                                    name={"password"}
                                    id={"password"}
                                    label={"Password"}
                                    onChange={handleChange}
                                    value={signupForm.password}
                                    disabled={isLoading}
                                />
                            </div>
                        </div>
                        <div className={styles.input_section}>
                            <div className={styles.section_heading}>
                                <h3>College Details:</h3>
                            </div>
                            <div className={styles.section_body}>
                                <Input
                                    type={"number"}
                                    name={"userId"}
                                    id={"userId"}
                                    label={"Roll No."}
                                    onChange={handleChange}
                                    value={signupForm.userId}
                                    min={10000} max={90000}
                                    disabled={isLoading}
                                />
                                <Input
                                    type={"select"}
                                    options={department}
                                    name={"department"}
                                    id={"department"}
                                    label={"Department"}
                                    onChange={handleChange}
                                    value={signupForm.department.name}
                                    disabled={disabled}
                                />
                            </div>
                        </div>
                    </div>

                    <div className={styles.row}>
                        <Button
                            className={styles.button}
                            type="submit"
                            varrient="filled"
                            onClick={handleSubmit}
                            loading={isLoading}
                        >
                            <FiUserPlus size={20} />
                            Signup
                        </Button>
                    </div>

                </form>
                <div className={styles.extra_links}>
                    <p>{"Already have an account ?"}</p><Link href={'/login'}>Login here</Link>
                </div>
            </div>
        </div>
    )
}

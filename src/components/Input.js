"use client"
import { useEffect, useRef, useState } from 'react';
import styles from './styles/Input.module.scss';
import { FiChevronDown, FiEye, FiEyeOff } from 'react-icons/fi';


export default function Input(
    {
        type,
        id,
        label,
        name,
        options,
        disabled = false,
        value,
        onChange
    }
) {



    const [showPassword, setShowPassword] = useState(false);
    const [showOptions, setShowOptions] = useState(false);



    const selectContainerRef = useRef();


    useEffect(() => {

        const handleOutClick = (e) => {
            if (!selectContainerRef?.current?.contains(e.target)) {
                setShowOptions(false);
            }
        }
        document.addEventListener('mousedown', handleOutClick)

        return () => {
            document.removeEventListener('mousedown', handleOutClick)
        }
    })


    const handelChange = (e) => {
        onChange(e);
    }


    const handleOptionSelect = (option) => {
        setShowOptions(false);
        const e = {
            target: {
                name,
                value: {
                    _id: option._id,
                    name: option.name
                }
            }
        }
        onChange(e);
    }
    const toggleOptions = () => {
        setShowOptions(prev => !prev)
    }

    switch (type) {
        case "password":
            return (
                <div className={`${styles.input_box} ${styles.icon}`}>
                    <input
                        type={showPassword ? 'text' : type}
                        id={id}
                        name={name}
                        value={value}
                        autoComplete={name}
                        onChange={handelChange}
                        disabled={disabled}
                    />
                    <label htmlFor={id}>{label}</label>
                    <div className={styles.eye_icon} onClick={() => { setShowPassword(prev => !prev) }}>
                        {
                            showPassword ?
                                <FiEyeOff size={20} className={styles.icons} /> :
                                <FiEye size={20} className={styles.icons} />
                        }
                    </div>
                </div>
            )
        case "select":
            return (
                <div className={styles.input_box}>
                    <div className={styles.custom_selectbox} ref={selectContainerRef}>
                        <input className={styles.select_input}
                            type="text" name={name}
                            id={id} placeholder={disabled ? 'Please wait...' : 'Select your Branch'}
                            value={value}
                            readOnly
                            onClick={toggleOptions}
                            disabled={disabled}
                        />
                        <div className={styles.dropdown_icon}>
                            <FiChevronDown size={20} className={styles.icon} />
                        </div>
                        <div className={`${styles.option_box} ${showOptions ? styles.active : ''}`}>
                            {
                                options?.length ?
                                    options?.map((option, index) => {
                                        return (
                                            <div className={styles.options} key={index} onClick={() => { handleOptionSelect(option) }}>
                                                <p>{option.name}</p>
                                                <p className={styles.code}>Code : {option.code}</p>
                                            </div>
                                        )
                                    })
                                    :
                                    <div className={styles.options} >
                                        <p>No Department found</p>
                                    </div>

                            }
                        </div>
                    </div>
                    <label htmlFor={id}>{label}</label>
                </div >
            )
        case "number":
            return (
                <div className={styles.input_box}>
                    <input
                        type={type}
                        id={id}
                        name={name}
                        value={value}
                        autoComplete={name}
                        onChange={handelChange}
                        disabled={disabled}
                    />
                    <label htmlFor={id}>{label}</label>
                </div>
            )
        default:
            return (
                <div className={styles.input_box}>
                    <input
                        type={type}
                        id={id}
                        name={name}
                        value={value}
                        autoComplete={name}
                        onChange={handelChange}
                        disabled={disabled}
                    />
                    <label htmlFor={id}>{label}</label>
                </div>
            )
    }
}

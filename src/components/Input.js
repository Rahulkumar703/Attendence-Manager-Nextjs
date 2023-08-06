"use client"
import { useState } from 'react';
import './Input.css';
import { LiaEye, LiaEyeSlash } from 'react-icons/lia';
import { BsChevronCompactDown } from 'react-icons/bs';


export default function Input({ type, id, label, name, onChange, options, min, max, disabled = false }) {
    const [value, setValue] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const [selectedValue, setSelectedValue] = useState('');
    const handelChange = (e) => {
        setValue(e.target.value);
        onChange(e);
    }
    const handleOptionSelect = (option) => {
        setSelectedValue(option.name);
        setShowOptions(false);
        console.log(option);
        const e = {
            target: {
                name,
                value: option._id
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
                <div className="input_box icon">
                    <input type={showPassword ? 'text' : type} id={id} name={name} value={value} autoComplete={name} onChange={handelChange} />
                    <label htmlFor={id}>{label}</label>
                    <div className="eye_icon" onClick={() => { setShowPassword(prev => !prev) }}>
                        {
                            showPassword ?
                                <LiaEyeSlash size={20} className='icons' /> :
                                <LiaEye size={20} className='icons' />
                        }
                    </div>
                </div>
            )
        case "select":
            return (
                <div className="input_box">
                    <div className="custom_selectbox">
                        <input className="select_input" type="text" name={name} id={id} placeholder='Select your Branch' value={selectedValue} readOnly onClick={toggleOptions} disabled={disabled} />
                        <div className="dropdown_icon">
                            <BsChevronCompactDown size={20} className='icon' />
                        </div>
                        <div className={`option_box ${showOptions ? 'active' : ''}`} >
                            {
                                options?.length ?
                                    options?.map((option, index) => {
                                        return (
                                            <div className="options" key={index} onClick={() => { handleOptionSelect(option) }}>
                                                <p>{option.name}</p>
                                                <p className='code'>Code : {option.code}</p>
                                            </div>
                                        )
                                    })
                                    :
                                    <div className="options" >
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
                <div className="input_box">
                    <input type={type} id={id} name={name} value={value} autoComplete={name} onChange={handelChange} min={min} max={max} />
                    <label htmlFor={id}>{label}</label>
                </div>
            )
        default:
            return (
                <div className="input_box">
                    <input type={type} id={id} name={name} value={value} autoComplete={name} onChange={handelChange} />
                    <label htmlFor={id}>{label}</label>
                </div>
            )
    }
}

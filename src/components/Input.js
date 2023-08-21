"use client"
import { useEffect, useState } from 'react';
import styles from './styles/Input.module.scss';
import { FiChevronDown, FiEye, FiEyeOff } from 'react-icons/fi';

export default function Input({
    type,
    id,
    label,
    name,
    options,
    disabled = false,
    value,
    onChange,
    placeholder,
    className
}) {
    const [selectTypedValue, setSelectTypedValue] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showOptions, setShowOptions] = useState(false);

    useEffect(() => {
        setSelectTypedValue(value);
    }, [value])

    const handelChange = (e) => {
        onChange(e);
    };

    const handleSelectChange = (e) => {
        if (!showOptions) setShowOptions(true);
        setSelectTypedValue(e.target.value);
    };

    const handleBlur = () => {
        const isValid = options
            .filter(option =>
                option.name.toLowerCase().includes(selectTypedValue.toLowerCase())
            )
            .length

        if (!isValid) {
            const e = {
                target: {
                    name,
                    value: {
                        _id: '',
                        name: ''
                    }
                }
            };
            setSelectTypedValue('');
            onChange(e);
        }
        if (selectTypedValue === '') setShowOptions(false);
    };

    const handleOptionSelect = (event, option) => {
        event.stopPropagation();
        setShowOptions(false);
        const e = {
            target: {
                name,
                value: {
                    _id: option._id,
                    name: option.name
                }
            }
        };
        setSelectTypedValue(option.name);
        onChange(e);
    };

    const toggleOptions = () => {
        setShowOptions(prev => !prev);
    };

    const renderOptions = () => {
        if (options && !(options.filter(option =>
            option.name.toLowerCase().includes(selectTypedValue.toLowerCase())
        ).length)) {
            return (
                <div className={styles.options}>
                    <p>No Result found</p>
                </div>
            );
        }

        return options && options
            .filter(option =>
                option.name.toLowerCase().includes(selectTypedValue.toLowerCase())
            )
            .map((option, index) => (
                <div className={styles.options} key={index} onClick={(e) => handleOptionSelect(e, option)}>
                    <p>{option.name}</p>
                    <p className={styles.code}>Code : {option.code || option.userId}</p>
                </div>
            ));
    };

    const inputTypeMap = {
        password: (
            <div className={`${styles.input_box} ${className || ''} ${styles.icon}`}>
                <input
                    type={showPassword ? 'text' : type}
                    id={id}
                    name={name}
                    value={value}
                    autoComplete={name}
                    onChange={handelChange}
                    disabled={disabled}
                    placeholder={placeholder}
                />
                {label && <label htmlFor={id}>{label}</label>}
                <div className={styles.eye_icon} onClick={() => setShowPassword(prev => !prev)}>
                    {showPassword ? <FiEyeOff size={20} className={styles.icons} /> : <FiEye size={20} className={styles.icons} />}
                </div>
            </div>
        ),
        select: (
            <div className={`${styles.input_box} ${className || ''}`}>
                <div
                    className={styles.custom_selectbox}
                    onBlur={handleBlur}
                >
                    <input
                        className={styles.select_input}
                        type="text"
                        name={name}
                        id={id}
                        placeholder={disabled ? 'Please wait...' : ''}
                        value={selectTypedValue}
                        disabled={disabled}
                        onChange={handleSelectChange}
                        autoComplete='off'
                    />
                    <div className={styles.dropdown_icon} onClick={toggleOptions}>
                        <FiChevronDown size={20} className={styles.icon} />
                    </div>
                    <div className={`${styles.option_box} ${showOptions && styles.active}`}>
                        {renderOptions()}
                    </div>
                </div>
                {label && <label htmlFor={id}>{label}</label>}
            </div>
        ),
        number: (
            <div className={`${styles.input_box} ${className || ''}`}>
                <input
                    type={type}
                    id={id}
                    name={name}
                    value={value}
                    autoComplete={name}
                    onChange={handelChange}
                    disabled={disabled}
                    placeholder={placeholder}
                />
                {label && <label htmlFor={id}>{label}</label>}
            </div>
        ),
        default: (
            <div className={`${styles.input_box} ${className || ''}`}>
                <input
                    type={type}
                    id={id}
                    name={name}
                    value={value}
                    autoComplete={name}
                    onChange={handelChange}
                    disabled={disabled}
                    placeholder={placeholder}
                />
                {label && <label htmlFor={id}>{label}</label>}
            </div>
        )
    };

    return inputTypeMap[type] || inputTypeMap.default;
}

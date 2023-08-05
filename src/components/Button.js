import './Button.css';
import { BiLoaderCircle } from 'react-icons/bi'

export default function Button(props) {
    const { onClick, type, varrient, children, loading, icon } = props;

    const handleClick = (e) => {
        onClick(e);
    }
    return (
        <button type={type} onClick={handleClick} className={`button ${varrient}`} disabled={loading}>
            {
                loading ? <BiLoaderCircle size={20} className='icon_spin' /> : icon
            }
            {children}
        </button>
    )
}

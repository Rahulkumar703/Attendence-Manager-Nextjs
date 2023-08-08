import style from './styles/Button.module.scss';
import { BiLoaderCircle } from 'react-icons/bi'

export default function Button(props) {
    const { onClick, type, varrient, children, loading } = props;

    const handleClick = (e) => {
        onClick(e);
    }
    return (
        <button type={type} onClick={handleClick} className={`${style.button} ${style[varrient]}`} disabled={loading}>
            {
                loading ?
                    <>
                        <BiLoaderCircle size={20} className={style.spin} />
                        Please wait...
                    </>
                    :
                    children
            }
        </button>
    )
}

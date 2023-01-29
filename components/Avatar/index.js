import Image from "next/image";
import styles from './styles.module.css'

export default function Avatar ({ alt, src, width, height }) {

    return (
        <div>
            <Image className={ styles.avatar } 
                   alt={alt} 
                   src={src} 
                   title={alt}
                   width={width}
                   height={height}
                   />
        </div>
    )
}
import { colors } from "../../styles/theme";

export default function Button ( { children, disabled, onClick } ) {

    return (
        <>
            <button onClick={ onClick }
                    disabled={disabled}
            >
                {children}
            </button>

            <style jsx>{`
                button{
                    align-items: center;
                    background: ${ colors.black };
                    border-radius: 9999px;
                    border: 0;
                    color: #fff;
                    cursor: pointer;
                    display: flex;
                    font-weight: 800;
                    gap: 10px;
                    padding: 10px 24px;
                    transition: opacity .3s ease;
                }
                button:hover{
                    opacity: .7
                }
                button:disabled{
                    opacity: 0.3;
                    cursor: default;
                }
            `}</style>
        </>
    )


}
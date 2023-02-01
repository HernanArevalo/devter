import { useState } from "react";
import AppLayout from "../../../components/AppLayout";
import Button from "../../../components/Button";
import { addDevit } from "../../../firebase/client";
import useUser from "../../../hooks/useUser";

export default function ComposeTweet() {

    const user = useUser()
    const [message, setMessage] = useState('')

    const handleChange = (e) => {
        const {value} = e.target
        setMessage( value )

    }
    const handleSubmit = (e) => {
        e.preventDefault()
        
        addDevit({
            avatar: user.photoURL,
            content: message,
            userId: user.uid,
            userName: user.displayName
        })

    }

    return (
        <>
            <AppLayout>
                <form onSubmit={ handleSubmit }>
                    <textarea placeholder="¿Qué está pasando?"
                              onChange={ handleChange }>
                    </textarea>
                    <div>
                        <Button disabled={ message.length === 0 }>Devitear</Button>
                    </div>
                </form>
            </AppLayout>

            <style jsx>{`
                div {
                padding: 15px;
                }
                textarea {
                border: 0;
                font-size: 21px;
                min-height: 200px;
                padding: 15px;
                outline: 0;
                resize: none;
                width: 100%;
                }
            `}</style>

        </>

    )
}
import { Router, useRouter } from "next/router";
import { useState } from "react";
import AppLayout from "../../../components/AppLayout";
import Button from "../../../components/Button";
import { addDevit } from "../../../firebase/client";
import useUser from "../../../hooks/useUser";

const COMPOSE_STATES = {
    USER_NOT_KNOWN: 0,
    LOADING: 1,
    SUCCESS: 2,
    ERROR: -1
}

export default function ComposeTweet() {

    const router = useRouter()
    const user = useUser()
    const [status, setStatus] = useState( COMPOSE_STATES.USER_NOT_KNOWN )
    const [message, setMessage] = useState('')

    const handleChange = (e) => {
        const {value} = e.target
        setMessage( value )

    }
    const handleSubmit = (e) => {
        e.preventDefault()
        
        setStatus( COMPOSE_STATES.LOADING )
        addDevit({
            avatar: user.photoURL,
            content: message,
            userId: user.uid,
            userName: user.displayName
        }).then(() => {
            router.push('/home')
            setStatus( COMPOSE_STATES.SUCCESS )
            setMessage('')
        }).catch((e) =>{
            console.error(e)
            setStatus( COMPOSE_STATES.ERROR )
        })


    }

    const isButtonDisabled = !message.length || status === COMPOSE_STATES.LOADING

    return (
        <>
            <AppLayout>
                <form onSubmit={ handleSubmit }>
                    <textarea placeholder="¿Qué está pasando?"
                              onChange={ handleChange }>
                    </textarea>
                    <div>
                        <Button disabled={ isButtonDisabled }>Devitear</Button>
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
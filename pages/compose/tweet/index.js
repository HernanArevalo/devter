import Head from "next/head";
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

const DRAG_IMAGE_STATES = {
    ERROR: -1,
    NONE: 0,
    DRAG_OVER: 1,
    UPLOADING: 2,
    COMPLETE: 3
}

export default function ComposeTweet() {

    const router = useRouter()
    const user = useUser()


    const [status, setStatus] = useState( COMPOSE_STATES.USER_NOT_KNOWN )
    const [message, setMessage] = useState('')

    
    const [drag, setDrag] = useState(DRAG_IMAGE_STATES.NONE)
    const [task, setTask] = useState(null)
    const [imgURL, setImgURL] = useState(null)


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

    const handleDragEnter = () => {
        setDrag(DRAG_IMAGE_STATES.DRAG_OVER)
    }

    const handleDragLeave = () => {
        setDrag(DRAG_IMAGE_STATES.NONE)
    }

    const handleDrop = () => {
        setDrag(DRAG_IMAGE_STATES.NONE)

    }


    const isButtonDisabled = !message.length || status === COMPOSE_STATES.LOADING

    return (
        <>
            <AppLayout>
                <Head>
                    <title>Crear un Devit / Devter</title>
                </Head>
                <form onSubmit={ handleSubmit }>
                    <textarea placeholder="¿Qué está pasando?"
                              onChange={ handleChange }
                              onDragEnter={ handleDragEnter }
                              onDragLeave={ handleDragLeave }
                              onDrop={ handleDrop }
                              value={message}>
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
                    
                border: ${drag === DRAG_IMAGE_STATES.DRAG_OVER? "2px dashed #09f":"2px solid rgba(0, 153, 255, 0.219)"};
                border-radius: 10px;
                margin: 15px;
                font-size: 21px;
                min-height: 200px;
                padding: 15px;
                outline: 0;
                resize: none;
                width: calc(100% - 30px);
                }
            `}</style>

        </>

    )
}
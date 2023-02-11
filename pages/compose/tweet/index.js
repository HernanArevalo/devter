import Head from "next/head";
import { Router, useRouter } from "next/router";
import { useEffect, useState } from "react";
import Avatar from "../../../components/Avatar";
import Button from "../../../components/Button";
import { addDevit, uploadImages } from "../../../firebase/client";
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
    const user = useUser(null)





    const [status, setStatus] = useState( COMPOSE_STATES.USER_NOT_KNOWN )
    const [message, setMessage] = useState('')

    
    const [drag, setDrag] = useState(DRAG_IMAGE_STATES.NONE)
    const [task, setTask] = useState(null)
    const [imgURL, setImgURL] = useState(null)

    useEffect(()=>{
        if(task){
            let onProgress = () => {}
            let onError = () => {}
            let onComplete = () => {

            }

            // task.on('state_changed', onProgress, onError, onComplete)
        }


    },[task])


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

    const handleDragEnter = (e) => {
        e.preventDefault()
        setDrag(DRAG_IMAGE_STATES.DRAG_OVER)
    }

    const handleDragLeave = (e) => {
        e.preventDefault()
        setDrag(DRAG_IMAGE_STATES.NONE)
    }

    const handleDrop = (e) => {
        e.preventDefault()

        setDrag(DRAG_IMAGE_STATES.NONE)
        
        const task = uploadImages(e.dataTransfer.files[0])
            .then(()=>{
                console.log('handleDrop',task)
                setTask(task)

            })
    }


    const isButtonDisabled = !message.length || status === COMPOSE_STATES.LOADING

    return (
        <>
            <Head>
                <title>Crear un Devit / Devter</title>
            </Head>

            <section className="form-container">
            {user && (
                <section className="avatar-container">
                    <Avatar alt={user?.displayName} src={user?.photoURL} width='100' height={'100'}/>  
                </section>
            )}
                <form onSubmit={ handleSubmit }>
                    <textarea   placeholder="¿Qué está pasando?"
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

            </section>

        <style jsx>{`
            div {
            padding-top: 15px;
            }

            button {
            background: rgba(0, 0, 0, 0.3);
            border: 0;
            border-radius: 999px;
            color: #fff;
            font-size: 24px;
            width: 32px;
            height: 32px;
            top: 15px;
            position: absolute;
            right: 15px;
            }
            .form-container {
            align-items: flex-start;
            display: flex;
            width: 100%;
            padding: 15px;
            gap: 15px;
            
            }

            form{
                flex-grow: 2;
            }

            textarea {
                border: ${drag === DRAG_IMAGE_STATES.DRAG_OVER?
                            "2px dashed #09f":
                            "2px solid rgba(0, 153, 255, 0.219)"};
                border-radius: 10px;
                font-size: 21px;
                min-height: 200px;
                padding: 15px;
                outline: 0;
                resize: none;
                width: 100%
            }
      `}</style>

        </>

    )
}
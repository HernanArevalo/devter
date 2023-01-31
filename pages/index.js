import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import AppLayout from '../components/AppLayout'
import Avatar from '../components/Avatar'
import Button from '../components/Button'
import GitHub from '../components/Icons/GitHub'
import Logo from '../components/Icons/Logo'
import { loginWithGithub, onAuthStateChanged } from '../firebase/client'
import { colors } from '../styles/theme'

export default function Home() {

  const [user, setUser] = useState(undefined)

  useEffect(() => {
    onAuthStateChanged(user => setUser(user))
  
  }, [])
  


  const handleClick = () => {

    loginWithGithub()
      .then( userData =>{
          setUser( userData )
      })
      .catch (err => {
        console.log( err )
      })

  }  


  return (
    <>
      <Head>
        <title>devter 🐦</title>
        <link rel="icon" href="/devter-logo.png" />
      </Head>

      <AppLayout>
        <section>
          <Logo width="100"/>
          <h1>Devter</h1>
          <h2>Talk about development <br/>with developers</h2>

          <div className='github-login'>

            { user === null &&
              <Button onClick={ handleClick }>
                <GitHub fill='#ffffff' width={24} height={24}/>
                Login with Github
              </Button>
            }
            { user && user.photoURL && (
                <>
                  <Avatar src={ user.photoURL } width={120} height={120} alt={user.displayName}/>
                  <p>{user.displayName}</p>
                </>

            )}

          </div>

        </section>
      </AppLayout>

      <style jsx>{`

        div{
          margin-top: 16px;
        }

        section{
          display: grid;
          place-items: center;
          place-content: center;
          height: 100%;
          
        }

        h1{
          font-weight: 800;
          font-size: 32px;
          color: ${ colors.primary };
          margin-bottom: 16px;
        }

        h2{
          color: ${ colors.secondary };
          font-size: 21px;
          margin: 0;
        }
        P{
          color: ${ colors.black };
          font-size: 15px;
          font-weight: 700;
          paddin
        }


        .github-login{
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-top: 40px
        }
      `}</style>
    </>
  )
}
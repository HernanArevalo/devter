import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import AppLayout from '../components/AppLayout'
import Button from '../components/Button'
import GitHub from '../components/Icons/GitHub'
import { loginWithGithub } from '../firebase/client'
import { colors } from '../styles/theme'

export default function Home() {

  const handleClick = () => {
    loginWithGithub()
      .then(user =>{
        console.log( user )
      })
      .catch(err =>{
        console.error( err )
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
          <Image src='/devter-logo.png' alt='logo' width={120} height={120}/>
          <h1>Devter</h1>
          <h2>Talk about development <br/>with developers</h2>

          <div>
            <Button onClick={ handleClick }>
              <GitHub fill='#ffffff' width={24} height={24}/>
              Login with Github
            </Button>
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
          color: ${ colors.primary };
          margin-bottom: 16px;
        }

        h2{
          color: ${ colors.secondary };
          font-size: 21px;
          margin: 0;
        }


      `}</style>
    </>
  )
}
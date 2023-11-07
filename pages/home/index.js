import { useEffect, useState } from "react"
import Devit from "components/Devit"
import useUser from "../../hooks/useUser"
import { listenLatestDevits } from "../../firebase/client"
import Head from "next/head"
import Navbar from "../../components/Navbar"

export default function HomePage() {
  const [timeline, setTimeline] = useState([])
  const user = useUser()

  useEffect(() => {
    let unsubscribe
    if (user) {
      unsubscribe = listenLatestDevits(setTimeline)
    }
    return () => unsubscribe && unsubscribe()
  }, [user])

  return (
    <>
        <Head>
          <title>Inicio / Devter</title>
        </Head>
        <header>
          <h2>Inicio</h2>
        </header>
        <section>
          {timeline.map(( { avatar, content, createdAt,id, likesCount, userId, userName } ) => (
            <Devit
            key={ id }
            avatar={avatar}
            content={content}
            createdAt={createdAt}
            id={id}
            likesCount={likesCount}
            userId={userId}
            userName={userName}
              
            />
          ))}
        </section>

        <Navbar />
      
      <style jsx>{`
        header {
          align-items: center;
          backdrop-filter: blur(1px);
          background-color: #ffffffdd;
          border-bottom: 1px solid #eee;
          display: flex;
          height: 49px;
          position: sticky;
          top: 0;
          width: 100%;
        }
        section{
          flex: 1;
        }

        h2 {
          font-size: 21px;
          font-weight: 800;
          padding: 0 15px;
        }

      `}</style>
    </>
  )
}
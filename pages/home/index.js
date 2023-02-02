import AppLayout from "components/AppLayout"
import { useEffect, useState } from "react"
import Devit from "components/Devit"
import useUser from "../../hooks/useUser"
import { fetchLatestDevits } from "../../firebase/client"

export default function HomePage() {
  const [timeline, setTimeline] = useState([])
  const user = useUser()


  useEffect(() => {
    user && fetchLatestDevits()
      .then(setTimeline)
    
  }, [user])

  return (
    <>
      <AppLayout>
        <header>
          <h2>Inicio</h2>
        </header>
        <section>
          {timeline?.map(( { avatar, content, createdAt,id, likesCount, userId, userName } ) => (
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
        <nav></nav>
      </AppLayout>
      
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

        h2 {
          font-size: 21px;
          font-weight: 800;
          padding: 0 15px;
        }

        nav {
          background-color: #fff;
          border-top: 1px solid #eee;
          bottom: 0;
          height: 49px;
          position: sticky;
          width: 100%;
        }
      `}</style>
    </>
  )
}
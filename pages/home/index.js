import AppLayout from "components/AppLayout"
import { useEffect, useState } from "react"
import Devit from "components/Devit"
import useUser from "../../hooks/useUser"

export default function HomePage() {
  const [timeline, setTimeline] = useState([])
  const user = useUser()


  useEffect(() => {
    user && fetch("/api/statuses/home_timeline")
      .then((res) => res.json())
      .then(setTimeline)
  }, [user])

  return (
    <>
      <AppLayout>
        <header>
          <h2>Inicio</h2>
        </header>
        <section>
          {timeline.map(({ id, username, avatar, message }) => (
            <Devit
              avatar={avatar}
              id={id}
              key={id}
              message={message}
              username={username}
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
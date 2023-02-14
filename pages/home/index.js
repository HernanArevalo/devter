import { useEffect, useState } from "react"
import Devit from "components/Devit"
import useUser from "../../hooks/useUser"
import { listenLatestDevits } from "../../firebase/client"
import Link from "next/link"
import Create from "../../components/Icons/Create"
import { colors } from "../../styles/theme"
import Home from "../../components/Icons/Home"
import Search from "../../components/Icons/Search"
import Head from "next/head"

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
        <nav>
          <div className="nav-icon">
            <Link href="/home" className=".nav-icon-a">
                <Home width={32} height={32} stroke="#09f"/>
            </Link>

          </div>
          <div className="nav-icon">
            <Link href="/search">
                <Search width={32} height={32} stroke="#09f"/>
            </Link>

          </div>
          <div className="nav-icon">
            <Link href="/compose/tweet">
                <Create width={32} height={32} stroke="#09f"/>
            </Link>
          </div>


        </nav>
      
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

        nav {
          background: #fff;
          bottom: 0;
          border-top: 1px solid #eee;
          display: flex;
          justify-content: space-around;
          align-items: center;
          height: 49px;
          position: sticky;
          width: 100%;
        }
        .nav-icon{
          display: flex;
          align-items: center;
          justify-content: center;
          height: 36px;
          width: 36px;
        }
        .nav-icon-a{
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .nav-icon:hover {
          background: radial-gradient(#0099ff22 15%, transparent 16%);
          background-size: 180px 180px;
          background-position: center;
        }
        .nav-icon:hover > :global(svg) {
          stroke: ${colors.primary};
        }
      `}</style>
    </>
  )
}
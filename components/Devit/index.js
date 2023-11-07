import Avatar from "../../components/Avatar"
import { useRouter } from "next/router"
import useDateTimeFormat from "../../hooks/useDateTimeFormat"
import useTimeAgo from "../../hooks/useTimeAgo"

export default function Devit({ avatar, content, createdAt, id, likesCount, userId, userName }) {

  const timeago = useTimeAgo(createdAt)

 
  const createdAtFormated = useDateTimeFormat(createdAt)
  const router = useRouter()

  const handleArticleClick = (e) => {
    e.preventDefault()
    router.push("/status/[id]",`/status/${id}`)
  }

  return (
    <>
      <article onClick={handleArticleClick}>
        <div>
          <Avatar alt={userName} src={avatar} width='100' height={'100'}/>
        </div>
        <section>
          <strong>{userName}</strong>
          <span> • </span>
          <time title={createdAtFormated}>{timeago}</time>
          <p>{content}</p>
        </section>
      </article>

      <style jsx>{`
        article {
          border-bottom: 1px solid #eee;
          display: flex;
          padding: 10px 15px;
          cursor: pointer;
          transition: .2s background-color ease-in-out;
        }

        article:hover {
          background-color: #f5f8fa;
        }

        div {
          padding-right: 10px;
        }
        p {
          line-height: 1.3125;
          margin: 0;
        }
        time{
          color: #555;
          font-size: 14px;
        }
        .time-ago{
          color: #555;
          font-size: 15px;
        }


      `}</style>
    </>
  )
}
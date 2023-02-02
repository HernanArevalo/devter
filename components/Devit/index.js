import Avatar from "components/Avatar"

export default function Devit({ avatar, content, createdAt, id, likesCount, userId, userName }) {
  return (
    <>
      <article>
        <div>
          <Avatar alt={userName} src={avatar} width='100' height={'100'}/>
        </div>
        <section>
          <strong>{userName}</strong>
          <span> • </span>
          <date>{createdAt}</date>
          <p>{content}</p>
        </section>
      </article>

      <style jsx>{`
        article {
          border-bottom: 1px solid #eee;
          display: flex;
          padding: 10px 15px;
        }

        div {
          padding-right: 10px;
        }
        p {
          line-height: 1.3125;
          margin: 0;
        }
        date{
          color: #555;
          font-size: 14px;
        }
      `}</style>
    </>
  )
}
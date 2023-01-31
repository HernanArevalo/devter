/* eslint-disable import/no-anonymous-default-export */

const timeline = [
    {
      id: "0",
      avatar:
        "https://pbs.twimg.com/profile_images/1608707742570786816/mhV1fpE2_400x400.jpg",
      username: "wongmjane",
      message: `Twitter Web App now runs ES6+ for modern browsers*, reducing the polyfill bundle size by 83%
    
    (gzipped size went from 16.6 KB down to 2.7 KB!!)
    
    * Chrome 79+, Safari 14+, Firefox 68+`,
    },
    {
      id: "1",
      avatar:
        "https://pbs.twimg.com/profile_images/1613612257015128065/oA0Is67J_400x400.jpg",
      username: "midudev",
      message: "Wow, devter está funcionando y vivo 🦉",
      name: "Miguel Ángel Durán",
    },
    {
      id: "2",
      username: "d4nidev",
      name: "Daniel de la Cruz",
      avatar:
        "https://pbs.twimg.com/profile_images/1233284029358759941/Tf5grw1P_400x400.jpg",
      message: `Abro paraguas Paraguas
    
    Clean Code es un libro obsoleto que en 2020, con los paradigmas de desarrollo de software que manejamos, puede hacerte más daño que beneficio.`,
    },
  ]

  export default (req, res) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.send(JSON.stringify(timeline))
  }
import Devit from "../../components/Devit"

export default function DevitPage (props) {

    return (
        <>

            <Devit {...props}/>
            <style jsx>{`
            
            `}</style>
        </>
    )
}

export async function getServerSideProps (context) {

    const { params, res } = context
    const { id } = params



    const apiResponse = await fetch(`http://localhost:3000/api/devits/${id}`)
    if (apiResponse.ok) { 
        const props = await apiResponse.json()
        return {props: props}
    }

    if (res){
        res.writeHead(301, { Location: '/home'}).end()
    }

}

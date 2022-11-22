import axios from "axios"
import { useEffect, useContext } from "react"
import { useParams, useHistory} from "react-router-dom"
import { UserContext } from "./context"



export default function GLogin () {

    const {id} = useParams()
    const history = useHistory()
    const {setUserData} = useContext(UserContext)

    useEffect(() => {

        const getData = async () => {
            const response = await axios.get('/users/glogin/'+ id)

            console.log('response:', response)

            if (response.data.success) {

                // add userdata to context
                setUserData({...response.data.user})
                // redirect to home
                history.push('/home')
            }
        }

        getData()

    }, [])

    return <div>
        Hello from glogin at client with id {id}
    </div>
}
import axios from "axios"
import { useEffect, useContext } from "react"
import { useParams, useNavigate} from "react-router-dom"
import { UserContext } from "../Context/UserContext"



export default function GLogin () {

    const {id} = useParams()
    //const history = useHistory()
    const navigate = useNavigate();
    const {setUserData} = useContext(UserContext)

    useEffect(() => {

        const getData = async () => {
            const response = await axios.get('/user/glogin/'+ id)

            console.log('response:', response)

            if (response.data.success) {

                // add userdata to context
                setUserData({...response.data.user})
                // redirect to home
                //history.push('/home')
                navigate("/home")
            }
        }

        getData()

    }, [])

    return <div>
        Hello from glogin at client with id {id}
    </div>
}
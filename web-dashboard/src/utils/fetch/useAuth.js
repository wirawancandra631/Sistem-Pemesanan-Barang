import { useState } from "react";
import axios from "axios"
import { FeedBackErrorComponent } from "@/components/reusable/FeedBackComponent";
import { useNavigate } from "react-router-dom"
import { BASEURLAUTH } from "./baseUrl";
function useLogin() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const handleLogin = async (form) => {
        try {
            setLoading(true)
            const res = await axios.post(BASEURLAUTH, form);
            const { data } = await res;
            if (data.token) {
                localStorage.setItem("token", data.token);
                navigate("/")
            }
        }
        catch (m) {
            let message = m.message;
            if (m.status == 422 || m.status == 401) {
                message = m.response.data.message
            }
            FeedBackErrorComponent(message)
        }
        finally {
            setLoading(false)
        }
    }
    return {
        loading,
        handleLogin
    }

}
export { useLogin }
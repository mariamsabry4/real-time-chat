import {useState} from "react";
import { useAuthStore } from "../store/useAuthStore";   
const SignUpPage = () => {

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
    });

    const {signup, isSigningUp} = useAuthStore();

    const validateForm = () => {};
    const handleSubmit = async (e)=>{
        e.preventDefault()
    }
    
    return (
        <div>
            
        </div>
    );
}

export default SignUpPage;

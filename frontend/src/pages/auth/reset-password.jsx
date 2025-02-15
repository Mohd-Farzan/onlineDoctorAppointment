import { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
const initialState={
  email:"",
  otp:"",
  newPassword:""
}
const ResetPassword = () => {
    const [formData, setFormData] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const navigate=useNavigate()

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post("http://localhost:3000/api/reset-pswrd", formData);
            alert(response.data.message);
            setTimeout(navigate('/login'),1000)
        } catch (error) {
            alert(error.response?.data?.message || "Error resetting password");
        } finally {
            setLoading(false);
        }
    };

    return (
      <div className="text-center justify-center text-xl font-bold border rounded shadow-lg w-[450px] h-1/2 p-4 mt-4">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center mt-4 justify-between">
            <Input type="email" name="email" placeholder="Email" onChange={handleChange} required />
            <Input type="text" name="otp" placeholder="Enter OTP" onChange={handleChange} required />
            <Input type="password" name="newPassword" placeholder="New Password" onChange={handleChange} required />
            <Button type="submit" className='mt-7 bg-green-800' disabled={loading}>{loading ? "Resetting..." : "Reset Password"}</Button>
        </form>
        </div>
    );
};

export default ResetPassword;

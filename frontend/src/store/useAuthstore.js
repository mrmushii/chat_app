import {create} from "zustand"
import {axiosInstance} from "../lib/axios.js";
import toast from "react-hot-toast";

export const useAuthstore = create((set) =>(
    {
        authUser:null,
        isSigningUp: false,
        isLoginIn: false,
        isCheckingAuth:true,
        isUpdatingProfile: false,

            checkAuth: async () =>{
                try{
                    const res = await axiosInstance.get("/auth/check")

                        set({authUser:res.data})
                }catch(err){
                        console.log("Error getting auth user",err)
                        set({authUser:null})
                }finally {
                        set({isCheckingAuth:false});
                }

            },

            signup: async (data) =>{
                set({ isSigningUp: true });
                try {
                    const res = await axiosInstance.post("/auth/signup", data);
                    set({ authUser: res.data });
                    toast.success("Account created successfully");

                } catch (error) {
                    const errorMessage = error.response?.data?.message || "Failed to create account. Please try again.";
                    toast.error(errorMessage);
                }
                finally {
                    set({ isSigningUp: false });
                }
            }

    }
))
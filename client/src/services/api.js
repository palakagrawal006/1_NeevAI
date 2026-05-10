
import { serverUrl } from './../App';
import axios from "axios"
import {setUserData} from "../redux/userSlice" 

export const getCurrentUser = async(dispatch)=>{
    try {

        const result = await axios.get(`${serverUrl }/api/user/currentUser` , {withCredentials : true})

        // console.log(result.data)
        dispatch(setUserData(result.data))
        
    } catch (error) {
        console.log(error)
    }
}


export const generateNotes = async (payload)=>{
    try {
        const result = await axios.post(`${serverUrl }/api/notes/generate-notes` , payload , {withCredentials : true})
        // console.log(result.data)
        return result.data

    } catch (error) {
        console.log(error)
    }
}

export const downloadPdf = async (result)=>{
    try {
        const response = await axios.post(`${serverUrl }/api/pdf/generate-pdf` , {result} , 
        {responseType:"blob" ,   withCredentials : true})

        const blob = new Blob([response.data],{
            type:"application/pdf"
        })

        const url = URL.createObjectURL(blob);
        const a = document.createElement("a"); //link created
        a.href = url;
        a.download = "NeevAI.pdf";
        a.click();

        window.URL.revokeObjectURL(url); //  cleans up memory

    } catch (error) {
        throw new Error("PDF download failed")
    }
}
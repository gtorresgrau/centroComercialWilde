import axios from "axios";

export const getNewsletter = async() => {
    const res = await axios.get('/api/newsletter/newsletters')
    console.log(res.data) 
    return res.data
}
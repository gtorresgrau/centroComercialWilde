import axios from "axios";

const getNewsletter = async() => {
    const res = await axios.get('/api/newsletter/newsletters')
    console.log(res.data) 
    return res.data
}

export default getNewsletter
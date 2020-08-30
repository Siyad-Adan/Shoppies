import axios from 'axios';

const url = 'http://www.omdbapi.com/?apikey=53ef2fa&'

export const fetchData = async (title) => {
    let changeableUrl = url;

    if(title){
        changeableUrl = `${url}s=${title}`
    }

    try{
        const { data: {Search} }= await axios.get(changeableUrl);
        return Search;
    }
    catch(error){
        console.log(error);
    }
}
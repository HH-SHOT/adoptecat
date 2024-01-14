import axios from "axios";
import {Cat } from "../models/Cat";

const apiURL = process.env.REACT_APP_API_URL + "cats";

export const getCats = async (searchTerm?:string) : Promise<Cat[]> => {
    let response;
    if(searchTerm){
        response = await axios.get(`${apiURL}?q=${searchTerm}`);
    }
    else{
        response = await axios.get(apiURL);
    }

    return response.data as Cat[];
} 

export const getCatById = async (id:number) : Promise<Cat> => {
    const response = await axios.get(`${apiURL}/${id}`);

    return response.data as Cat;
}
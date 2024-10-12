import axios from 'axios';

export const fetchPhotos = (page = 1, limit = 39) => {
  return axios
    .get(`https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=${limit}`)
    .then((response) => {
        console.log(response);
        
      return response.data;  
    })
    .catch((error) => {
      console.error("Failed to fetch photos:", error);  
      return [];  
    });
};

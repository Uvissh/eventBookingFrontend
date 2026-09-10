
import axios from "axios";

const api = axios.create({
    baseURL:"https://eventbookingbackend-dhdr.onrender.com/api",
    withCredentials:true
})
//request interceptor
api.interceptors.request.use(
    (config)=>{
    const accessToken = localStorage.getItem("token");
    if(accessToken){
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
    },

   (error)=>{
    return Promise.reject(error);
   } 
);

//response interceptord
api.interceptors.response.use(
    (response)=>{
        return response;
    },
    //if response contain an error
    async(error)=>{
        const originalRequest = error.config;
        if(error.response && error.response.status === 401 && !originalRequest._retry){
            originalRequest._retry= true;
            try{
               // Browser automatically sends the
                // HttpOnly refreshToken cookie
               
                //ask backend to give the newAccessToken
                const response = await api.post("/auth/refresh",{
                    
                }
            );

            const newAccessToken = response.data.token;
            localStorage.setItem("token",newAccessToken);
            //put new token into original request
            originalRequest.headers.Authorization= `Bearer ${newAccessToken}`;
             return api(originalRequest)
            }catch(refreshError){
                //refrehtoken is invalide/expired
                localStorage.removeItem("token");
                localStorage.removeItem("refreshToken");
                window.location.href = "/login";
                return Promise.reject(refreshError)

            }
            
        }
        return Promise.reject(error);
        
    }
);
export default api;

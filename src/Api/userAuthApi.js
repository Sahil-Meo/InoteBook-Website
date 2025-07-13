import axios from "axios"

const url = 'http://localhost:4000'
const createUser = async () => {
     const res = axios.get(`${url}/api/auth/createuser`,

     )
}


export const fetchUser = async (data) => {
     const res = await axios.post(`${url}/api/auth/fecthuser`, data, {
          headers: {
               'Content-Type': 'application/json',
               'auth_token': `${sessionStorage.getItem('token')}`
          }
     })
     const userData = res
     return userData;
}

export const loginUser = async (data) => {
     const res = await axios.post(`${url}/api/auth/login`, data, {
          headers: {
               'Content-Type': 'application/json'
          }
     })
     const userData = res
     return userData;
}


export const createUserWithFetch = async (data) => {
     try {
          const res = await fetch(`${url}/api/auth/createuser`,
               {
                    method: 'POST',
                    headers: {
                         'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
               }
          )
          const userData = await res.json();
          return userData;
     } catch (error) {
          console.log("Errro while sending request", error);
     }
}

export const loginUserWithFetch = async (data) => {
     try {
          const res = await fetch(`${url}/api/auth/login`,
               {
                    method: 'POST',
                    headers: {
                         'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
               }
          )
          const userData = await res.json();
          return userData;
     } catch (error) {
          console.log(error);
     }
}
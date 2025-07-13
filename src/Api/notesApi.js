import axios from "axios";

const url = 'http://localhost:4000';

export const fetchAllNotes = async () => {
  const newtoken = sessionStorage.getItem('token');
  const res = await axios.get(`${url}/api/notes/fetchallnotes`, {
    headers: {
      'Content-Type': 'application/json',
      'auth_token': `${newtoken}`
    }
  })
  return res;
}

export const addNewNote = async (data) => {
  const newtoken = sessionStorage.getItem('token');
  const res = await axios.post(`${url}/api/notes/createnotes`, data, {
    headers: {
      'Content-Type': 'application/json',
      'auth_token': `${newtoken}`
    }
  })
  return res;
}

export const updateNote = async (id, data) => {
  const newtoken = sessionStorage.getItem('token');
  const res = await axios.put(`${url}/api/notes/updatenote/${id}`, data, {
    headers: {
      'Content-Type': 'application/json',
      'auth_token': `${newtoken}`
    }
  })
  return res;
}

export const deleteNote = async (id) => {
  const newtoken = sessionStorage.getItem('token');
  const res = await axios.delete(`${url}/api/notes/deletenote/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      'auth_token': `${newtoken}`
    }
  })
  return res;
}









const randomfunc = (data) => {
  axios.post(url, data, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`  // or 'Token <token>' based on your backend
    }
  })
    .then(response => {
      console.log('Success:', response.data);
    })
    .catch(error => {
      console.error('Error:', error.response?.data || error.message);
    });
}

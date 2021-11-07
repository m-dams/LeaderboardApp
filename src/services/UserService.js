import axios from 'axios'

const apiClient = axios.create({
    baseURL: 'http://localhost:8000',
    // withCredentials: false,
    // headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json'
    // }
})

// axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token') ;

export default {
    getUsers() {
        return apiClient.get('/data/player')
    },
    getUserId(id) {
        return apiClient.get('/data/player/' +id)
    },
    getUserNickname(nickname){
        return apiClient.get('/data/player/'+ nickname)
    },
    postLogin(email, password) {
        return apiClient.post('/auth/login', {
            email,
            password,
          })
    },
    postRegister( nickname, email, password){
        return apiClient.post('/auth/register', {
            nickname, 
            email, 
            password
        }) 
    },
    getToken() {
        return apiClient.get('token');
    },
    getRefreshToken() {
        return apiClient.get('refreshToken')
    }

}
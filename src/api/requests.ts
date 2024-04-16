import axios from "axios"

const API = 'http://localhost:3000/notes'

// export const getNotes = axios({url: `${API}`, method: 'get'})

export const NotesService = {
    async getNotes() {
        return await axios.get(API);
    }
}
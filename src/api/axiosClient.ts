import axios from 'axios'

const tmdbClient = axios.create({
  baseURL: import.meta.env.VITE_TMDB_BASE_URL as string,
  params: {
    api_key: import.meta.env.VITE_TMDB_API_KEY as string,
    language: 'en-US',
  },
})

export default tmdbClient

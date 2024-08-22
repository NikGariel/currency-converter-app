import axios from 'axios'

const API_KEY = 'fca_live_0vS4s30TOKpmN1onnowl2TAaQwyB99jnnX3ReuwT'
const BASE_URL = 'https://api.freecurrencyapi.com/v1/latest'

const currencyApi = axios.create({
  baseURL: BASE_URL,
  params: {
    apikey: API_KEY
  }
})

export const getRates = async () => {
  const response = await currencyApi.get()
  return response.data.data
}

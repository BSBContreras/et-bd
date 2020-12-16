import axios from 'axios'

export const url = 'http://ep-banco-de-dados.herokuapp.com'

export const api = axios.create({
  baseURL: url,
  headers: {
    "Access-Control-Allow-Origin": "*"
  }
})
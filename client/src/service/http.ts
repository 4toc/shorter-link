import axios from "axios"

const api = "http://localhost:5000/"

class HttpService {
  public static get(url: string) {
    const xhr = axios({
      method: "GET",
      url: `${api}/${url}`,
    }).then((res) => res.data)
    return xhr
  }
}

export default HttpService

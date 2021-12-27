import axios from 'axios'

const url = 'https://api.coincap.io/v2/assets/bitcoin'

export default{
    getData: async() =>
    await axios.get(url)
    .then(res => console.log(res.data))
}
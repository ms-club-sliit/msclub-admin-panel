const requestConfig = {
  headers: {
    Authorization: localStorage.getItem('token') || '',
  }
}

export default requestConfig;
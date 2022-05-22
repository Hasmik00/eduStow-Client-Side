import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import useLocalStorage from "./useLocalStorage";

const useFetch = (url) => {
  const urlApi = process.env.REACT_APP_SERVER_URL;
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState({});
  const [token] = useLocalStorage("token");
console.log('req',urlApi)
  const doFetch = useCallback((options) => {
    setOptions(options);
    setIsLoading(true);
  }, []);
  useEffect(() => {
    const requestOptions = {
      ...options,
      isLoading: true,
      ...{
        headers: {
          authorization: token ? `Token ${token}` : "",
        },
      },
    };
    if (!isLoading) {
      return;
    }

    axios(urlApi + url, requestOptions)
      .then((res) => {
        setResponse(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.response.data);
        setIsLoading(false);
      });
  }, [isLoading, options, token, url, urlApi]);

  return [{ response, error, isLoading, url, token }, doFetch];
};
export default useFetch;
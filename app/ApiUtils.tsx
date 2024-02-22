import {useCallback, useEffect, useState} from 'react';

export const useFetch = props => {
  const {url} = props;

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = useCallback(() => {
    setLoading(true);
    fetch(url, {
      method: 'GET',
    })
      .then(response => {
        return response.json();
      })
      .then(json => {
        setData(json);
        setError(null);
      })
      .catch(err => {
        setError(err);
        setData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [url, fetchData]);

  return [loading, data, error, fetchData];
};

import {useState, useCallback} from "react";

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //чтобы не возникла бесконечная рекурсия оборачиваем асинхронный callback в useCallback hook
  const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
    setLoading(true);
    try {

      if(body) {
       body = JSON.stringify(body);
       headers['Content-Type'] = 'application/json';
      }

      const response = await fetch(url, {method, body, headers});
      const data = await response.json();

      if(!response.ok) {
        throw new Error(data.message || 'Что-то пошло не так');
      }

      setLoading(false);
      return data;
    } catch (e) {
      setLoading(false);
      setError(e.message);
      throw e; //для того чтобы обрабатывать в компонентах выкидываем ошибку
    }
  }, []);

  //оборачиваем в useCallback... Однако и без useCallback все работает у меня.
  const clearError = useCallback(() => setError(null), []);
  return {loading, request, error, clearError}
}


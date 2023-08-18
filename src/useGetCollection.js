import { useState, useEffect } from "react"; // Add this import statement
import axios from "axios";

export default function useGetCollection(url) {
  const [loading, setIsLoading] = useState(true);
  const [fetchedData, setFetchedData] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const { data } = await axios.get(url);
        console.log(data);
        setFetchedData(data);
      } catch (error) {
        alert(error);
      }
      setIsLoading(false);
    }
    getData();
  }, [url]);

  async function refetch() {
    setIsLoading(true);
    try {
      const { data } = await axios.get(url);
      setFetchedData(data);
    } catch (error) {
      alert(error);
    }
    setIsLoading(false);
  }

  return {
    loading,
    data: fetchedData,
    refetch,
  };
}

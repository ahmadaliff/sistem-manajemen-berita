import { useEffect, useState } from "react";

import SearchBar from "./components/SearchBar";
import NewsCard from "./components/NewsCard";
import AddCard from "./components/AddCard";

import { getNews, searchNews } from "./api";
import ErrorSection from "./components/ErrorSection";

export default function Home() {
  const [news, setNews] = useState([]);
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isShowAdd, setIsShowAdd] = useState(false);

  const fetchNews = async () => {
    try {
      setError("");
      const newsData = await getNews({ page: 1, limit: 10 });
      setNews(newsData.data.data || []);
    } catch (error) {
      console.log("Client: Error ", error.message);
      setError("Gagal Memuat Data Berita");
    }
  };

  const handleSearch = async (query) => {
    setQuery(query);
  };

  const handleSuccessSubmit = async () => {
    await fetchNews();
    setTimeout(() => {
      setIsShowAdd((prev) => !prev);
    }, 1500);
  };

  useEffect(() => {
    const loadNews = async () => {
      await fetchNews();
    };
    loadNews();
  }, []);

  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        if (query.length < 3) {
          setMessage(!query ? "" : "Masukkan minimal 3 karakter");
          return fetchNews();
        }
        setError("");
        const res = await searchNews(query);
        setNews(res.data || []);
      } catch (error) {
        console.log("Client: Error ", error.message);
        setError("Gagal Mencari Data Berita");
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Sistem Manajemen Berita</h1>
      {error ? (
        <ErrorSection error={error} />
      ) : (
        <>
          <div className="flex gap-2 justify-start">
            <SearchBar handleSearch={handleSearch} message={message} />
            <button
              onClick={() => setIsShowAdd((prev) => !prev)}
              className="rounded-full font-bold text-lg bg-green-400 w-[2.75rem] h-[2.75rem] text-white hover:bg-green-600 "
            >
              +
            </button>
          </div>
          {isShowAdd && <AddCard onSuccess={handleSuccessSubmit} />}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {news.map((item) => (
              <NewsCard key={item.id} news={item} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

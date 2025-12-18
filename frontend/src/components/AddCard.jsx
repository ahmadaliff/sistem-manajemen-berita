import { useState } from "react";

import { postNews } from "../api";

const AddCard = ({ onSuccess }) => {
  const [form, setForm] = useState({
    title: "",
    content: "",
    author: "",
    source: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await postNews(form);
      setMessage("Berita berhasil ditambahkan");
      setForm({
        title: "",
        content: "",
        author: "",
        source: "",
      });
      onSuccess();
    } catch (error) {
      console.log("Client: Error ", error.message);
      setMessage(
        `Gagal menambahkan berita dengan message: ${error.response.data.message}`
      );
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(""), 1500);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow my-5"
    >
      <h2 className="text-lg font-semibold mb-4">Tambah Berita</h2>
      {message ? (
        <p className="my-3 text-sm text-gray-500 font-semibold">{message}</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="title"
              placeholder="Judul"
              value={form.title}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
            <input
              name="author"
              placeholder="Author"
              value={form.author}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
            <input
              name="source"
              placeholder="Source"
              value={form.source}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
          </div>

          <textarea
            name="content"
            placeholder="Konten berita"
            value={form.content}
            onChange={handleChange}
            className="border p-2 rounded w-full mt-4"
            rows={4}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="rounded-full bg-green-400 px-5 py-2 my-2 text-white hover:bg-green-600"
          >
            {loading ? "Menyimpan..." : "Simpan Berita"}
          </button>
        </>
      )}
    </form>
  );
};

export default AddCard;

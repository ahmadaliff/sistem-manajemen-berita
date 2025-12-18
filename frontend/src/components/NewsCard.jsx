const NewsCard = ({ news }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="font-semibold text-lg">{news.title}</h3>
      <p className="text-sm text-gray-500">
        {news.author} - {news.source}
      </p>
      <p className="text-xs text-gray-500">
        {news.created_at ? new Date(news.created_at).toLocaleString() : ""}
      </p>
      <p className="text-sm text-gray-700">{news.content}</p>
    </div>
  );
};
export default NewsCard;

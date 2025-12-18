const ErrorSection = ({ error }) => {
  return (
    <div className="w-full flex items-center justify-center shadow-lg py-40 rounded-md">
      <p className="text-red-400 font-bold text-lg italic">
        Terjadi kesalahan : {error}
      </p>
    </div>
  );
};

export default ErrorSection;

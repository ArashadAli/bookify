const HeroBanner = () => {
  return (
    <div className="bg-orange-100 rounded-xl p-6 flex justify-between items-center mb-6 shadow-md">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">
          A Book is a gift you can open again and again!
        </h2>
        <div className="mt-4 flex gap-3">
          <button className="bg-orange-600 text-white px-4 py-2 rounded-lg shadow hover:bg-orange-700">
            Discover More
          </button>
          <button className="bg-white text-orange-600 px-4 py-2 rounded-lg shadow hover:bg-gray-100">
            Open Free Stack
          </button>
        </div>
      </div>
      <img
        src="https://cdn-icons-png.flaticon.com/512/29/29302.png"
        alt="Books"
        className="w-32"
      />
    </div>
  );
};

export default HeroBanner;

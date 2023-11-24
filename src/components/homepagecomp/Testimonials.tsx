function Testimonials() {
  return (
    <div className="flex items-center justify-center my-7 flex-col">
      <div className="text-center space-y-6 py-6">
        <h1 className="text-4xl font-bold">Testimonials</h1>
        <p className="max-w-md">
          Agriplot's Due Diligence System simplifies agricultural compliance,
          making it effortless for your business.
        </p>
      </div>
      <div className="relative flex scale-90 lg:scale-100">
        <button>
          <img
            className="lg:scale-[1.5] mr-10 absolute lg:static top-[100%] "
            src="prevTestimony.svg"
            alt=""
          />
        </button>
        <div className="border border-gray-300 border-1 flex flex-1 flex-col lg:flex-row p-0 lg:p-7 max-w-xl lg:max-w-3xl rounded-lg">
          <img
            src="testimonyphoto.png"
            alt=""
            className="scale-75 lg:scale-100"
          />
          <div className="px-7 py-3 space-y-3 lg:space-y-6">
            <p className="min-w-[180px]">
              Agriplot's Due Diligence System has been a game-changer for our
              agricultural business. It's made compliance with regulations a
              breeze, saving us time and ensuring we stay on the right side of
              the law. We can't imagine managing our operations without it."
            </p>
            <h1 className="font-bold">- John D., Farm Manager</h1>
          </div>
        </div>
        <button>
          <img
            className="lg:scale-[1.5] absolute top-[100%] ml-10 right-0 lg:static"
            src="nextTestimony.svg"
            alt=""
          />
        </button>
      </div>
      <div className="space-x-3">
        <button className="bg-gray-600 rounded-full w-3 h-3 mt-5 inline"></button>
        <button className="bg-gray-400 rounded-full w-3 h-3 mt-5 inline"></button>
        <button className="bg-gray-400 rounded-full w-3 h-3 mt-5"></button>
        <button className="bg-gray-400 rounded-full w-3 h-3 mt-5"></button>
      </div>
    </div>
  );
}
export default Testimonials;

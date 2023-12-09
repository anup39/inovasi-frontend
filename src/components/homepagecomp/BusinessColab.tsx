function BusinessColab({ logos }) {
  return (
    <div className="flex items-center flex-col justify-center py-5 px-4 md:px-0 md:py-16 lg:py-28 gap-4">
      <h1
        className="font-bold text-xl md:text-2xl lg:text-4xl text-center
      "
      >
        Businesses Colaborating with Us
      </h1>
      <p className="text-subTextHome text-center ">
        Listen to what our satisfied partners are saying
      </p>
      <div className=" flex flex-col md:flex-row items-center overflow-hidden w-full min-w-full py-5 md:py-32">
        {logos.map((logo) => (
          <div className="md:border-x flex flex-col items-center justify-center w-1/6 h-16 md:h-32 lg:h-48 border-x-collabBorder">
            <img
              className="w-18 cursor-pointer md:w-3/5 px-1 md:px-10"
              src={logo}
              alt=""
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default BusinessColab;

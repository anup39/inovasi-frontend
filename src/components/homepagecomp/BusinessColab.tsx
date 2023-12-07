function BusinessColab({ logos }) {
  return (
    <div className="flex items-center flex-col justify-center py-28 gap-4">
      <h1
        className="font-bold text-4xl
      "
      >
        Businesses Colaborating with Us
      </h1>
      <p className="text-subTextHome">
        Listen to what our satisfied partners are saying
      </p>
      <div className=" flex  overflow-hidden w-full min-w-full py-32">
        {logos.map((logo) => (
          <div className="border-x flex items-center justify-center w-1/6 h-16 md:h-32 lg:h-48 border-x-collabBorder">
            <img className="px-10" src={logo} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default BusinessColab;

function DdsSection() {
  return (
    <div className=" bg-gradient-to-r from-footerHeading to-parrot px-28 py-56  flex flex-col lg:flex-row gap-20  lg:gap-72 justify-center items-center">
      <div className="flex flex-col gap-10 text-white max-w-md">
        <h1 className="font-bold text-xl">
          EUDR Agriplot Due-Diligence System
        </h1>
        <p className="font-mono">
          As the European Union's Deforestation Regulation (EUDR) takes effect,
          businessesoperating within Europe need robust solutions to ensure
          compliance. The Agriplot Due Diligence system, brought to you by
          MosaiX, is tailored to meet the demands of operators dealing with
          commodities covered under the EUDR.
        </p>
      </div>
      <div className="">
        <img className="scale-75 lg:scale-100" src="playButton.svg" alt="" />
      </div>
    </div>
    // old code, just leaving it here if sometimes later needed, will delete when final design is done
    // <div className="space-y-7 pt-5 lg:pt-20 pb-6 px-9 flex items-center flex-col">
    //   <h1 className="text-center font-bold text-3xl max-w-xl lg:text-left">
    //     Agriplot Due Dilligence System (DDS) Platform: How to use for reporting
    //   </h1>
    //   <p className="max-w-md text-center lg:text-left">
    //     Agriplot's Due Diligence System simplifies agricultural compliance,
    //     making it effortless for your business.
    //   </p>

    //   {/* <div className=" w-5/6 mx-auto ml-50"> */}
    //   {/* <div className="relative bg-black aspect-video h-auto w-full "> */}
    //   {/* <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2"> */}
    //   <iframe
    //     width="560"
    //     height="315"
    //     src="https://www.youtube.com/embed/CslE7W1X4io"
    //   ></iframe>
    //   {/* </div> */}
    //   {/* </div> */}
    //   {/* </div> */}
    // </div>
  );
}
export default DdsSection;

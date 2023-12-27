function DdsSection() {
  return (
    <div className=" bg-gradient-to-r from-footerHeading to-parrot px-5 md:px-10 lg:px-28 py-5 md:py-16 lg:py-56  flex flex-col lg:flex-row gap-20  lg:gap-72 justify-center items-center xl:h-[900px] xl:p-0">
      <div className="flex flex-col gap-10 text-white max-w-md xl:ml-[201px]">
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
  );
}
export default DdsSection;

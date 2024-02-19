function DdsSection() {
  return (
    <div className="relative bg-gradient-to-r from-footerHeading to-parrot px-5 md:px-10 lg:px-28 py-5 md:py-16 lg:py-56  flex flex-col lg:flex-row gap-20 xl:gap-[330px] lg:gap-72 justify-around items-center xl:justify-between xl:h-[900px] xl:p-0">
      <div className="flex flex-col gap-10 text-white max-w-md xl:ml-[201px]">
        <h1 className="font-bold text-xl middle:text-[40px] middle:leading-[48.76px] xl:w-[800px]">
          EUDR Agriplot Due-Diligence System
        </h1>
        <p className=" font-[400] middle:text-[24px] middle:leading-[29.26px] xl:h-[145px] xl:w-[780px] middle:text-justify">
          As the European Union's Deforestation Regulation (EUDR) takes effect,
          businessesoperating within Europe need robust solutions to ensure
          compliance. The Agriplot Due Diligence system, brought to you by
          MosaiX, is tailored to meet the demands of operators dealing with
          commodities covered under the EUDR.
        </p>
      </div>
      <div className="xl:absolute left-[1335px]">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/szEdXHM4Vb8"
          title="Inovasi Agriplot Due-Diligence System"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}
export default DdsSection;

const data = [
  {
    id: 1,
    title: "Mapping Suppliers",
    body: "Agriplot long-term datasets provide comprehensive supplyshed supplier mapping from smallholder plots to the corporate estate area, align with the legal boundary from recognize national land registration system to ensure the EUDR requirements.",
    image: "mappingsupplierhome.png",
  },
  {
    id: 2,
    title: "Supplier Monitoring",
    body: "Since 2014 our supplier group monitoring already provide valueble data intellgence on the deforestation monitoring with high accuracy and actionable data and continue to make sure the support for the EUDR implementation",
    image: "suppliermonitoringhome.png",
  },
  {
    id: 3,
    title: "Risk Assessment",
    body: "Our risk assessment methods represent the current situations on the ground with support from the update data on plot level to the national levels to align with the EUDR requirements",
    image: "riskassesmenthome.png",
  },
  {
    id: 4,
    title: "Risk Mitigation",
    body: "Be part of the solution to involved on our priority program to support fair industry transformation and comply with the regulation by supporting the smallholder inclusion program, recovery support, supplier traceability and monitoring",
    image: "riskmitigationhome.png ",
  },
];

function HomeFeatures() {
  return (
    <div className="py-32 px-14 xl:py-0 xl:px-0 xl:h-[965px]">
      <div className="text-center space-y-4 xl:space-y-[18px] xl:pt-[131px]">
        <h1 className="font-bold xl:text-[40px] xl:leading-[48.76px]">
          Our Solution for Your Business
        </h1>
        <p className="text-subTextHome xl:text-[20px] xl:leading-[24.38px]">
          We make it easy for users to use our platform, that's why we provide
          this benefit
        </p>
      </div>
      <div className="flex flex-col lg:flex-row  gap-6 justify-center py-10 px-4 xl:w-[1582.82px] xl:mx-auto xl:gap-[40px]">
        {data.map((item) => (
          <div
            className="flex border hover:shadow-lg border-featuresBorder cursor-pointer flex-col items-start  justify-between gap-5 bg-white p-10 rounded-xl xl:w-[365.7px] xl:rounded-[15px] xl:h-[455.81px] xl:p-[42px] "
            key={item.title}
          >
            <img
              className="h-10 xl:w-[73px] xl:h-[69px] w-10"
              src={item.image}
              alt=""
            />
            <h1 className="font-semibold ">{item.title}</h1>
            <p className="max-w-xs md:max-w-xl xl:w-[281px] xl:h-[189px] xl:text-justify text-subTextHome">
              {item.body}
            </p>
            <a className="underline text-footerHeading font-semibold" href="#">
              Learn more
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
export default HomeFeatures;

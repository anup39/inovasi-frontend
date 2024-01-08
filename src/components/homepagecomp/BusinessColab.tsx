import Marquee from "react-fast-marquee";

const logos = [
  { name: "aak.png", url: "https://www.aak.com/" },
  { name: "apical.png", url: "https://www.apicalgroup.com/" },
  { name: "bumitama.png", url: "https://bumitama-agri.com/" },
  { name: "bunge.png", url: "https://www.bunge.com/" },
  { name: "fujioil.png", url: "https://www.fujioil.co.jp/en/index.html" },
  { name: "Jiangsu.png", url: "http://en.hsintai.cn/" },
  { name: "klk.png", url: "https://www.klkoleo.com/" },
  { name: "aep.png", url: "https://www.angloeastern.co.uk/" },
  { name: "barry.png", url: "https://www.barry-callebaut.com/" },
  { name: "ldc.png", url: "https://www.ldc.com/" },
  { name: "kpn.png", url: "https://kpnplantation.com/" },
  { name: "mars.png", url: "https://www.mars.com/" },
  { name: "musim.png", url: "https://www.musimmas.com/" },
  { name: "neste.png", url: "https://www.neste.com/" },
  { name: "p&g.png", url: "https://id.pg.com/" },
  { name: "sime.png", url: "https://www.simedarby.com/" },
  { name: "unilever.png", url: "https://www.unilever.com/" },
  { name: "sipef.png", url: "https://www.sipef.com/" },
  { name: "adm.png", url: "https://www.adm.com/" },
  { name: "wilmar.png", url: "https://www.wilmar-international.com/" },
];

function BusinessColab() {
  return (
    <div className="max-h-[449px]">
      <div className="space-y-[10px] lg:space-y-[16px]">
        <h1
          className="font-bold leading-[48.76px] text-xl md:text-2xl lg:text-4xl text-center
      "
        >
          Businesses Colaborating with Us
        </h1>
        <p className="text-subTextHome text-[20px] leading-[24px] text-center ">
          Listen to what our satisfied partners are saying
        </p>{" "}
      </div>
      <Marquee speed={50} pauseOnHover={true}>
        <div className=" flex flex-row items-center overflow-hidden w-full min-w-full py-10 md:py-32">
          {logos.map((logo, index) => (
            <a
              target="_blank"
              href={logo.url}
              key={index}
              className="md:border-x flex flex-col items-center justify-center w-[120px] md:w-[200px] lg:w-[275px] h-16 md:h-32 lg:h-[179px] border-x-collabBorder"
            >
              <img
                className="w-[60px] md:scale-100 lg:scale-[1.3]  md:w-3/5 px-1 md:px-10"
                src={logo.name}
                alt=""
              />
            </a>
          ))}
        </div>
      </Marquee>
    </div>
  );
}

export default BusinessColab;

import { useState } from "react";

function FAQ() {
  const [activeAccordion, setActiveAccordion] = useState(null);

  // @ts-ignore
  const toggleAccordion = (index) => {
    if (activeAccordion === index) {
      setActiveAccordion(null);
    } else {
      setActiveAccordion(index);
    }
  };

  const accordionCount = [1, 2, 3, 4];

  return (
    <div className="w-full h-full">
      <h1 className="font-bold text-xl md:text-2xl lg:text-4xl text-center">
        Frequently Asked Questions
      </h1>
      <div className="pt-[70px] md:pt-[100px] lg:pt-[119px] flex flex-col gap-8">
        {accordionCount.map((index) => (
          <div key={index} className="">
            <div
              className={`flex px-4 justify-between items-center transition-all leading-[24.38px] ${
                activeAccordion === index
                  ? "bg-gradient-to-r from-footerHeading to-parrot rounded-t-[10px] text-white"
                  : "bg-faqBg bg-opacity-80 rounded-[10px]"
              } text-[15px] md:text-[18px] lg:text-[20px] h-[80px]`}
            >
              <p className="font-semibold my-auto">
                Lorem Ipsum is simply dummy
              </p>
              <svg
                onClick={() => toggleAccordion(index)}
                className={`cursor-pointer transition-all scale-50 md:scale-75 lg:scale-100 ${
                  activeAccordion === index ? "rotate-180" : ""
                }`}
                width="30px"
                height="30px"
                viewBox="0 0 10 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.47206 0.52827C1.21171 0.26792 0.789596 0.26792 0.529247 0.52827C0.268897 0.788619 0.268897 1.21073 0.529247 1.47108L4.52925 5.47108C4.7896 5.73143 5.21171 5.73143 5.47205 5.47108L9.47205 1.47108C9.7324 1.21073 9.7324 0.788619 9.47205 0.52827C9.21171 0.26792 8.7896 0.26792 8.52925 0.52827L5.00065 4.05687L1.47206 0.52827Z"
                  fill={`${activeAccordion === index ? "#FAFAFA" : "#1F1F1F"}`}
                />
              </svg>
            </div>
            {/* FAQ content opens up */}
            <div
              className={`min-h-[170px] ${
                activeAccordion === index ? "flex" : "hidden"
              } items-center justify-center px-4 font-normal text-[12px] md:text-[18px] text-blackest leading-[30px] bg-white rounded-b-[10px]`}
            >
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged.
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQ;

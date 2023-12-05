function Footer() {
  return (
    <div className="flex flex-col bg-footerBg py-10 gap-10 px-52 text-white">
      <div className="flex justify-between">
        <div className="flex flex-col items-start gap-4 max-w-xs">
          <img src="inovasilogo.svg" alt="" />
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
        </div>
        <div className="flex flex-col items-start gap-7 max-w-xs">
          <div>
            <p className="text-footerHeading font-semibold">Company</p>
          </div>
          <div className="flex flex-col gap-4">
            <p>About Us</p>
            <p>Features</p>
            <p>Pricing</p>
            <p>Book Demo</p>
          </div>
        </div>
        <div className="flex flex-col items-start gap-4 max-w-xs">
          <div>
            <p className="text-footerHeading font-semibold">Connect</p>
          </div>
          <div className="flex flex-col gap-4">
            <p>LinkedIn</p>
            <p>YouTube</p>
          </div>
        </div>
        <div className="flex flex-col items-start gap-4 max-w-xs">
          <div>
            <p className="text-footerHeading font-semibold">Contact</p>
          </div>
          <div className="flex flex-col gap-4">
            <p>+312345678</p>
            <p>info@mosaix.earth</p>
            <p>Amsterdam, Netherland</p>
          </div>
        </div>
      </div>

      <div className="bg-footerLine h-0.5"></div>
      <div className="flex justify-between">
        <h1 className="font-semibold">© Inovasi Agriplot, 2023 </h1>
        <div className="flex gap-5">
          <p>Terms of Service</p>
          <p>Privacy Policy</p>
        </div>
      </div>
    </div>
  );
}
export default Footer;

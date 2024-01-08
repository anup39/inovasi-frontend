import Avaibility from "../components/homepagecomp/Avaibility";
import BusinessColab from "../components/homepagecomp/BusinessColab";
import DdsSection from "../components/homepagecomp/DdsSection";
import Footer from "../components/homepagecomp/Footer";
import HomeFeatures from "../components/homepagecomp/HomeFeatures";
import HomeHero from "../components/homepagecomp/HomeHero";
// import HomeNavbar from "../components/homepagecomp/HomeNavbar";
import Testimonials from "../components/homepagecomp/Testimonials";

function HomePage() {
  return (
    <div className="bg-bgPage ">
      <HomeHero />
      <HomeFeatures />
      <DdsSection />
      <Testimonials />
      <BusinessColab />

      <Avaibility />

      {/* new test  */}
      {/* <EUDRTable /> */}
      <Footer />
    </div>
  );
}
export default HomePage;

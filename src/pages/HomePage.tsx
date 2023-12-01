import Avaibility from "../components/homepagecomp/Avaibility";
import DdsSection from "../components/homepagecomp/DdsSection";
import EUDRTable from "../components/homepagecomp/EUDRTable";
import Footer from "../components/homepagecomp/Footer";
import HomeFeatures from "../components/homepagecomp/HomeFeatures";
import HomeHero from "../components/homepagecomp/HomeHero";
// import HomeNavbar from "../components/homepagecomp/HomeNavbar";
import Testimonials from "../components/homepagecomp/Testimonials";

function HomePage() {
  return (
    <div className="bg-gray-50">
      <HomeHero />
      <HomeFeatures />
      <DdsSection />
      <Testimonials />
      <Avaibility />
      <EUDRTable />
      <Footer />
    </div>
  );
}
export default HomePage;

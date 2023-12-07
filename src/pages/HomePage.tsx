import Avaibility from "../components/homepagecomp/Avaibility";
import BusinessColab from "../components/homepagecomp/BusinessColab";
import DdsSection from "../components/homepagecomp/DdsSection";
import EUDRTable from "../components/homepagecomp/EUDRTable";
import Footer from "../components/homepagecomp/Footer";
import HomeFeatures from "../components/homepagecomp/HomeFeatures";
import HomeHero from "../components/homepagecomp/HomeHero";
// import HomeNavbar from "../components/homepagecomp/HomeNavbar";
import Testimonials from "../components/homepagecomp/Testimonials";

const logos = [
  "fujilogo.png",
  "nestelogo.png",
  "p&glogo.png",
  "aaklogo.png",
  "wilmarlogo.png",
  "unvlogo.png",
];

function HomePage() {
  return (
    <div className="bg-gray-50 max-w-screen">
      <HomeHero />
      <HomeFeatures />
      <DdsSection />
      <Testimonials />
      <BusinessColab logos={logos} />

      <Avaibility />
      <EUDRTable />
      <Footer />
    </div>
  );
}
export default HomePage;

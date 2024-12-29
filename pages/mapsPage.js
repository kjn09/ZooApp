import MapComponent from "./components/map";
import Header from './components/header';

export default function Group() {


  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };


  return (
    <div>
      <Header onMenuClick={toggleNavbar} title={"All restaurants in Zürich Zoo"} />
      <MapComponent />
    </div>
  );
}

import Navbar from "../components/Navbar";
import Carousel from "../components/Carousel";

const HomePage = () => {
  return (
    <>
      <Navbar>
        <div className="overflow-hidden rounded-lg m-5">
          <div className="text-center bg-gray-200 p-2">
            <p className="lg:text-3xl md:text-2xl pt-4 font-bold text-blue-950 ">
              Bienvenidos al sistema integrado de registro académico del Instituto Horizon Educative Corporation
            </p>
          </div>
          <div className="p-5">
            <Carousel/>
          </div>
        </div>
      </Navbar>
    </>
  );
}

export default HomePage;

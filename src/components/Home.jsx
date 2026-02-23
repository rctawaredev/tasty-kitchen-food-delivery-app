import Navbar from "./Navbar"
import BannerCarousel from "./BannerCaraousel"
import PopularHotels from "./PopularHotels"
const Home=()=> {
    return (
        <div className="bg-white min-h-screen ">
            <Navbar/>
                <BannerCarousel/>
                <PopularHotels/>

        </div>

    )
}


export default Home

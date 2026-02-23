import Navbar from "./Navbar"
import BannerCarousel from "./BannerCaraousel"
import PopularHotels from "./PopularHotels"
import Footer from "./Footer"
const Home=()=> {
    return (
        <div className="bg-white min-h-screen ">
            <Navbar/>
                <BannerCarousel/>
                <PopularHotels/>
                <Footer/>


        </div>

    )
}


export default Home

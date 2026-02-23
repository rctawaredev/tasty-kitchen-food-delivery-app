import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const apiStatusConstants = {
  INITIAL: "INITIAL",
  IN_PROGRESS: "IN_PROGRESS",
  SUCCESS: "SUCCESS",
  FAILURE: "FAILURE",
};

const BannerCarousel = () => {

  const [banners, setBanners] = useState([]);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.INITIAL);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const autoplay = Autoplay({
    delay: 5000,
    stopOnInteraction: false,
  });

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true },
    [autoplay]
  );

// api call
  const getBannerDetails = async () => {

    setApiStatus(apiStatusConstants.IN_PROGRESS);

    const url = "https://apis.ccbp.in/restaurants-list/offers";
    const jwtToken = Cookies.get("jwt_token");

    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    try {
      const response = await fetch(url, options);

      if (response.ok) {
        const data = await response.json();
        setBanners(data.offers);
        setApiStatus(apiStatusConstants.SUCCESS);
      } else {
        setApiStatus(apiStatusConstants.FAILURE);
      }

    } catch {
      setApiStatus(apiStatusConstants.FAILURE);
    }
  };

  useEffect(() => {
    getBannerDetails();
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    onSelect();

  }, [emblaApi]);


const renderLoadingView = () => (
  <div className="mt-4 px-3">

    {/* mobile */}
    <div className="md:hidden">
      <Skeleton
        height={188}
        borderRadius={12}
        baseColor="#e2e8f0"
        highlightColor="#f1f5f9"
      />
    </div>

    {/* tablet and desktop */}
    <div className="hidden md:block">
      <Skeleton
        height={320}
        borderRadius={12}
        baseColor="#e2e8f0"
        highlightColor="#f1f5f9"
      />
    </div>

  </div>
);

  // failure view
  const renderFailureView = () => (
    <div className="flex flex-col items-center justify-center h-[200px]">
      <p className="text-red-500">Failed to load banners</p>
      <button
        onClick={getBannerDetails}
        className="mt-2 bg-[#F7931E] px-4 py-2 text-white rounded"
      >
        Retry
      </button>
    </div>
  );

 //success view
  const renderSuccessView = () => (
    <div
      className="overflow-hidden mt-4"
      ref={emblaRef}
      onMouseEnter={() => autoplay.stop()}
      onMouseLeave={() => autoplay.play()}
    >
      <div className="flex">

        {banners.map((banner) => (
          <div key={banner.id} className="min-w-full">

            <div className="w-full h-[188px] md:h-[320px] md:rounded-xl md:px-15  overflow-hidden">
              <img
                src={banner.image_url}
                alt="offer"
                className="w-full h-full object-cover md:rounded-xl"
              />
            </div>

          </div>
        ))}

      </div>

      <div className="flex justify-center gap-2 mt-3">

        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi && emblaApi.scrollTo(index)}
            className={`h-2 w-2 rounded-full transition-all duration-300
            ${selectedIndex === index
              ? "bg-[#F7931E] w-4"
              : "bg-gray-300"
            }`}
          />
        ))}

      </div>

    </div>
  );

  // switch  case rendering
  const renderBannerView = () => {
    switch (apiStatus) {

      case apiStatusConstants.IN_PROGRESS:
        return renderLoadingView();

      case apiStatusConstants.SUCCESS:
        return renderSuccessView();

      case apiStatusConstants.FAILURE:
        return renderFailureView();

      default:
        return null;
    }
  };

  return (
    <>
      {renderBannerView()}
    </>
  );
};

export default BannerCarousel;
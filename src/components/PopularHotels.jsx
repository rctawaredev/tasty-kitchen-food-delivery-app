import { MdSort } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const apiStatusConstants = {
  INITIAL: "INITIAL",
  IN_PROGRESS: "IN_PROGRESS",
  SUCCESS: "SUCCESS",
  FAILURE: "FAILURE",
};

const PopularHotels = () => {

  const [apiStatus, setApiStatus] = useState(apiStatusConstants.INITIAL);
  const [hotelData, setHotellData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [sortByValue, setSortByValue] = useState("Highest");

  const limit = 9;

  const handleSortChange = (event) => {
    setCurrentPage(1);
    setSortByValue(event.target.value);
  };

  const getPopularHotels = async () => {

    setApiStatus(apiStatusConstants.IN_PROGRESS);

    const offset = (currentPage - 1) * limit;

    const url = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${limit}&sort_by_rating=${sortByValue}`;

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

        const totalRestaurants = data.total;
        setTotalPages(Math.ceil(totalRestaurants / limit));

        const updatedData = data.restaurants.map(eachHotel => ({
          id: eachHotel.id,
          name: eachHotel.name,
          imgUrl: eachHotel.image_url,
          cuisine: eachHotel.cuisine,
          userRating: {
            rating: eachHotel.user_rating.rating,
            totalReviews: eachHotel.user_rating.total_reviews,
          },
        }));

        setHotellData(updatedData);
        setApiStatus(apiStatusConstants.SUCCESS);

      } else {
        setApiStatus(apiStatusConstants.FAILURE);
      }

    } catch {
      setApiStatus(apiStatusConstants.FAILURE);
    }
  };

  useEffect(() => {
    getPopularHotels();
  }, [currentPage, sortByValue]);


  const renderLoadingView = () => {
    return (
      <div className="px-5 md:px-15 py-5">

        <div className="pb-5">
          <Skeleton height={30} width={200} />
          <Skeleton height={15} width={300} className="mt-2" />
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

          {Array(6).fill(0).map((_, index) => (
            <li key={index} className="flex items-center gap-5">

              <Skeleton height={100} width={160} borderRadius={8} />

              <div className="flex flex-col gap-2">
                <Skeleton height={20} width={120} />
                <Skeleton height={15} width={80} />
                <Skeleton height={15} width={100} />
              </div>

            </li>
          ))}

        </ul>

      </div>
    );
  };


  const renderFailureView = () => {
    return <h2 className="text-black text-center mt-10">Error Loading Restaurants</h2>;
  };


  const renderSuccessView = () => {
    return (
      <div className="px-5 md:px-15 py-5">

        <ul className="lg:flex justify-between md:border-b md:border-b-[#CBD2D9]">

          <li className="pb-5">
            <h1 className="text-[24px] md:text-[32px] font-[700] text-[#183B56]">
              Popular Restaurants
            </h1>
            <p className="font-[500] text-[12px] md:text-[16px] text-[#64748B]">
              Select Your favourite restaurant special dish and make your day happy...
            </p>
          </li>

          <li className="flex items-center gap-2 md:mt-5">

            <MdSort className="text-[24px] text-[#475569]" />

            <div>
              <label className="text-[16px] text-[#475569]">Sort by</label>

              <select
                value={sortByValue}
                className="text-[16px] text-[#475569] outline-0"
                onChange={handleSortChange}
              >
                <option value="Highest">Highest</option>
                <option value="Lowest">Lowest</option>
              </select>

            </div>

          </li>

        </ul>
        {/* grid */}
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">

          {hotelData.map(eachHotel => (

            <li key={eachHotel.id} className="flex items-center gap-3 w-full">

              <img
                src={eachHotel.imgUrl}
                className="h-[100px] md:h-[150px] w-[160px] md:w-[255px] rounded-[8px] flex-shrink-0"
              />

              <div className="flex flex-col gap-2">

                <h1 className="text-[16px] md:text-[18px] text-[#334155] font-[700]">
                  {eachHotel.name}
                </h1>

                <p className="text-[12px] md:text-[14px] text-[#64748B]">
                  {eachHotel.cuisine}
                </p>

                <div className="flex items-center gap-2">
                  <FaStar className="text-[#FFCC00] text-[12px]" />
                  <h1 className="font-[700] text-[14px] text-[#1E293B]">
                    {eachHotel.userRating.rating}
                  </h1>
                  <p className="font-[400] text-[12px] text-[#64748B]">
                    ({eachHotel.userRating.totalReviews} ratings)
                  </p>
                </div>

              </div>

            </li>

          ))}

        </ul>


        <div className="flex justify-center items-center gap-4 mt-10">

          <button
            className="border border-black text-black px-3 py-1 rounded disabled:opacity-40"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
          >
            ❮
          </button>

          <p className="text-black text-sm">
            {currentPage} of {totalPages}
          </p>

          <button
            className="border border-black text-black px-3 py-1 rounded disabled:opacity-40"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => prev + 1)}
          >
            ❯
          </button>

        </div>

      </div>
    );
  };


  const renderView = () => {
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

  return renderView();
};

export default PopularHotels;
import React, { useState } from "react";
import { FaSearch, FaShoppingCart, FaTimes, FaUserAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUserAccessToken,
  selectUserInfo,
} from "../../../features/auth/userAuthSelectors";
import { selectCartItems } from "../../../features/cart/cartSelectors";
import toast from "react-hot-toast";
import { userLoggedOut } from "../../../features/auth/userAuthSlice";
import { Link, useNavigate } from "react-router-dom";
import { openCart } from "../../../features/cart/cartOpenSlice";

export const MainHeader = () => {
  const cartItems = useSelector(selectCartItems);
  const userAccessToken = useSelector(selectUserAccessToken);
  const userInfo = useSelector(selectUserInfo);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchText !== "") {
      setSearchText("");
      navigate(`/search?search=${searchText}`);
    }
  };

  const handleLogout = () => {
    dispatch(userLoggedOut());
    localStorage.removeItem("userAuth");
    toast.success("Logged Out Successfully");
    navigate("/login");
  };

  const cartOpenHandler = () => {
    dispatch(openCart(true));
  };

  const cartItemCount = cartItems.length > 0 ? cartItems.length : 0;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 lg:px-8 py-3 flex justify-between items-center">
        <div className="text-xl font-bold">
          <Link to="/">ElectraMart</Link>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-xs relative">
          <form className="relative w-64" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full p-2 pl-10 border border-gray-700 rounded-md"
            />
            <div className="absolute left-3 top-3 text-gray-600">
              {searchText ? (
                <FaTimes
                  className="cursor-pointer"
                  onClick={() => setSearchText("")}
                />
              ) : (
                <FaSearch />
              )}
            </div>
          </form>
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-4">
          <div
            className="relative md:hidden"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <FaSearch className="text-gray-600 w-6 h-6" />
          </div>
          <div
            className="relative"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {userAccessToken && userInfo?._id ? (
              <img
                src={userInfo.profilePic}
                alt=""
                className="w-8 h-8 rounded-full cursor-pointer"
              />
            ) : (
              <FaUserAlt className="w-6 h-6 cursor-pointer text-gray-600" />
            )}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                <div className="p-2">
                  {userAccessToken && userInfo?._id ? (
                    <>
                      <div className="flex items-center space-x-2">
                        <img
                          src={userInfo.profilePic}
                          alt="Profile"
                          className="w-8 h-8 rounded-full"
                        />
                        <span className="font-semibold">{userInfo?.name}</span>
                      </div>
                      <hr className="my-2" />
                      <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                        Profile
                      </button>
                      <Link
                        to="/my-order"
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Orders
                      </Link>
                      <Link
                        to="/checkout"
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Checkout
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Login
                      </Link>
                      <Link
                        to="/register"
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Sign Up
                      </Link>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="relative cursor-pointer" onClick={cartOpenHandler}>
            <FaShoppingCart className="text-gray-600 w-6 h-6" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {cartItemCount}
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {isSearchOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <form className="flex items-center p-4" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search..."
              className="w-full p-2 border border-gray-300 rounded-md"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </form>
        </div>
      )}
    </nav>
  );
};

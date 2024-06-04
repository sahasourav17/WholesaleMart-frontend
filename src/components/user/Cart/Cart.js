import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { selectCartOpen } from "../../../features/cart/cartOpenSelector";
import { openCart } from "../../../features/cart/cartOpenSlice";
import { selectCartItems } from "../../../features/cart/cartSelectors";
import { useDispatch, useSelector } from "react-redux";
import { CartItem } from "./CartItem";
import emptyCart from "../../../images/emptycart.png";

export const Cart = () => {
  const isCartOpen = useSelector(selectCartOpen);
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();

  const handleCartClose = () => {
    dispatch(openCart(false));
  };

  return (
    <Transition show={isCartOpen}>
      <Dialog className="relative z-50" onClose={handleCartClose}>
        <TransitionChild
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <TransitionChild
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <DialogPanel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <DialogTitle className="text-lg font-medium text-gray-900">
                          Your Cart
                        </DialogTitle>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={handleCartClose}
                          >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Close panel</span>
                            <FaTimes className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      {cartItems.length > 0 ? (
                        <div className="mt-8">
                          <div className="flow-root">
                            <ul className="-my-6 divide-y divide-gray-200">
                              {cartItems.map((product) => (
                                <CartItem key={product._id} product={product} />
                              ))}
                            </ul>
                          </div>
                        </div>
                      ) : (
                        <div className="mt-32 flex flex-col justify-center items-center">
                          <div className="flex items-center w-48">
                            <img src={emptyCart} alt="Empty Cart" />
                          </div>
                          <h1 className="mt-8 text-center font-semibold text-xl">
                            {" "}
                            Your Cart is Empty
                          </h1>
                        </div>
                      )}
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="mt-6" onClick={handleCartClose}>
                        <Link
                          to="/checkout"
                          className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                        >
                          Checkout
                        </Link>
                      </div>
                      <div
                        className="mt-6 flex justify-center text-center text-sm text-gray-500"
                        onClick={handleCartClose}
                      >
                        <p>
                          or{" "}
                          <Link
                            to="/"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

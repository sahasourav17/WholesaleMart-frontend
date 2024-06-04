import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeCart } from "../../../features/cart/addToCartSlice";
import createSlug from "../../../utils/createSlug";

export const CartItem = ({ product }) => {
  const dispatch = useDispatch();
  return (
    <li key={product._id} className="flex py-6">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <img
          src={product.picture}
          alt={product.imageAlt}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>
              <Link
                to={`/product-details/${createSlug(product.name)}/${
                  product._id
                }`}
              >
                {product.name}
              </Link>
            </h3>
            <p className="ml-4">{product.price}</p>
          </div>
          <p className="mt-1 text-sm text-gray-500">{product.color}</p>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          <p className="text-gray-500">Qty {product.quantity}</p>

          <div className="flex">
            <button
              type="button"
              className="font-medium text-indigo-600 hover:text-indigo-500"
              onClick={() => dispatch(removeCart(product._id))}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

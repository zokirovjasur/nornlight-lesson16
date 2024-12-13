import React, { useContext, useEffect } from "react";
import { MyContext } from "../Context";
import { FaTrash } from "react-icons/fa";

const Cart = () => {
  const { state, dispatch } = useContext(MyContext);

  useEffect(() => {
    if (state.cart) {
      localStorage.setItem("cart", JSON.stringify(state.cart));
    }
  }, [state.cart]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    if (savedCart) {
      dispatch({ type: "SET_CART", payload: savedCart });
    }
  }, [dispatch]);

  const handleRemoveFromCart = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  return (
    <div>
      <h2 className="text-5xl font-bold text-center mb-10">Cart</h2>
      <div className="flex flex-col items-center border-gray-100 rounded-lg">
        {state.cart && state.cart.length > 0 ? (
          <div className="grid grid-cols-2 gap-3">
            {state.cart.map((product) => (
              <div
                key={product.id}
                className="p-4 bg-white border border-gray-200 rounded-lg shadow"
              >
                <div className="items-center">
                  <img
                    className="object-contain w-full p-3 rounded-t-lg h-[90%] md:w-48 md:rounded-none md:rounded-s-lg"
                    src={product.image}
                    alt={product.title}
                  />
                </div>
                <div className="flex flex-col justify-between p-4 leading-normal">
                  <h3 className="text-xl font-bold">{product.title}</h3>
                  <p className="mb-3 line-clamp-3 font-normal text-gray-600 dark:text-gray-200">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <p className="text-lg font-semibold">${product.price}</p>
                    <button
                      className="btn flex items-center justify-center p-3 rounded-full bg-red-100 hover:bg-red-200"
                      onClick={() => handleRemoveFromCart(product.id)}
                      aria-label="Remove from cart"
                    >
                      <FaTrash className="text-red-500 hover:text-red-700 text-2xl" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <h3 className="text-gray-500 text-center">Savatingiz bosh !!</h3>
        )}
      </div>
    </div>
  );
};

export default Cart;

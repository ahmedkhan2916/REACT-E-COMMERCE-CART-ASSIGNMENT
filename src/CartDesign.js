import React, { useEffect, useState } from "react";
import phone from "../src/images/photo2.png"

function CartDesign() {
  //mock data
  const initialProducts = [
    { id: 1, name: "Laptop", category: "Electronics", price: 1200 },
    { id: 2, name: "T-Shirt", category: "Clothing", price: 25 },
    { id: 3, name: "The Great Gatsby", category: "Books", price: 15 },
    { id: 4, name: "Smartphone", category: "Electronics", price: 800 },
    { id: 5, name: "Jeans", category: "Clothing", price: 50 },
    { id: 6, name: "Sapiens", category: "Books", price: 20 },
  ];

 



  //states 
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [addedItem, setAddedItem] = useState({});
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);


//setting value 0 when last item will remove
   useEffect(()=>{


  if(cart.length===0)
    {
        setTotal(0);
    }



  },[total])


  //filtering product from selectcategory 
  const filteredProducts =
    selectedCategory === "All"
      ? initialProducts
      : initialProducts.filter((item) => selectedCategory === item.category);

  //adding items into cart 
  const handleAddToCart = (itemID, price) => {
    if (!itemID) return;

   
    const productToAdd = initialProducts.find((p) => p.id === itemID);
    if (!productToAdd) return;

    setTotal((prev) => price + prev);

    setCart((prevCart) => {
      const existing = prevCart.find((c) => c.id === itemID);

      if (existing) {
        return prevCart.map((c) =>
          c.id === itemID ? { ...c, quantity: c.quantity + 1 } : c
        );
      }

      return [...prevCart, { ...productToAdd, quantity: 1 }];
    });
  };

  //remove single item from cart 
  const handleRemoveItem = (itemID,price,qty) => {

  
  const totalMinusvalue=qty*price;
  const totalVal=total-totalMinusvalue

  
    setTotal(totalVal)

   
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemID));

  
  };

  //show according to category which user want to see. 
  const handleFilterData = (dataUpcoming) => {
    if (!dataUpcoming) {
      return;
    }
    setSelectedCategory(dataUpcoming);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800">
            Dynamic Product Filter & Cart
          </h1>
          <p className="text-sm text-gray-500 mt-2">Browse and add items to your cart</p>
        </div>

        {/* Responsive layout: stack on small, 2-cols on md+ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left: Products (takes 2 cols on md) */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6">
              {/* Filters */}
              <div className="flex flex-wrap gap-2 mb-4">
                {["All", "Electronics", "Books", "Clothing"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleFilterData(cat)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                      selectedCategory === cat
                        ? "bg-blue-600 text-white shadow"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Product grid: responsive columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProducts.map((item) => (
                  <div
                    key={item.id}
                    className="bg-gray-50 rounded-xl p-4 flex flex-col h-full"
                  >
                    <div className="w-full h-36 rounded-md bg-gradient-to-br from-gray-200 to-white flex items-center justify-center mb-3">
                              <img src={phone} alt="phoneimage"></img>
                 
                    </div>

                    <h3 className="font-semibold text-gray-800 mb-1">{item.name}</h3>
                    <p className="text-xs text-gray-500 mb-3">Category: {item.category}</p>

                    <div className="mt-auto flex items-center justify-between">
                      <div>
                        <div className="text-lg font-bold text-gray-800">${item.price}</div>
                        <div className="text-xs text-gray-400">incl. taxes</div>
                      </div>

                      <button
                        onClick={() => handleAddToCart(item.id, item.price)}
                        className="ml-3 bg-green-500 hover:bg-green-600 text-white text-sm px-3 py-2 rounded shadow"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Cart (full width on mobile, side on md+) */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 flex flex-col h-full">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-bold text-gray-800">Shopping Cart</h2>
                <div className="text-sm text-gray-500">{cart.length} items</div>
              </div>

              <div className="flex-1 overflow-y-auto mb-4">
                {cart.length === 0 ? (
                  <div className="py-8 text-center text-sm text-gray-500">Cart is empty.</div>
                ) : (
                  <ul className="space-y-3">
                    {cart.map((item) => (
                      <li
                        key={item.id}
                        className="flex items-start justify-between bg-gray-50 rounded-lg p-3"
                      >
                        <div className="flex items-center gap-3">
                            
                          <div className="w-12 h-12 rounded-md bg-gray-200 flex items-center justify-center text-xs text-gray-400">
                           
                      

                          </div>
                          <div>
                            <div className="font-medium text-gray-800">{item.name}</div>
                            <div className="text-xs text-gray-500">Qty: {item.quantity}</div>
                          </div>
                        </div>

                        <div className="text-right flex flex-col items-end">
                          <div className="font-semibold text-gray-800">
                            ${item.price * item.quantity}
                          </div>
                          <button
                            onClick={() => handleRemoveItem(item.id,item.price,item.quantity)}
                            className="text-sm text-red-500 mt-2 hover:underline"
                          >
                            Remove
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm text-gray-600">Subtotal</div>
                  <div className="text-lg font-bold text-gray-900">${total}</div>
                </div>

                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium">
                  Checkout
                </button>

             
              </div>
            </div>
          </div>
        </div>
      </div> 
    </div>
  );
}

export default CartDesign;

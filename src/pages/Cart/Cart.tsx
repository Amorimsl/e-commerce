import ImageCards from '../../components/bgImageCards/ImageCards';
import QualityCertificate from '../../components/certificate/QualityCertificate';
import { useProducts } from '../../context/exportContext';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { auth } from '../../firebase/firebase';
import { User } from 'firebase/auth';
const Cart = () => {
  const { addToCard, updateQuantity, removeItem } = useProducts();
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  });

  const handleButtonClick = () => {
    if (user) {
      navigate('/Checkout');
      window.scrollTo(0, 0);
    } else {
      navigate('/Login');
      window.scrollTo(0, 0);
    }
  };

  return (
    <div>
      <ImageCards />

      <section className="w-full h-auto xl:h-[525px] flex items-center justify-center p-4 xl:p-0">
        <div className="w-full h-auto xl:w-[1240px] xl:h-[390px]  flex flex-col xl:flex-row xl:justify-between gap-4 xl:gap-0 overflow-y-auto">
          <div className="w-full h-auto xl:w-[817px] xl:h-[215px]  p-4 xl:p-0 ">
            <div className="w-full h-auto xl:h-[55px] bg-custom-bg">
              <div className="md:flex hidden items-center justify-around xl:justify-between">
                <div>Product</div>
                <div>Price</div>
                <div>Quantity</div>
                <div>Subtotal</div>
              </div>
            </div>
            {addToCard.map((item, index) => (
              <div
                key={index}
                className="w-full h-auto flex flex-col md:flex-row xl:flex-row items-center justify-around mt-2 xl:justify-between gap-4 xl:gap-0"
              >
                <div className="w-[108px] h-[105px] bg-custom-bg flex items-center justify-center">
                  <img src={item.images.mainImage} alt={item.title} />
                </div>
                <span className="max-w-[230px] truncate">{item.title}</span>
                <span>Rp.{item.normalPrice}</span>
                <div className="w-[123px] h-[64px] bg-white rounded-lg border border-gray-300 flex items-center justify-center">
                  <button
                    className="text-lg font-semibold text-black px-4"
                    onClick={() => updateQuantity(item.id, -1)}
                  >
                    -
                  </button>
                  <span className="text-lg font-semibold">{item.quantity}</span>
                  <button
                    className="text-lg font-semibold text-black px-4"
                    onClick={() => updateQuantity(item.id, 1)}
                  >
                    +
                  </button>
                </div>
                <span className="max-w-[90px] truncate">
                  Rp.{item.normalPrice * item.quantity}
                </span>
                <img
                  src="https://e-commerceuol.s3.eu-north-1.amazonaws.com/assets/lixeiraCart/lixeira.svg"
                  alt="Remove item"
                  className="cursor-pointer"
                  onClick={() => removeItem(item.id)}
                />
              </div>
            ))}
          </div>
          <div className="w-full xl:w-[393px] h-auto xl:h-[390px] bg-custom-bg flex flex-col items-center justify-center gap-2 xl:gap-16 p-4 xl:p-0">
            <div className="w-full flex justify-center mt-4">
              <h1 className="text-3xl font-semibold">Cart Totals</h1>
            </div>
            <div className="w-full flex flex-col items-center justify-around mt-4 gap-4">
              <div className="flex flex-row items-center justify-between w-full px-4 xl:px-16">
                <p>Subtotal</p>
                <span>
                  Rp.
                  {addToCard
                    .reduce(
                      (total, item) => total + item.normalPrice * item.quantity,
                      0
                    )
                    .toFixed(2)}
                </span>
              </div>
              <div className="flex flex-row items-center justify-between w-full px-4 xl:px-16">
                <p>Total</p>
                <span className="text-custom-text-yellow font-medium text-xl">
                  Rp.
                  {addToCard
                    .reduce(
                      (total, item) => total + item.normalPrice * item.quantity,
                      0
                    )
                    .toFixed(2)}
                </span>
              </div>
            </div>
            <div className="w-full flex items-center justify-center text-xl">
              <button
                className="h-auto w-[222px] xl:h-[58.95px] border border-black rounded-xl"
                onClick={handleButtonClick}
              >
                {user ? 'Check Out' : 'Login'}
              </button>
            </div>
          </div>
        </div>
      </section>

      <QualityCertificate />
    </div>
  );
};

export default Cart;

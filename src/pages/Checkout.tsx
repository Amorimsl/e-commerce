import ImageCards from '../components/bgImageCards/ImageCards';
import QualityCertificate from '../components/certificate/QualityCertificate';
import { Product } from '../context/context';
import { useProducts } from '../context/exportContext';

const Checkout = () => {
  const { addToCard } = useProducts();

  const calculateSubtotal = (products: Product[]): number =>
    products.reduce(
      (total, product) => total + product.normalPrice * product.quantity,
      0
    );

  return (
    <div>
      <ImageCards />
      <section className="w-full h-[1829px]  flex items-center justify-center">
        <div className="xl:w-[1242px] w-full lg:h-[1714px] h-full bg-white flex justify-between lg:flex-row flex-col gap-2">
          <div className="h-full md:w-[608px] w-full  flex flex-col gap-6 ">
            <h1 className="text-4xl  font-semibold text-center">
              Billing details
            </h1>
            <form className="flex justify-center flex-col items-center gap-6 ">
              <div className="flex gap-6">
                <div className="flex flex-col">
                  <label className="text-base "> First Name</label>
                  <input
                    type="text"
                    value={''}
                    className="md:w-[211px] h-[75px] w-full border border-color-transparent rounded-xl"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-base "> Last Name</label>
                  <input
                    type="text"
                    value={''}
                    className="md:w-[211px] w-full h-[75px] border border-color-transparent rounded-xl"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label>Company Name (Optional)</label>
                <input
                  type="text"
                  className="md:w-[453px] w-full h-[75px] border border-color-transparent rounded-xl"
                  value={''}
                />
              </div>
              <div className="flex flex-col">
                <label>ZIP code</label>
                <input
                  type="text"
                  className="md:w-[453px] w-full h-[75px] border border-color-transparent rounded-xl"
                  value={''}
                />
              </div>
              <div className="flex flex-col">
                <label>Country / Region</label>
                <input
                  type="text"
                  className="md:w-[453px] w-full h-[75px] border border-color-transparent rounded-xl"
                  value={''}
                />
              </div>
              <div className="flex flex-col">
                <label>Street address</label>
                <input
                  type="text"
                  className="md:w-[453px] w-full h-[75px] border border-color-transparent rounded-xl"
                  value={''}
                />
              </div>
              <div className="flex flex-col">
                <label>Town / City</label>
                <input
                  type="text"
                  className="md:w-[453px] w-full h-[75px] border border-color-transparent rounded-xl"
                  value={''}
                />
              </div>
              <div className="flex flex-col">
                <label>Province</label>
                <input
                  type="text"
                  className="md:w-[453px] w-full h-[75px] border border-color-transparent rounded-xl"
                  value={''}
                />
              </div>
              <div className="flex flex-col">
                <label>Add-on address</label>
                <input
                  type="text"
                  className="md:w-[453px] w-full h-[75px] border border-color-transparent rounded-xl"
                  value={''}
                />
              </div>
              <div className="flex flex-col">
                <label>Email address</label>
                <input
                  type="text"
                  className="md:w-[453px] w-full h-[75px] border border-color-transparent rounded-xl"
                  value={''}
                />
              </div>
            </form>
          </div>

          <div className="lg:w-[608px] w-full h-[789px] flex flex-col items-center justify-center ">
            <div className="lg:w-[533px] w-full h-[616px] flex justify-between   pb-4 flex-col ">
              <div className="flex justify-between">
                <div className="flex flex-col gap-6">
                  <p className="text-2xl">Product</p>
                  {addToCard.map((product) => (
                    <div key={product.id} className="flex justify-between">
                      <p className="text-color-transparent">
                        {product.title} <span className="text-black"> X</span>{' '}
                        <span>{product.quantity}</span>
                      </p>
                    </div>
                  ))}
                  <p>Subtotal</p>
                  <p>Total</p>
                </div>
                <div className="flex flex-col gap-6 items-end">
                  <p className="text-2xl">Subtotal</p>
                  <p>{`Rp.${calculateSubtotal(addToCard).toFixed(3)}`}</p>
                  <p>{`Rp.${calculateSubtotal(addToCard).toFixed(3)}`}</p>
                  <p className="text-custom-text-yellow font-bold text-2xl">
                    {`Rp.${calculateSubtotal(addToCard).toFixed(3)}`}
                  </p>
                </div>
              </div>
              <div className="lg:w-[528px] h-[107px] flex">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 ">
                    <input type="radio" />
                    <span>Direct Bank Transfer</span>
                  </div>
                  <p className="text-color-transparent">
                    Make your payment directly into our bank account. Please use
                    your Order ID as the payment reference. Your order will not
                    be shipped until the funds have cleared in our account.
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <input type="radio" />
                <span className="text-color-transparent">Cash On Delivery</span>
              </div>
              <div className="lg:w-[529px] h-[72px] w-full">
                <p>
                  Your personal data will be used to support your experience
                  throughout this website, to manage access to your account, and
                  for other purposes described in our{' '}
                  <span className="font-bold">privacy policy.</span>
                </p>
              </div>
              <div className="flex items-center justify-center">
                <button className="lg:w-[318px] w-full h-[64px] border border-color-transparent rounded-xl">
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <QualityCertificate />
    </div>
  );
};

export default Checkout;

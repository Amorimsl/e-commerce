import { useState, ChangeEvent } from 'react';
import ImageCards from '../../components/bgImageCards/ImageCards';
import QualityCertificate from '../../components/certificate/QualityCertificate';
import { Product } from '../../context/context';
import { useProducts } from '../../context/exportContext';
import axios from 'axios';
import { formSchema } from '../../zod/validationSchema';
import { z } from 'zod';

interface FormData {
  companyName: string;
  zipCode: string;
  country: string;
  streetAddress: string;
  city: string;
  province: string;
  addOnAddress: string;
  email: string;
}

const Checkout = () => {
  const { addToCard, userDetails } = useProducts();
  const [selectedOption, setSelectedOption] = useState<string>('');

  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    zipCode: '',
    country: '',
    streetAddress: '',
    city: '',
    province: '',
    addOnAddress: '',
    email: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleZipCodeChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const zipCode = event.target.value;

    setFormData({ ...formData, zipCode });

    if (zipCode.length === 8) {
      try {
        const response = await axios.get(
          `https://viacep.com.br/ws/${zipCode}/json/`
        );
        const { localidade, uf, logradouro } = response.data;
        setFormData((prevState) => ({
          ...prevState,
          city: localidade,
          province: uf,
          streetAddress: logradouro,
          country: 'Brasil',
        }));
      } catch (error) {
        console.error('Erro ao buscar o CEP:', error);
      }
    }
  };
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const calculateSubtotal = (products: Product[]): number =>
    products.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      formSchema.parse(formData);

      console.log('Form data is valid:', formData);
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        err.errors.forEach((error) => {
          if (error.path.length > 0) {
            fieldErrors[error.path[0]] = error.message;
          }
        });
        setErrors(fieldErrors);
      }
    }
  };
  const handleExternalSubmit = () => {
    const formElement = document.querySelector('form');
    if (formElement) {
      formElement.requestSubmit();
    }
  };
  const handleOptionChange = (option: string) => {
    setSelectedOption(option === selectedOption ? '' : option);
  };
  return (
    <div>
      <ImageCards />
      <section className="w-full h-[1829px] flex items-center justify-center">
        <div className="xl:w-[1242px] w-full lg:h-[1714px] h-full bg-white flex justify-between lg:flex-row flex-col gap-2 ">
          <div className="h-full md:w-[608px] w-full flex flex-col gap-6 ">
            <h1 className="text-4xl font-semibold text-center">
              Billing details
            </h1>
            <form
              className="flex justify-center flex-col items-center gap-6"
              onSubmit={handleSubmit}
            >
              <div className="flex gap-6">
                {userDetails && (
                  <>
                    <div className="flex flex-col">
                      <label htmlFor="firstName" className="text-base">
                        First Name
                      </label>
                      <input
                        id="firstName"
                        type="text"
                        value={userDetails.firstName || ''}
                        className="md:w-[211px] h-[75px] w-full border border-color-transparent rounded-xl px-2"
                        readOnly
                      />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="lastName" className="text-base">
                        Last Name
                      </label>
                      <input
                        id="lastName"
                        type="text"
                        value={userDetails.lastName || ''}
                        className="md:w-[211px] w-full h-[75px] border border-color-transparent rounded-xl px-2"
                        readOnly
                      />
                    </div>
                  </>
                )}
              </div>
              <div className="flex flex-col">
                <label htmlFor="companyName">Company Name (Optional)</label>
                <input
                  id="companyName"
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="md:w-[453px] w-full h-[75px] border border-color-transparent rounded-xl px-2"
                />
                {errors.companyName && (
                  <p className="text-red-500">{errors.companyName}</p>
                )}
              </div>
              <div className="flex flex-col">
                <label htmlFor="zipCode">ZIP code</label>
                <input
                  id="zipCode"
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleZipCodeChange}
                  className="md:w-[453px] w-full h-[75px] border border-color-transparent rounded-xl px-2"
                />
                {errors.zipCode && (
                  <p className="text-red-500">{errors.zipCode}</p>
                )}
              </div>
              <div className="flex flex-col">
                <label htmlFor="country">Country / Region</label>
                <input
                  id="country"
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="md:w-[453px] w-full h-[75px] border border-color-transparent rounded-xl px-2"
                />
                {errors.country && (
                  <p className="text-red-500">{errors.country}</p>
                )}
              </div>
              <div className="flex flex-col">
                <label htmlFor="streetAddress">Street address</label>
                <input
                  id="streetAddress"
                  type="text"
                  name="streetAddress"
                  value={formData.streetAddress}
                  onChange={handleChange}
                  className="md:w-[453px] w-full h-[75px] border border-color-transparent rounded-xl px-2"
                />
                {errors.streetAddress && (
                  <p className="text-red-500">{errors.streetAddress}</p>
                )}
              </div>
              <div className="flex flex-col">
                <label htmlFor="city">Town / City</label>
                <input
                  id="city"
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="md:w-[453px] w-full h-[75px] border border-color-transparent rounded-xl px-2"
                />
                {errors.city && <p className="text-red-500">{errors.city}</p>}
              </div>
              <div className="flex flex-col">
                <label htmlFor="province">Province</label>
                <input
                  id="province"
                  type="text"
                  name="province"
                  value={formData.province}
                  onChange={handleChange}
                  className="md:w-[453px] w-full h-[75px] border border-color-transparent rounded-xl px-2"
                />
                {errors.province && (
                  <p className="text-red-500">{errors.province}</p>
                )}
              </div>
              <div className="flex flex-col">
                <label htmlFor="addOnAddress">Add-on address</label>
                <input
                  id="addOnAddress"
                  type="text"
                  name="addOnAddress"
                  value={formData.addOnAddress}
                  onChange={handleChange}
                  className="md:w-[453px] w-full h-[75px] border border-color-transparent rounded-xl px-2"
                />
                {errors.addOnAddress && (
                  <p className="text-red-500">{errors.addOnAddress}</p>
                )}
              </div>
              {userDetails && (
                <div className="flex flex-col">
                  <label>Email address</label>
                  <input
                    id="email"
                    type="text"
                    name="email"
                    value={userDetails.email}
                    className="md:w-[453px] w-full h-[75px] border border-color-transparent rounded-xl px-2"
                    readOnly
                  />
                </div>
              )}
            </form>
          </div>
          <div className="lg:w-[608px] w-full h-auto flex flex-col items-center  ">
            <div className="lg:w-[533px] w-full h-auto flex flex-col justify-between pb-4">
              <div className="flex justify-between">
                <div className="flex flex-col gap-6">
                  <p className="text-2xl">Product</p>
                  {addToCard.map((product) => (
                    <>
                      <div key={product.id} className="flex justify-between">
                        <p className="text-color-transparent">
                          {product.title} <span className="text-black"> X</span>{' '}
                          <span>{product.quantity}</span>
                        </p>
                      </div>
                    </>
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
              <div className="lg:w-[528px] h-auto flex flex-col">
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    id="bankTransfer"
                    checked={selectedOption === 'bankTransfer'}
                    onChange={() => handleOptionChange('bankTransfer')}
                    className="hidden peer"
                  />
                  <label
                    htmlFor="bankTransfer"
                    className={`flex items-center gap-2 cursor-pointer peer-checked:text-black`}
                  >
                    <span
                      className={`w-5 h-5 border-2 rounded-full flex items-center justify-center ${
                        selectedOption === 'bankTransfer'
                          ? 'border-black'
                          : 'border-gray-400'
                      }`}
                    >
                      {selectedOption === 'bankTransfer' && (
                        <span className="w-full h-full bg-black rounded-full"></span>
                      )}
                    </span>
                    <span
                      className={
                        selectedOption === 'bankTransfer'
                          ? 'text-black'
                          : 'text-gray-400'
                      }
                    >
                      Direct Bank Transfer
                    </span>
                  </label>
                </div>
                <p
                  className={`mt-1 ${
                    selectedOption === 'bankTransfer'
                      ? 'text-black'
                      : 'text-gray-400'
                  }`}
                >
                  Make your payment directly into our bank account. Please use
                  your Order ID as the payment reference. Your order will not be
                  shipped until the funds have cleared in our account.
                </p>
              </div>
              <div className="flex gap-2 mt-4 ">
                <input
                  type="radio"
                  id="cashOnDelivery"
                  checked={selectedOption === 'cashOnDelivery'}
                  onChange={() => handleOptionChange('cashOnDelivery')}
                  className="hidden peer"
                />
                <label
                  htmlFor="cashOnDelivery"
                  className={`flex items-center gap-2 cursor-pointer peer-checked:text-black`}
                >
                  <span
                    className={`w-5 h-5 border-2 rounded-full flex items-center justify-center ${
                      selectedOption === 'cashOnDelivery'
                        ? 'border-black'
                        : 'border-gray-400'
                    }`}
                  >
                    {selectedOption === 'cashOnDelivery' && (
                      <span className="w-full h-full bg-black rounded-full"></span>
                    )}
                  </span>
                  <span
                    className={
                      selectedOption === 'cashOnDelivery'
                        ? 'text-black'
                        : 'text-gray-400'
                    }
                  >
                    Cash on Delivery
                  </span>
                </label>
              </div>
              <div className="flex items-center w-full justify-center ">
                <button
                  className="md:w-[318px]  w-full h-[70px] bg-custom-btn-yellow  rounded-xl mt-4 border border-custom-text-transparent  flex items-center justify-center"
                  onClick={handleExternalSubmit}
                  name=" Place Order"
                >
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

import trophySvg from '../../assets/certificate/trophy.svg';
import warrantySvg from '../../assets/certificate/warranty.svg';
import shippingSvg from '../../assets/certificate/shipping.svg';
import supportSvg from '../../assets/certificate/suport.svg';

const QualityCertificate = () => {
  return (
    <div className="py-32 bg-custom-bg">
      <div className="container mx-auto px-4 lg:px-8">
        <div
          className="flex flex-col lg:flex-row lg:justify-between items-center gap-8"
          data-testid="certificates-container"
        >
          <div
            className="flex items-center gap-6 w-full lg:w-auto"
            data-testid="certificate-item"
          >
            <img src={trophySvg} className="w-12 h-14" alt="High Quality" />
            <div className="flex flex-col">
              <p className="font-semibold text-xl">High Quality</p>
              <p className="text-color-transparent">
                crafted from top materials
              </p>
            </div>
          </div>

          <div
            className="flex items-center gap-6 w-full lg:w-auto"
            data-testid="certificate-item"
          >
            <img
              src={warrantySvg}
              className="w-12 h-14"
              alt="Warranty Protection"
            />
            <div className="flex flex-col">
              <p className="font-semibold text-xl">Warranty Protection</p>
              <p className="text-color-transparent">over 2 years</p>
            </div>
          </div>

          <div
            className="flex items-center gap-6 w-full lg:w-auto"
            data-testid="certificate-item"
          >
            <img src={shippingSvg} className="w-12 h-14" alt="Free Shipping" />
            <div className="flex flex-col">
              <p className="font-semibold text-xl">Free Shipping</p>
              <p className="text-color-transparent">order over 150 $</p>
            </div>
          </div>

          <div
            className="flex items-center gap-6 w-full lg:w-auto"
            data-testid="certificate-item"
          >
            <img src={supportSvg} className="w-12 h-14" alt="27/7 Support" />
            <div className="flex flex-col">
              <p className="font-semibold text-xl">27/7 Support</p>
              <p className="text-color-transparent">Dedicated support</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QualityCertificate;

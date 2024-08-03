import ImageCards from '../../components/bgImageCards/ImageCards';
import QualityCertificate from '../../components/certificate/QualityCertificate';

import { formSchema, FormSchema } from '../../zod/validationSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormSchema) => {
    console.log(data);
  };

  return (
    <main>
      <ImageCards />

      <section className="h-auto lg:h-[1144px] flex items-center justify-center flex-col gap-4">
        <div className="flex flex-col items-center gap-3 justify-center">
          <h1 className="font-semibold text-4xl">Get In Touch With Us</h1>
          <p className="lg:w-[644px] w-full lg:h-[48px] text-center text-color-transparent">
            For More Information About Our Product & Services. Please Feel Free
            To Drop Us An Email. Our Staff Always Be There To Help You Out. Do
            Not Hesitate!
          </p>
        </div>
        <div className="h-auto lg:h-[923px] lg:w-[1058px] w-full flex justify-between">
          <div className="lg:w-[393px] w-full lg:h-[537px] h-auto bg-white flex flex-col gap-6 items-center justify-center">
            <div className="flex gap-4">
              <img
                src="https://e-commerceuol.s3.eu-north-1.amazonaws.com/assets/Contact/location.svg"
                className="lg:pb-16"
              />
              <div data-testid="address">
                <h1 className="text-xl font-medium">Address</h1>
                <p className="lg:w-[212px] w-full lg:h-[72px] h-auto">
                  236 5th SE Avenue, New York NY10000, United States
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <img
                src="https://e-commerceuol.s3.eu-north-1.amazonaws.com/assets/Contact/phone.svg"
                className="lg:pb-16"
              />
              <div data-testid="Phone">
                <h1 className="text-xl font-medium">Phone</h1>
                <p className="lg:w-[212px] w-full lg:h-[72px] h-auto">
                  Mobile: +(84) 546-6789 Hotline: +(84) 456-6789
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <img
                src="https://e-commerceuol.s3.eu-north-1.amazonaws.com/assets/Contact/time.svg"
                className="lg:pb-16"
              />
              <div data-testid="Working Time">
                <h1 className="text-xl font-medium">Working Time</h1>
                <p className="lg:w-[212px] w-full lg:h-[72px] h-auto">
                  Monday-Friday: 9:00 - 22:00 Saturday-Sunday: 9:00 - 21:00
                </p>
              </div>
            </div>
          </div>
          <div className="lg:w-[635px] w-full lg:h-[923px] h-auto flex items-center justify-center">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="md:w-[531px] w-full md:h-[741px] h-auto bg-white flex flex-col gap-4"
            >
              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center">
                  <label>Your Name</label>
                  {errors.name && (
                    <span className="text-red-500">{errors.name.message}</span>
                  )}
                </div>
                <input
                  type="text"
                  {...register('name')}
                  className="md:w-[528px] w-full md:h-[75px] h-auto border border-color-transparent rounded-lg px-2"
                  placeholder="Your Name"
                />
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center">
                  <label>Email address</label>
                  {errors.email && (
                    <span className="text-red-500">{errors.email.message}</span>
                  )}
                </div>
                <input
                  type="email"
                  {...register('email')}
                  className="md:w-[528px] w-full md:h-[75px] h-auto border border-color-transparent rounded-lg px-2"
                  placeholder="example@domain.com"
                />
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center">
                  <label>Subject</label>
                </div>
                <input
                  type="text"
                  {...register('subject')}
                  className="md:w-[528px] w-full md:h-[75px] h-auto border border-color-transparent rounded-lg px-2"
                  placeholder="This is an optional"
                />
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center">
                  <label>Message</label>
                  {errors.message && (
                    <span className="text-red-500">
                      {errors.message.message}
                    </span>
                  )}
                </div>
                <textarea
                  {...register('message')}
                  className="md:w-[527px] w-full md:h-[120px] h-auto border border-color-transparent rounded-lg px-2"
                  placeholder="Hi! I'd like to ask about"
                />
              </div>
              <button
                type="submit"
                className="w-[237px] h-[55px] bg-custom-text-yellow text-white"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </section>

      <QualityCertificate />
    </main>
  );
};

export default Contact;

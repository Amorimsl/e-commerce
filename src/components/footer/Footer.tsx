import FacebookSvg from '../../assets/Facebook.svg';
import InstagramSvg from '../../assets/Instagram.svg';
import TwitterSvg from '../../assets/Twitter.svg';
import LinkedinSvg from '../../assets/Linkedin.svg';

const Footer = () => {
  return (
    <>
      <footer className="">
        <div>
          <h1>Furniro</h1>
          <p>400 University Drive Suite 200 Coral Gables, FL 33134 USA </p>
          <div>
            <img src={FacebookSvg} />
            <img src={InstagramSvg} />
            <img src={TwitterSvg} />
            <img src={LinkedinSvg} />
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;

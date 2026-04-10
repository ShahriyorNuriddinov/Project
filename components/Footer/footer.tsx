import { memo } from 'react';
import FooterInput from './footer-input';
import FooterLinks from './footer-links';
import FooterCard from './footer.card';

const Footer = () => {
  return (
    <section style={{ backgroundColor: "#020203" }} className="w-full">
      <div className="container flex flex-col gap-12 py-12">
        <FooterInput />
        <FooterLinks />
        <FooterCard />
      </div>
    </section>
  );
};

export default memo(Footer);
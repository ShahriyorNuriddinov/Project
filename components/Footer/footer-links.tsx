import { memo } from "react";

const FooterLinks = () => {
  const footerData = {
    Information: [
      "About Us",
      "About Zip",
      "Privacy Policy",
      "Search",
      "Terms",
      "Orders and Returns",
      "Contact Us",
      "Advanced Search",
      "Newsletter Subscription",
    ],
    "PC Parts": [
      "CPUS",
      "Add On Cards",
      "Hard Drives (Internal)",
      "Graphic Cards",
      "Keyboards / Mice",
      "Cases / Power Supplies / Cooling",
      "RAM (Memory)",
      "Software",
      "Speakers / Headsets",
      "Motherboards",
    ],
    "Desktop PCs": [
      "Custom PCs",
      "Servers",
      "MSI All-In-One PCs",
      "HP/Compaq PCs",
      "ASUS PCs",
      "Tecs PCs",
    ],
    Laptops: [
      "Evryday Use Notebooks",
      "MSI Workstation Series",
      "MSI Prestige Series",
      "Tablets and Pads",
      "Netbooks",
      "Infinity Gaming Notebooks",
    ],
  };

  return (
    <div className="flex items-start justify-between">
      {Object.entries(footerData).map(([title, links]) => (
        <div key={title} className="flex flex-col">
          <h3 style={{ color: "white" }} className="font-bold text-sm mb-5 tracking-tight">
            {title}
          </h3>
          <ul className="flex flex-col gap-2">
            {links.map((link) => (
              <li key={link}>
                <a
                  href="#"
                  className="text-white text-[13px] font-normal hover:text-[#0156FF] transition-colors leading-tight"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <div className="flex flex-col">
        <h3 style={{ color: "white" }} className="font-bold text-sm mb-5 tracking-tight">
          Address
        </h3>
        <div className="text-white text-[13px] flex flex-col gap-3 leading-relaxed">
          <p>Address: 1234 Street Adress City Address, 1234</p>

          <p>
            Phones:
            <span className="text-[#0156FF] cursor-pointer hover:underline">
              (00) 1234 5678
            </span>
          </p>

          <div className="space-y-1">
            <p>We are open: Monday-Thursday: 9:00 AM - 5:30 PM</p>
            <p>Friday: 9:00 AM - 6:00 PM</p>
            <p>Saturday: 11:00 AM - 5:00 PM</p>
          </div>

          <p>
            E-mail:
            <span className="text-[#0156FF] cursor-pointer hover:underline">
              shop@email.com
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default memo(FooterLinks);

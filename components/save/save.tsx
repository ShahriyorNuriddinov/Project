import { memo } from "react";
import { Card, CardContent } from "@/components/ui/card";

const Features = () => {
  const featureList = [
    {
      src: "/Support.svg",
      title: "Product Support",
      description: "Up to 3 years on-site warranty available for your peace of mind.",
    },
    {
      src: "/Account.svg",
      title: "Personal Account",
      description: "With big discounts, free delivery and a dedicated support specialist.",
    },
    {
      src: "/Saving.svg",
      title: "Amazing Savings",
      description: "Up to 70% off new Products, you can be sure of the best price.",
    },
  ];

  return (
    <section className="container-xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-20">
        {featureList.map((item, index) => (
          <Card key={index} className="border-0 shadow-none text-center group">
            <CardContent className="flex flex-col items-center pt-6">
              <div className="bg-primary rounded-full flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-105">
                <img src={item.src} alt={item.title} />
              </div>
              <h3 className="text-lg font-bold mb-2">{item.title}</h3>
              <p className="text-sm leading-[140%] text-muted-foreground">{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default memo(Features);

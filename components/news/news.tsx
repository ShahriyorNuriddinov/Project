import { memo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const News = () => {
  const newsItems = [
    { src: "/news1.png", description: "If you've recently made a desktop PC or laptop purchase, you might want to consider adding peripherals to enhance your home office setup, your gaming rig, or your business workspace...", date: "01.09.2020" },
    { src: "/news2.png", description: "As a gamer, superior sound counts for a lot. You need to hear enemies tiptoeing up behind you for a sneak attack or a slight change in the atmospheric music signaling a new challenge or task...", date: "15.09.2020" },
    { src: "/news3.png", description: "If you've recently made a desktop PC or laptop purchase, you might want to consider adding peripherals to enhance your home office setup, your gaming rig, or your business workspace...", date: "01.09.2020" },
    { src: "/news4.png", description: "If you've recently made a desktop PC or laptop purchase, you might want to consider adding peripherals to enhance your home office setup, your gaming rig, or your business workspace...", date: "15.09.2020" },
    { src: "/news5.png", description: "If you've recently made a desktop PC or laptop purchase, you might want to consider adding peripherals to enhance your home office setup, your gaming rig, or your business workspace...", date: "01.09.2020" },
    { src: "/news6.png", description: "If you've recently made a desktop PC or laptop purchase, you might want to consider adding peripherals to enhance your home office setup, your gaming rig, or your business workspace...", date: "15.09.2020" },
    { src: "/news7.png", description: "If you've recently made a desktop PC or laptop purchase, you might want to consider adding peripherals to enhance your home office setup, your gaming rig, or your business workspace...", date: "01.09.2020" },
    { src: "/news8.png", description: "If you've recently made a desktop PC or laptop purchase, you might want to consider adding peripherals to enhance your home office setup, your gaming rig, or your business workspace...", date: "15.09.2020" },
    { src: "/news9.png", description: "If you've recently made a desktop PC or laptop purchase, you might want to consider adding peripherals to enhance your home office setup, your gaming rig, or your business workspace...", date: "01.09.2020" },
  ];

  return (
    <div className="container cursor-pointer">
      <h2 className="text-xl font-semibold mb-6">Follow us on Instagram for News, Offers & More</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {newsItems.map((item, index) => (
          <Card key={index} className="border-0 shadow-none hover:shadow-sm transition-shadow rounded-lg overflow-hidden">
            <CardContent className="p-0 flex flex-col h-full">
              <div className="w-full h-45 overflow-hidden">
                <img src={item.src} alt="News" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-2 flex flex-col flex-1">
                <p className="font-normal text-xs text-foreground">{item.description}</p>
                <span className="text-xs text-muted-foreground mt-2 text-center">{item.date}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default memo(News);

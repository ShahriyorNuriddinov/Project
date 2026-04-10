import Support from "@/components/support/support";
import BannerSlider from "@/components/swiper/banner";
import Save from "@/components/save/save";
export default function ProductDetailLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div >
            {children}
            <BannerSlider />
            <Support/>
            <Save/>
        </div>
    );
}

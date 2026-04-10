import Image from "next/image";
import { Badge } from "@/components/ui/badge";

const ZipBanner = () => {
  return (
    <div className="w-full bg-muted py-3">
      <div className="container flex items-center justify-center gap-3">
        <Image src="/zip.png" alt="" width={40} height={40} className="object-contain" />
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">own</span> it now, up to 6 months interest free
          <a href="#" className="underline hover:text-primary transition-colors">
            learn more
          </a>
        </p>
      </div>
    </div>
  );
};

export default ZipBanner;

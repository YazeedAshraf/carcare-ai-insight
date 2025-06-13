
import { Car, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-500 p-2 rounded-lg">
              <Car className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold">CarCare AI</span>
          </div>
          <p className="text-slate-400 text-center max-w-md">
            Empowering car owners with AI-driven automotive insights and recommendations.
          </p>
          <div className="flex items-center space-x-1 text-slate-400">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-400" />
            <span>by the CarCare AI Team</span>
          </div>
          <div className="text-sm text-slate-500">
            © 2024 CarCare AI. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

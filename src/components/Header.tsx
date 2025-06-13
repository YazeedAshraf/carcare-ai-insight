
import { Car } from "lucide-react";

const Header = () => {
  return (
    <header className="w-full bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-500 p-2 rounded-lg">
              <Car className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">CarCare AI</h1>
              <p className="text-sm text-slate-600 hidden sm:block">Type your car problem — let AI do the rest.</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

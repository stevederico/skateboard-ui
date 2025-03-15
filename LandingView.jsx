import constants from "@/constants.json";

import { DynamicIcon } from "lucide-react/dynamic";
export default function LandingView() {
  return (
    <div className="flex flex-col bg-white h-screen">
      <header className="py-2 ">
        <div className="flex items-center m-2 mx-auto">
            <div className="bg-app rounded-lg flex items-center justify-center ml-3 w-8 h-8">
              <DynamicIcon name={constants.appIcon} size={18} color="white" strokeWidth={2} />
            </div>
            <div className="font-semibold ml-2 text-2xl text-gray-700">{constants.appName}</div>
          </div>
      </header>
      <main className="py-24 md:py-48 bg-app">
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-center tracking-tight font-bold text-5xl md:text-7xl mb-10 text-white">{constants.tagline}</h1>
          <a href={'/app'} target="_blank" className="mx-auto bg-white font-medium text-app shadow-sm rounded-3xl px-4 md:px-8 py-4 cursor-pointer">
            Get Started
          </a>
        </div>
      </main>
      <footer className="py-4 mx-3">
        <div className="flex gap-3 text-gray-500 hover:text-gray-600 cursor-pointer">
          <div className="mr-auto">&copy; {new Date().getFullYear()} {constants.companyName}</div>
          <a href={'/privacy'} target="_blank">Privacy</a>
          <a href={'/terms'} target="_blank">Terms</a>
          <a href={'/eula'} target="_blank" className="mr-3">EULA</a>
        </div>

      </footer>
    </div>
  )
}

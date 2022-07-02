import { GlobeIcon } from "@heroicons/react/solid";

export default function LoadingScreen() {
  return (
    <div className="fixed h-full w-full top-0 left-0 bg-white z-50 opacity-70">
      <div className="flex h-full w-full items-center justify-center">
        <GlobeIcon className="w-8 h-8 text-gray-700 animate-bounce" />
      </div>
    </div>
  );
}

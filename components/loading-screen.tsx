import { GlobeIcon } from "@heroicons/react/solid";

export default function LoadingScreen() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <GlobeIcon className="w-8 h-8 text-gray-600 animate-bounce" />
    </div>
  );
}

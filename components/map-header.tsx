import { MapIcon } from "@heroicons/react/solid";

export default function MapHeader({ communityName }) {
  return (
    <div className="fixed left-5 top-5 z-20 text-gray-700">
      <div className="flex justify-center items-center gap-2">
        <MapIcon className="text-red-500 h-8 w-8 opacity-90" />
        <h1>
          Harta Diasporei din <span className="font-bold">{communityName}</span>
        </h1>
      </div>
    </div>
  );
}

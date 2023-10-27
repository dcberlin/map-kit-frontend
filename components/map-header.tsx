import { MapIcon } from "@heroicons/react/solid";
import Image from "next/image";
import Link from "next/link";
import { Community } from "../models";

interface MapHeaderProps {
  community?: Community;
  inAdminScreen?: boolean;
}

const MapHeader = ({ community, inAdminScreen }: MapHeaderProps) => (
  <div className="fixed left-6 top-9 text-gray-700 z-40">
    <div className="flex justify-center items-center gap-2">
      <Image
        src="/logo-dcb.png"
        alt="Logo al Harta Diasporei"
        width={50}
        height={50}
      />
      <h1>
        <Link href="/">
          <span className="hover:text-red-400">Harta Diasporei</span>
        </Link>
        {inAdminScreen && (
          <>
            &nbsp;&#187;&nbsp;
            <Link href={"/my-communities"}>
              <span className="hover:text-red-400">Admin</span>
            </Link>
          </>
        )}
        {community &&
          (!inAdminScreen ? (
            <>
              <span> din </span>
              <Link href={"/" + community.path_slug}>
                <span className="font-bold hover:text-orange-500">
                  {community.name}
                </span>
              </Link>
            </>
          ) : (
            <>
              &nbsp;&#187;&nbsp;
              <Link href={"/" + community.path_slug}>
                <span className="font-bold hover:text-orange-500">
                  {community.name}
                </span>
              </Link>
            </>
          ))}
      </h1>
    </div>
  </div>
);

export default MapHeader;

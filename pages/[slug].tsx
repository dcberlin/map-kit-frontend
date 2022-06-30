import React from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { GlobeIcon, MapIcon } from "@heroicons/react/solid";

import MapWidget from "../components/map";

export default function CommunityMap({ locations, community }) {
  return (
    <>
      <div>
        <div className="fixed left-5 top-5 z-10 text-gray-700">
          <div className="flex justify-center items-center gap-2">
            <MapIcon className="text-red-500 h-8 w-8 opacity-90" />
            <h1>
              Harta Diasporei din{" "}
              <span className="font-bold">{community.name}</span>
            </h1>
          </div>
        </div>
        <MapWidget locations={locations} bbox={community.bbox} />
      </div>
    </>
  );
}

export async function getStaticProps({ params }) {
  const locRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/locations/?community__path_slug=${params.slug}`
  );
  const locations = await locRes.json();

  const comRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/communities/?path_slug=${params.slug}`
  );
  const [community] = await comRes.json();

  return {
    props: {
      locations,
      community,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/communities`
  );
  const communities = await res.json();

  const paths = communities.map((community) => ({
    params: {
      slug: community.path_slug.toString(),
    },
  }));

  return { paths, fallback: "blocking" };
}

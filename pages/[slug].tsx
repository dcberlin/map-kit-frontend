import React from "react";
import { useRouter } from "next/router";
import useSWR from "swr";

import MapWidget from "../components/map-widget";
import MapHeader from "../components/map-header";
import PoiDrawer from "../components/poi-drawer";
import { PoiProvider, SelectedPoiProvider } from "../context";

export default function CommunityMap({ locations, community }) {
  return (
    <PoiProvider>
      <SelectedPoiProvider>
        <MapHeader communityName={community.name} />
        <PoiDrawer />
        <MapWidget locations={locations} bbox={community.bbox} />
      </SelectedPoiProvider>
    </PoiProvider>
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

import React from "react";
import { useRouter } from "next/router";
import useSWR from "swr";

import FilterDrawer from "../components/filter-drawer";
import ListDrawer from "../components/list-drawer";
import MapWidget from "../components/map-widget";
import MapHeader from "../components/map-header";
import PoiDrawer from "../components/poi-drawer";
import { usePois, useSelectedCategory } from "../context";
import ErrorScreen from "../components/error-screen";

export default function CommunityMap({ community, categories }) {
  const [pois, setPois] = usePois();
  const [selectedCategory, setSelectedCategory] = useSelectedCategory();

  const { locations, error } = useSWR(
    `${
      process.env.NEXT_PUBLIC_API_BASE_URL
    }/api/locations/?community__path_slug=${community.path_slug}&category=${
      selectedCategory?.pk ?? ""
    }`,
    async (url) => {
      const locRes = await fetch(url);
      const locations = await locRes.json();
      setPois(locations);
    }
  );
  if (error) {
    console.log(error);
    return <ErrorScreen />;
  }

  return (
    <>
      <MapHeader communityName={community.name} />

      {/* Right edge drawers */}
      <div className="fixed right-0 bottom-1/3 z-20">
        <div className="flex flex-col gap-2">
          <FilterDrawer categories={categories} />
          <ListDrawer />
          {/* Add further drawers here. */}
        </div>
      </div>

      {/* Bottom drawer */}
      <PoiDrawer />

      <MapWidget bbox={community.bbox} />
    </>
  );
}

export async function getStaticProps({ params }) {
  const catRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/categories/`
  );
  const categories = await catRes.json();

  const comRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/communities/?path_slug=${params.slug}`
  );
  const [community] = await comRes.json();

  return {
    props: {
      community,
      categories,
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

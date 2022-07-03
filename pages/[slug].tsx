import React from "react";
import useSWR from "swr";
import { useRouter } from "next/router";

import FilterDrawer from "../components/filter-drawer";
import ListDrawer from "../components/list-drawer";
import MapWidget from "../components/map-widget";
import MapHeader from "../components/map-header";
import PoiDrawer from "../components/poi-drawer";
import SearchDrawer from "../components/search-drawer";
import LocationProposalModal from "../components/location-proposal-modal";
import ErrorScreen from "../components/error-screen";
import { useDebounce } from "../hooks";
import { usePois, useSelectedCategory, useSearchPhrase } from "../context";

/**
 * Public community map page.
 */
export default function CommunityMap({ community, categories }) {
  const [pois, setPois] = usePois();
  const [selectedCategory, setSelectedCategory] = useSelectedCategory();
  const [searchPhrase, setSearchPhrase] = useSearchPhrase();
  const debouncedSearchPhrase = useDebounce(searchPhrase, 500);

  const { error } = useSWR(
    `${
      process.env.NEXT_PUBLIC_API_BASE_URL
    }/api/locations/?community__path_slug=${community.path_slug}&category=${
      selectedCategory?.pk ?? ""
    }&search=${debouncedSearchPhrase ?? ""}`,
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
          <SearchDrawer />
          <ListDrawer />
          <LocationProposalModal communityPk={community.pk} />
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

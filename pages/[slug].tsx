import React from "react";
import useSWR from "swr";
import CategoriesDrawer from "../components/categories-drawer";
import LocationsListDrawer from "../components/locations-list-drawer";
import MapWidget from "../components/map-widget";
import MapHeader from "../components/map-header";
import LocationDrawer from "../components/poi-drawer";
import SearchDrawer from "../components/search-drawer";
import LocationProposalModal from "../components/location-proposal-modal";
import ErrorScreen from "../components/error-screen";
import {useDebounce} from "../hooks";
import {usePois, useSearchPhrase, useSelectedCategory} from "../context";
import {URLS} from "../api";
import {GetServerSideProps} from "next";
import {Community, LocationCategory} from "../models";

interface CommunityMapProps {
  community: Community;
  categories: LocationCategory[];
}

/**
 * Public community map page.
 */
export default function CommunityMap({community, categories}: CommunityMapProps) {
  const [_, setPois] = usePois();
  const [selectedCategory] = useSelectedCategory();
  const [searchPhrase] = useSearchPhrase();
  const debouncedSearchPhrase = useDebounce(searchPhrase, 500);

  const {error} = useSWR(
    `${URLS.LOCATIONS}?community__path_slug=${community.path_slug}&category=${
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
    return <ErrorScreen/>;
  }

  return (
    <>
      <MapHeader community={community} />

      {/* Right edge drawers */}
      <div className="fixed right-0 bottom-1/3 z-20">
        <div className="flex flex-col gap-2">
          <CategoriesDrawer categories={categories} />
          <SearchDrawer locations={undefined} bbox={undefined} />
          <LocationsListDrawer />
          <LocationProposalModal communityPk={community.pk} />
        </div>
      </div>

      <LocationDrawer categories={categories} community={community} />

      <MapWidget bbox={community.bbox} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({params, res}) => {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  )

  const catRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/categories/`
  );
  const categories = await catRes.json();

  const comRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/communities/?path_slug=${params.slug}`
  );
  const [community] = await comRes.json();

  if (!community) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      community,
      categories,
    },
  };
}

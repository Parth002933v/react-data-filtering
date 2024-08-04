import { useInfiniteQuery, useSuspenseInfiniteQuery, useSuspenseQuery } from "@tanstack/react-query";
import { getPagginatedStores, Stores } from "../../queries/getStores";
import StoreCard from "./store-card";
import { getRouteApi } from "@tanstack/react-router";
import { useInView } from "react-intersection-observer";
import { Fragment, useEffect } from "react";
import Filtering from "./filtering";
import axios from "axios";


import { storeFilterSchema } from './../../routes/_category.index'
import { z } from "zod";


type storeFilter = z.infer<typeof storeFilterSchema>

// const route = getRouteApi('/_category/category')
export default function AllStores({ searchQuery, category }: { searchQuery: storeFilter, category?: string }) {
  const { cashback_enabled, _sort, nameSearch, Alphabetical } = searchQuery

  // const { data: stores } = useSuspenseQuery(getStores)

  // const { data: storess, fetchNextPage, isFetchingNextPage} = useSuspenseInfiniteQuery(getPagginatedStores)
  const {
    data: storess,
    fetchNextPage,
    isFetchingNextPage

  } = getPagginatedStores({ queryKey: ["GET_PAGGINATE", cashback_enabled, _sort, nameSearch, category, Alphabetical] })


  const { ref, inView } = useInView()

  useEffect(() => {
    if (inView) {

      fetchNextPage()
    }
  }, [fetchNextPage, inView])

  return (
    <div >
      {storess.pages.map((m) => (
        <div key={m.nextPage}>
          <div className="grid grid-cols-3 gap-1 mt-1">
            {m.data.map((store) => <StoreCard key={store.id} store={store} />)}
          </div>

          < div ref={ref} className="mt-1">
            {isFetchingNextPage &&
              (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-10 animate-spin fill-blue-600 block mx-auto"
                  viewBox="0 0 24 24">
                  <path
                    d="M12 22c5.421 0 10-4.579 10-10h-2c0 4.337-3.663 8-8 8s-8-3.663-8-8c0-4.336 3.663-8 8-8V2C6.579 2 2 6.58 2 12c0 5.421 4.579 10 10 10z"
                    data-original="#000000" />
                </svg>
              )}
          </div>
        </div>
      )
      )}

    </div >

  );
};
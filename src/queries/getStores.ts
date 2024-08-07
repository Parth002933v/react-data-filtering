import { infiniteQueryOptions, useSuspenseInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

// export const getStores = queryOptions({
//     queryKey: ["GET_STORES"],
//     queryFn: async () => {
//         const stores: Stores = await (await fetch("http://localhost:3001/stores")).json()
//         return stores
//     }
// })


//*============================================================
// export const getStores2 = infiniteQueryOptions({
//     queryKey: ["Stores"],
//     queryFn: async ({ pageParam }) => {
// const stores: Stores = await (await fetch(`http://localhost:3001/stores?_page=${pageParam}`)).json()

// return {
//     data: stores,
//     nextPage: stores > 0 ? pageParam + 1 : undefined,
// }
//     },
//     getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
// })



// const route = getRouteApi('/_store/')



export function getPagginatedStoress({ queryKey }: { queryKey: (string | number | undefined)[] }) {

    return infiniteQueryOptions({
        queryKey: queryKey,
        
        // staleTime: 0,
        queryFn: async ({ pageParam, queryKey }) => {
            const [_, cashback_enabled, _sort, nameSearch, category, Alphabetical, status] = queryKey

            const filterParams = new URLSearchParams();
            if (cashback_enabled) filterParams.append("cashback_enabled", cashback_enabled.toString())
            if (_sort) { filterParams.append("_sort", _sort.toString()), filterParams.append("_order", "desc") }
            if (nameSearch) filterParams.append("name_like", nameSearch.toString())
            if (category) filterParams.append("cats", category.toString())
            if (Alphabetical) filterParams.append("name_like", Alphabetical.toString())
            if (status) filterParams.append("status", status.toString())

            await new Promise((resolve) => setTimeout(resolve, 500)); // simulate delay

            const stores: Stores = await ((await axios.get(`http://localhost:3001/stores?_page=${pageParam}&_limit=18&${filterParams}`)).data)

            return {
                data: stores,
                nextPage: stores.length > 0 ? pageParam + 1 : null,
            }
        },
        initialPageParam: 1,
        getNextPageParam: (lastpage) => lastpage.nextPage,
    })
}


// export const getPagginatedStores = () => useSuspenseInfiniteQuery()






export type Stores = StoreType[]

export interface StoreType {
    id: number
    name: string
    slug: string
    logo: string
    homepage: string
    cats?: number
    cashback_enabled: number
    cashback_percent: number
    cashback_amount: number
    cashback_type: string
    amount_type: string
    rate_type: string
    is_claimable: number
    is_shareable: number
    is_featured: number
    is_promoted: number
    visits: number
    offers_count: number
    rating: number
    rating_count: number
    clicks: number
    status: string
    created_at: string
    updated_at: string
}


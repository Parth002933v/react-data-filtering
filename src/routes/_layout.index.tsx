import { createFileRoute } from '@tanstack/react-router'

import AllStoresOutlet from '../Components/store/AllStores'
import { getPagginatedStoress } from '../queries/getStores'
import { storeFilterSchema } from './_layout'

export const Route = createFileRoute('/_layout/')({
  component: Stores,
  validateSearch: (search) => storeFilterSchema.parse(search),
  beforeLoad: ({ search, context: { queryClient } }) => {
    const { cashback_enabled, _sort, nameSearch, Alphabetical, status } = search

    // return
    return queryClient.prefetchInfiniteQuery(getPagginatedStoress({
      queryKey: ["GET_PAGGINATE", cashback_enabled, _sort, nameSearch, undefined, Alphabetical, status]
    }))
  },

  // loader: ({ preload }) => {
  //   return { hy: "awd" }
  // }


})



function Stores() {

  const searchQuery = Route.useSearch()

  const d = Route.useLoaderData()


  return <AllStoresOutlet searchQuery={searchQuery} />
  // return <AllStoresOutlet />
}
import { createFileRoute } from '@tanstack/react-router'
import AllStoresOutlet from '../Components/store/AllStores'
import { storeFilterSchema } from './_layout'
import { getPagginatedStoress } from '../queries/getStores'

export const Route = createFileRoute('/_layout/category/$id')({
  component: CategoryByID,
  validateSearch: (search) => storeFilterSchema.parse(search),

  beforeLoad: ({ search, params, context: { queryClient } }) => {

    const { cashback_enabled, _sort, nameSearch, Alphabetical, status } = search

    const category = params.id

    return queryClient.prefetchInfiniteQuery(getPagginatedStoress({
      queryKey: ["GET_PAGGINATE", cashback_enabled, _sort, nameSearch, category, Alphabetical, status]
    }))
  },
})


function CategoryByID() {

  const searchQuery = Route.useSearch()
  const { id } = Route.useParams()


  return <AllStoresOutlet searchQuery={searchQuery} category={id} />
}
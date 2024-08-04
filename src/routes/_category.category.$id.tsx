import { createFileRoute } from '@tanstack/react-router'
import AllStoresOutlet from '../Components/store/AllStores'
import { storeFilterSchema } from './_category.index'




export const Route = createFileRoute('/_category/category/$id')({
  validateSearch: (search) => storeFilterSchema.parse(search),
  component: allStoresOutlet
})

function allStoresOutlet() {

  const searchQuery = Route.useSearch()

  const { id } = Route.useParams()


  return <AllStoresOutlet searchQuery={searchQuery} category={id} />
}
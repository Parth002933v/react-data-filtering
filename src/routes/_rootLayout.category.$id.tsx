import { createFileRoute } from '@tanstack/react-router'
import AllStoresOutlet from '../Components/store/AllStores'
import { storeFilterSchema } from './_rootLayout'

export const Route = createFileRoute('/_rootLayout/category/$id')({
  component: CategoryByID,
  validateSearch: (search) => storeFilterSchema.parse(search),

})


function CategoryByID() {

  const searchQuery = Route.useSearch()
  const { id } = Route.useParams()

  console.log("id:", id);

  return <AllStoresOutlet searchQuery={searchQuery} category={id} />
}
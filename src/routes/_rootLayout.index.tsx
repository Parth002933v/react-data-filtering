import { createFileRoute } from '@tanstack/react-router'

import AllStoresOutlet from '../Components/store/AllStores'

export const Route = createFileRoute('/_rootLayout/')({
  component: Stores,
})



function Stores() {

  const searchQuery = Route.useSearch()

  return <AllStoresOutlet searchQuery={searchQuery} />
}
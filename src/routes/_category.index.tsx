import { createFileRoute } from '@tanstack/react-router'
import AllStoresOutlet from '../Components/store/AllStores'


import { z } from 'zod'

export const storeFilterSchema = z.object({
  _sort: z.string().min(1).optional(),
  cashback_enabled: z.number().catch(0).optional(),
  nameSearch: z.string().catch("").optional(),
  Alphabetical: z.string().catch("").optional()
  // is_promoted: z.number().min(0).max(1).catch(0).optional(),
  // is_sharable: z.number().min(0).max(1).catch(0).optional(),

  //todo: status{active: publish, coming soon : draft, discontinue: trash}
  // name_like: z.string().catch(" ").optional()
})

export const Route = createFileRoute('/_category/')({
  component: Stores,

  validateSearch: (search) => storeFilterSchema.parse(search),
  // loader: async ({ context: { queryClient } }) => {
  //   return queryClient.ensureQueryData(getStores)
  // },
})


function Stores() {

  const searchQuery = Route.useSearch()

  return <AllStoresOutlet searchQuery={searchQuery} />
}
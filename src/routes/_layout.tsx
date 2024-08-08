import { createFileRoute, Outlet } from '@tanstack/react-router'
// import StoreLayout from '../Components/store/index'
import Header from '../Components/store/header'
import { Categories } from '../Components/store/Categories'
import Filtering from '../Components/store/filtering'



import { z } from 'zod'
import { getCategories } from '../queries/getCategories'

export const storeFilterSchema = z.object({
  _sort: z.string().min(1).optional(),
  cashback_enabled: z.number().catch(0).optional(),
  nameSearch: z.string().catch("").optional(),
  Alphabetical: z.string().catch("").optional(),
  status: z.string().catch("publish").optional(),
  // is_promoted: z.number().min(0).max(1).catch(0).optional(),
  // is_sharable: z.number().min(0).max(1).catch(0).optional(),
})

export type storeFilterType = z.infer<typeof storeFilterSchema>


export const Route = createFileRoute('/_layout')({
  component: CategoryLayout,
  loader: ({ context: { queryClient } }) => queryClient.prefetchQuery(getCategories),
  validateSearch: (search) => storeFilterSchema.parse(search),

})


export function CategoryLayout() {

  const navigate = Route.useNavigate();
  const serach = Route.useSearch()

  return <>
    <div className="py-10">
      <Header />
      <main className="mx-auto grid grid-cols-3 grid-flow-col max-w-7xl sm:px-6 lg:px-8">
        <Categories />

        {/* all store */}
        <div className={`rounded-lg col-span-2 min-h-4 pl-5 my-[50px]`}>
          <Filtering useNavigate={navigate} useSearch={serach} />
          <Outlet />
        </div>

      </main>
    </div></>
}




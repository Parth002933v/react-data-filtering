import { createFileRoute } from '@tanstack/react-router'
import StoreLayout from '../Components/store'
import { getCategories } from '../queries/getCategories'

export const Route = createFileRoute('/_category')({
  // loader: async ({ context: { queryClient } }) => {
  //   return queryClient.ensureQueryData(getCategories)
  // },
  component: StoreLayout
})

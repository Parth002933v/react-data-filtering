import { queryOptions } from "@tanstack/react-query";

export const getCategories = queryOptions({
    queryKey: ["GET_CATEGORIES"],
    queryFn: async () => {
        const categories: Categories = await (await fetch("http://localhost:3001/categories")).json()
        return categories
    },

})


export type Categories = Category[]

interface Category {
    id: number
    name: string
    slug: string
    parent_id?: number
    icon?: string
    is_featured: number
    visits: number
    store_count: number
    created_at: string
    updated_at: string
}

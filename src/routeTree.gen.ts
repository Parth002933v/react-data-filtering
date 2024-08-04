/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as CategoryImport } from './routes/_category'
import { Route as CategoryIndexImport } from './routes/_category.index'
import { Route as CategoryCategoryIdImport } from './routes/_category.category.$id'

// Create/Update Routes

const CategoryRoute = CategoryImport.update({
  id: '/_category',
  getParentRoute: () => rootRoute,
} as any)

const CategoryIndexRoute = CategoryIndexImport.update({
  path: '/',
  getParentRoute: () => CategoryRoute,
} as any)

const CategoryCategoryIdRoute = CategoryCategoryIdImport.update({
  path: '/category/$id',
  getParentRoute: () => CategoryRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_category': {
      id: '/_category'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof CategoryImport
      parentRoute: typeof rootRoute
    }
    '/_category/': {
      id: '/_category/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof CategoryIndexImport
      parentRoute: typeof CategoryImport
    }
    '/_category/category/$id': {
      id: '/_category/category/$id'
      path: '/category/$id'
      fullPath: '/category/$id'
      preLoaderRoute: typeof CategoryCategoryIdImport
      parentRoute: typeof CategoryImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  CategoryRoute: CategoryRoute.addChildren({
    CategoryIndexRoute,
    CategoryCategoryIdRoute,
  }),
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_category"
      ]
    },
    "/_category": {
      "filePath": "_category.tsx",
      "children": [
        "/_category/",
        "/_category/category/$id"
      ]
    },
    "/_category/": {
      "filePath": "_category.index.tsx",
      "parent": "/_category"
    },
    "/_category/category/$id": {
      "filePath": "_category.category.$id.tsx",
      "parent": "/_category"
    }
  }
}
ROUTE_MANIFEST_END */

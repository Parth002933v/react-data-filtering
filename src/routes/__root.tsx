import { createRootRoute, createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import NavBar from '../Components/Navbar'
import { QueryClient } from '@tanstack/react-query'

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
    component: RootComponent
})


function RootComponent() {
    return <div className='w-full h-full'>
        <NavBar />
        <Outlet />
        {/* <TanStackRouterDevtools /> */}
    </div>

}
import Categories from './Categories'
import { Outlet } from '@tanstack/react-router'
import Header from './header'
import Filtering from './filtering'

export default function Index() {

    return (
        <div className="py-10">
            <Header />
            <main className="mx-auto grid grid-cols-3 grid-flow-col max-w-7xl sm:px-6 lg:px-8">
                <Categories />

                {/* all store */}
                {/* <Outlet /> */}
                <div className={`rounded-lg col-span-2 min-h-4 pl-5 my-[50px]`}>
                    <Filtering />
                    <Outlet />
                </div>
                {/* <AllStoresOutlet /> */}
            </main>
        </div>
    )
}

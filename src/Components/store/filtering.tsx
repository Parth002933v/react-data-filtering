import React, { FormEvent, Fragment, useEffect, useRef } from 'react'

import { Checkbox, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { useState } from 'react'
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { Link, UseNavigateResult } from '@tanstack/react-router';
import { storeFilterType } from '../../routes/_layout';

type sortByType = {
    id: string
    name: string
}

const sortByList: sortByType[] = [
    { id: "name", name: 'Name' },
    { id: "is_featured", name: 'Featured' },
    { id: "clicks", name: 'Popularity' },
    { id: "cashback_amount", name: 'Cashback' }
]
const sortByStatusList: sortByType[] = [
    { id: "publish", name: 'active' },
    { id: "draft", name: 'comming soon' },
    { id: "trash", name: 'disconinued' },
]

const alphabets = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
alphabets.unshift("All");

export default function Filtering({ useNavigate, useSearch }: { useNavigate: UseNavigateResult<"">, useSearch: storeFilterType }) {

    const [selectedSorting, setSelectedSort] = useState<sortByType | null>(null);
    const [selectedStatusFilter, setStatusFilter] = useState<sortByType | null>(null);
    const [enabled, setEnabled] = useState(false)

    const ref = useRef<HTMLInputElement>(null)

    const navigate = useNavigate
    const serach = useSearch.Alphabetical?.split("^")[1];

    function handleSerach(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        navigate({ search: (prev) => ({ ...prev, nameSearch: ref.current?.value ? ref.current.value : undefined }) })
    }

    useEffect(() => {
        navigate({
            search: (prev) => ({
                ...prev,
                _sort: selectedSorting == null ? undefined : selectedSorting.id,
                status: selectedStatusFilter == null ? undefined : selectedStatusFilter.id,
                cashback_enabled: enabled ? 1 : undefined
            }),
        })
    }, [selectedSorting, selectedStatusFilter, enabled])

    return (
        <>
            <div className="flex w-full justify-between">
                <form onSubmit={handleSerach}>
                    <input ref={ref} placeholder="Search store" className="border border-black drop-shadow-lg rounded-lg text-sm text-gray-500 px-3 py-1 mb-1" />
                </form>

                {/* Sort by */}
                <FilterByStatus selectedStatusFilter={selectedStatusFilter} setStatusFilter={setStatusFilter} />
                <SortBy selectedSorting={selectedSorting} setSelectedSort={setSelectedSort} />

            </div>

            <div className='flex flex-auto items-center gap-2  '>
                <CheckBox enabled={enabled} setEnabled={setEnabled} />
            </div>

            {/* alphabets */}
            <div className='flex w-full font-serif  text-sm my-2 py-2'>
                <AlphabetSort serach={serach} />
            </div>


        </>
    )
}



function SortBy({ selectedSorting, setSelectedSort }: { selectedSorting: sortByType | null, setSelectedSort: React.Dispatch<React.SetStateAction<sortByType | null>> }) {

    return <div className='flex gap-2 text-sm'>
        <div className=" content-center">Sort by: </div>

        <Listbox value={selectedSorting == null ? sortByList[0] : selectedSorting} onChange={setSelectedSort}>
            {({ open }) => (
                <>
                    <div className="relative mt-1">
                        <ListboxButton className=" relative w-32 text-sm bg-white border border-gray-300 rounded-lg shadow-sm hover:cursor-pointer hover:drop-shadow pl-3 pr-7 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500">
                            <span className="block truncate">{selectedSorting == null ? sortByList[0].name : selectedSorting.name}</span>
                            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                {open ? <ChevronUpIcon className="w-3 h-3" /> : <ChevronDownIcon className="w-3 h-3" />}
                            </span>
                        </ListboxButton>

                        <ListboxOptions className="absolute z-10 mt-1 text-sm w-full bg-white shadow-lg max-h-60 rounded-md py-1  ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none">

                            {sortByList.map(person => (

                                <ListboxOption key={person.id} className={({ selected }) => `cursor-pointer  select-none relative py-2 pl-10 pr-4 ${selected ? 'text-white bg-gray-500' : 'text-gray-900'} hover:bg-gray-500 hover:text-white`} value={person}>
                                    {({ selected }) => (
                                        <>
                                            <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                                {person.name}
                                            </span>

                                            {selected ? (
                                                <span className={`absolute inset-y-0 left-0 flex items-center pl-3 ${selected ? 'text-white' : 'text-indigo-600'}`}>
                                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                </span>
                                            ) : null}
                                        </>
                                    )}
                                </ListboxOption>
                            ))}

                        </ListboxOptions>
                    </div>
                </>
            )}
        </Listbox>


    </div>

}


function FilterByStatus({ selectedStatusFilter, setStatusFilter }: { selectedStatusFilter: sortByType | null, setStatusFilter: React.Dispatch<React.SetStateAction<sortByType | null>> }) {

    return <div className='flex gap-2 text-sm'>
        <div className=" content-center">Filter by Status: </div>

        <Listbox value={selectedStatusFilter == null ? sortByStatusList[0] : selectedStatusFilter} onChange={setStatusFilter}>
            {({ open }) => (
                <>
                    <div className="relative mt-1">
                        <ListboxButton className=" relative w-32 text-sm bg-white border border-gray-300 rounded-lg shadow-sm hover:cursor-pointer hover:drop-shadow pl-3 pr-7 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500">
                            <span className="block truncate">{selectedStatusFilter == null ? sortByStatusList[0].name : selectedStatusFilter.name}</span>
                            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                {open ? <ChevronUpIcon className="w-3 h-3" /> : <ChevronDownIcon className="w-3 h-3" />}
                            </span>
                        </ListboxButton>

                        <ListboxOptions className="absolute z-10 mt-1 text-sm w-full bg-white shadow-lg max-h-60 rounded-md py-1  ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none">

                            {sortByStatusList.map(person => (

                                <ListboxOption key={person.id} className={({ selected }) => `cursor-pointer  select-none relative py-2 pl-10 pr-4 ${selected ? 'text-white bg-gray-500' : 'text-gray-900'} hover:bg-gray-500 hover:text-white`} value={person}>
                                    {({ selected }) => (
                                        <>
                                            <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                                {person.name}
                                            </span>

                                            {selected ? (
                                                <span className={`absolute inset-y-0 left-0 flex items-center pl-3 ${selected ? 'text-white' : 'text-indigo-600'}`}>
                                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                </span>
                                            ) : null}
                                        </>
                                    )}
                                </ListboxOption>
                            ))}

                        </ListboxOptions>
                    </div>
                </>
            )}
        </Listbox>


    </div>

}

function CheckBox({ enabled, setEnabled }: { enabled: boolean, setEnabled: React.Dispatch<React.SetStateAction<boolean>> }) {
    return <Fragment>
        <Checkbox checked={enabled} onChange={setEnabled} className="group block size-4 rounded border bg-white data-[checked]:bg-blue-500">
            <svg className="stroke-white opacity-0 group-data-[checked]:opacity-100" viewBox="0 0 14 14" fill="none">
                <path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </Checkbox>
        <div className='text-sm'>Show Stores With Cashback</div>
    </Fragment>
}

function AlphabetSort({ serach }: { serach: string | undefined }) {
    return <>
        {alphabets.map((a) => <>
            {
                a == "All"
                    ? <Link search={(prev) => ({ ...prev, Alphabetical: undefined })} className='border-b-2 px-1 border-transparent hover:border-b-2 hover:border-black duration-200 cursor-pointer'>
                        {a}
                    </Link>
                    : <Link search={(prev) => ({ ...prev, Alphabetical: `^${a}` })} className={`border-b-2 ${serach == a ? "font-bold border-black" : "border-transparent"}  px-1  hover:border-b-2 hover:border-black duration-200 cursor-pointer`}>
                        {a}
                    </Link>
            }
        </>

        )}</>

}
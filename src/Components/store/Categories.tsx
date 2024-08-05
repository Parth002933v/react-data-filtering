import { useSuspenseQuery } from "@tanstack/react-query";
import { getCategories } from "../../queries/getCategories";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { Link } from "@tanstack/react-router";


export default function Categories() {

  const { data: categories } = useSuspenseQuery(getCategories)


  const getParentCategories = () => {
    return categories.filter(category => category.parent_id === null);
  };

  const getChildCategories = (parentId: number) => {
    return categories.filter(category => category.parent_id === parentId);
  };

  return (
    <div className={`bg-white drop-shadow-2xl min-h-4 my-[50px] w-full max-w-md p-2 mx-auto rounded-2xl`}>
      {
        getParentCategories().length == 0
          ? <div>No category found</div>
          : getParentCategories().map(parentCategory => (
            <>
              {
                getChildCategories(parentCategory.id).length == 0 ?
                  // if no childern found 
                  <Link to="/category/$id" activeProps={{ className: "bg-gray-200" }} params={{ id: parentCategory.id.toString() }} mask={{ to: `/category/${parentCategory.name}`, unmaskOnReload: true }} key={parentCategory.id} className={`flex justify-between w-full px-4 py-2 text-sm font-medium text-left rounded-lg hover:bg-gray-200 focus:outline-none hover:cursor-pointer focus-visible:ring focus-visible:ring-black focus-visible:ring-opacity-75`}>
                    <span>{parentCategory.name}</span>
                  </Link> :

                  // category with childern
                  <Disclosure key={parentCategory.id}>
                    {({ open }) => (
                      <>
                        <DisclosureButton className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left rounded-lg hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-black focus-visible:ring-opacity-75">
                          <span>{parentCategory.name}</span>
                          {open ? <ChevronUpIcon className="w-5 h-5" /> : <ChevronDownIcon className="w-5 h-5" />}
                        </DisclosureButton>

                        <DisclosurePanel className="pb-2 text-sm text-gray-500">
                          <div className="bg-gray-50 rounded-lg">


                            {getChildCategories(parentCategory.id).map(childCategory => (
                              <Link to="/category/$id" activeProps={{ className: "bg-gray-200" }} params={{ id: childCategory.id.toString() }} mask={{ to: `/category/${childCategory.name}`, unmaskOnReload: true }} key={childCategory.id} className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left rounded-lg hover:bg-gray-200 focus:outline-none hover:cursor-pointer focus-visible:ring focus-visible:ring-black focus-visible:ring-opacity-75">
                                <span>{childCategory.name}</span>
                              </Link>
                            ))}
                          </div>
                        </DisclosurePanel>
                      </>
                    )}
                  </Disclosure>
              }
            </>
          ))}
    </div>

  );
};


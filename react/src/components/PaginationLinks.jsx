import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

export default function PaginationLinks({ meta, onPageClick }) {
    function onClick(ev, link) {
        ev.preventDefault();
        if (!link.url) {
            return;
        }
        onPageClick(link);
    }

    return (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 shadow-md mt-8">
            <div className="flex flex-1 justify-between sm:hidden">
                <a
                    href="#"
                    onClick={(ev) => onClick(ev, meta.links[0])}
                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Previous
                </a>
                <a
                    href="#"
                    onClick={(ev) =>
                        onClick(ev, meta.links[meta.links.length - 1])
                    }
                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Next
                </a>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">{meta.from}</span>{" "}
                        to <span className="font-medium">{meta.to}</span> of{" "}
                        <span className="font-medium">{meta.total}</span>{" "}
                        results
                    </p>
                </div>
                <div>
                    <nav
                        aria-label="Pagination"
                        className="isolate inline-flex space-x-1 rounded-md shadow-sm"
                    >
                        {meta.links &&
                            meta.links.map((link, ind) => (
                                <a
                                    href="#"
                                    onClick={(ev) => onClick(ev, link)}
                                    key={ind}
                                    aria-current="page"
                                    className={
                                        "relative z-10 inline-flex items-center py-2 text-sm font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 rounded-lg hover:opacity-90 m-1 " +
                                        (link.label.includes("Previous") ||
                                        link.label.includes("Next")
                                            ? "px-2 bg-gray-200 rounded-full"
                                            : "px-4 ") +
                                        (ind === 0 ? "rounded-l-md " : "") +
                                        (ind === meta.links.length - 1
                                            ? "rounded-r-md "
                                            : "") +
                                        (link.active
                                            ? "bg-indigo-600 text-white"
                                            : "text-gray-500 hover:bg-gray-100")
                                    }
                                >
                                    {link.label.includes("Previous") && (
                                        <ChevronLeftIcon
                                            className="h-5 w-5"
                                            aria-hidden="true"
                                        />
                                    )}
                                    {link.label.includes("Next") && (
                                        <ChevronRightIcon
                                            className="h-5 w-5"
                                            aria-hidden="true"
                                        />
                                    )}
                                    {!link.label.includes("Previous") &&
                                        !link.label.includes("Next") && (
                                            <span
                                                dangerouslySetInnerHTML={{
                                                    __html: link.label,
                                                }}
                                            />
                                        )}
                                </a>
                            ))}
                    </nav>
                </div>
            </div>
        </div>
    );
}

"use client"

import {
    Breadcrumb as BreadcrumbComponent,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { usePathname } from "next/navigation";

export default function Breadcrumb() {

    const pathname = usePathname();
    const pathSegments: string[] = pathname.split("/");

    return (
        <BreadcrumbComponent>
            <BreadcrumbList>
                {pathSegments.map((segment, index) => (
                    <div key={index} className="flex items-center gap-1.5">
                        <BreadcrumbItem className="block" key={index}>
                            <BreadcrumbLink href={index === 0 ? "/" : `/${pathSegments.slice(1, index + 1).join("/")}`}>
                                {segment.charAt(0).toUpperCase() + segment.slice(1)}
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        {((index !== pathSegments.length - 1) && index !== 0) && <BreadcrumbSeparator className="block" />}
                    </div>

                ))}
            </BreadcrumbList>
        </BreadcrumbComponent>
    )
}
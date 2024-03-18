import { PlusIcon, TrashIcon, ClipboardCopyIcon, ClipboardIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Component, ComponentProps, FC, useContext } from "react"
import { IPositionRow } from "@/types/positionTypes"
import Link from "next/link"
import { PositionsSearchProvider } from "./provider"
import { PositionsSearchContext } from "./context"
import { Rowdies } from "next/font/google"


type CardProps = ComponentProps<typeof Card>

interface ActionsHandler {
    addRow: (append: boolean, data: IPositionRow) => Promise<void>;
    rowData: IPositionRow[];
}

type PositionSearchProps = CardProps & ActionsHandler;


export const PositionsSearch: FC<PositionSearchProps> = ({
    className,
    addRow,
    rowData,
    ...props
}) => {
    return (
        <PositionsSearchProvider>
            <Search className={className} addRow={addRow} rowData={rowData} />
        </ PositionsSearchProvider>
    );
}


const Search: FC<PositionSearchProps> = ({
    className,
    addRow,
    rowData,
    ...props
}) => {
    const context = useContext(PositionsSearchContext);
    if (!context) {
        return <div>Context not available</div>;
    }
    let { query, active, onChange, onFocus, results } = context;
    return (
        <Card className={cn("w-[380px]", className)} {...props}>
            <CardHeader>
                <CardTitle>Controle Panel</CardTitle>
                <CardDescription>Use these control</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <input
                    onChange={onChange}
                    onFocus={onFocus}
                    placeholder='Search posts'
                    type='text'
                    value={query}
                />
                {active && results.length > 0 && (
                    <ul >
                        {results.map(({ id, name,description }) => (
                            <li key={id}>
                                <Button onClick={() => addRow(true, {
                                    id: id+'-'+ Date.now(),
                                    first_name: name,
                                    last_name: description,
                                    job_title: '',
                                    order: rowData.length + 1
                                }
                                )}>
                                    {name}
                                </Button>
                            </li>
                        ))}
                    </ul>
                )}
            </CardContent>
            <CardFooter>
                <Button className="w-full" onClick={() => addRow(true, {
                    id: '',
                    first_name: '',
                    last_name: '',
                    job_title: '',
                    order: rowData.length + 1
                }
                )}>
                    <PlusIcon className="mr-2 h-4 w-4" /> Add Empty Row
                </Button>
            </CardFooter>
        </Card>
    )
}

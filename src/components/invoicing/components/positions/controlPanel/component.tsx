import { PlusIcon, TrashIcon, ClipboardCopyIcon, ClipboardIcon } from "@radix-ui/react-icons"
import { AgGridReact } from "ag-grid-react"
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
import { ComponentProps, FC, LegacyRef, Ref, RefObject } from "react"
import { IPositionRow } from "@/types/positionTypes"
import { GridApi } from "ag-grid-community"


type CardProps = ComponentProps<typeof Card>

interface ActionsHandler {
    removeSelected: (selectedIds: string[]) => void;
    addRow: (append: boolean, data: IPositionRow) => Promise<void>;
    handleCopy: (api: GridApi<IPositionRow>) => void;
    handlePaste: (api: GridApi<IPositionRow>, addRow: (append: boolean, data: IPositionRow) => Promise<void>) => void;
    api: GridApi<IPositionRow> | undefined;
    rowData: IPositionRow[];
}

type PositionControllerProps = CardProps & ActionsHandler;

export const PositionController: FC<PositionControllerProps> = ({
    className,
    removeSelected,
    addRow,
    handleCopy,
    handlePaste,
    api,
    rowData,
    ...props
}: PositionControllerProps) => {
    if (!api) {
        return <p>Api Not here</p>
    }
    const removeSelectedRows = () => {
        const selectedRows = api.getSelectedRows();
        removeSelected(selectedRows.map((row: IPositionRow) => row.id));
    }
    const addEmptyRow = () => {
        addRow(true, {
            id: 'temp-' + Date.now(),
            first_name: '',
            last_name: '',
            job_title: '',
            order: rowData.length + 1
          })
    }
    const onCopy = () => {
        handleCopy(api)
    }
    
    const onPaste = () => {
        handlePaste(api, addRow)
    }
    return (

        <Card className={cn("w-[380px]", className)} {...props}>
            <CardHeader>
                <CardTitle>Controle Panel</CardTitle>
                <CardDescription>Use these control</CardDescription>
                <Button variant="outline" size="icon" onClick={onCopy}>
                    <ClipboardCopyIcon className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={onPaste}>
                    <ClipboardIcon className="h-4 w-4" />
                </Button>
            </CardHeader>
            <CardContent className="grid gap-4">
                <Button className="w-full" onClick={removeSelectedRows}>
                    <TrashIcon className="mr-2 h-4 w-4" /> Remove selected
                </Button>
            </CardContent>
            <CardFooter>
                <Button className="w-full" onClick={addEmptyRow}>
                    <PlusIcon className="mr-2 h-4 w-4" /> Add Empty Row
                </Button>
            </CardFooter>
        </Card>
    )
}

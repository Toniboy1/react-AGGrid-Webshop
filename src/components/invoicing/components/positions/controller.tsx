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
import { ComponentProps } from "react"


type CardProps = ComponentProps<typeof Card>

interface ActionsHandler {
    removeSelected: () => void;
    addEmptyRow: () => void;
    onCopy: () => void;
    onPaste: () => void;
}

type PositionControllerProps = CardProps & ActionsHandler;

export const PositionController: React.FC<PositionControllerProps> = ({
    className,
    removeSelected,
    addEmptyRow,
    onCopy,
    onPaste,
    ...props
}) => {
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
                <Button className="w-full" onClick={removeSelected}>
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

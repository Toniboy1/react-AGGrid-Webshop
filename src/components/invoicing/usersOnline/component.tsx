import { Card } from "@/components/ui/card";
import { ComponentProps, FC, LegacyRef, useContext, useRef } from "react";
import { UsersOnlineProvider } from "./provider";
import { AgGridReact } from "ag-grid-react";
import { IPositionRow } from '@/types/positionTypes';
import { columnDefs, defaultColDef, getRowId, isRowSelectable, onDragStopped, onGridReady, onDragStarted, onRowDragEnter, onRowDragEnd, onRowDragMove, onRowDragLeave } from "@/utils/grid";
import { UsersOnlineContext } from "./context";


type CardProps = ComponentProps<typeof Card>

interface ActionsHandler {
}

type UsersOnlineProps = CardProps & ActionsHandler;

export const UsersOnline: FC<UsersOnlineProps> = () => {
    return (<UsersOnlineProvider>
        <UsersOnlineComponent />
    </UsersOnlineProvider>);
};

//Create a second aggrid empty table to drag data for the first table in it
const UsersOnlineComponent: FC = () => {
    const { userCount } = useContext(UsersOnlineContext) || {}; // Add null check
    return <div>Users online: {userCount}</div>;
}
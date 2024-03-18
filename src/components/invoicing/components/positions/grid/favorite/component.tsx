import { Card } from "@/components/ui/card";
import { IPositionRow } from "@/types/positionTypes";
import { columnFavoriteDefs, onGridReady, onDragStopped, onDragStarted, onRowDragEnter, onRowDragEnd, onRowDragMove, onRowDragLeave } from "@/utils/grid";
import { ComponentProps, FC, LegacyRef, useState } from "react";
import { PositionFavoriteProvider } from "./provider";
import { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";

type CardProps = ComponentProps<typeof Card>



interface ActionsHandler {
    gridRef: LegacyRef<AgGridReact<IPositionRow>>;
    mainGridRef: LegacyRef<AgGridReact<IPositionRow>>;
}

type PositionFavoriteProps = CardProps & ActionsHandler;

export const PositionFavorite: FC<PositionFavoriteProps> = ({ gridRef, mainGridRef }: PositionFavoriteProps) => {
    return (<PositionFavoriteProvider>
        <PositionFavoriteComponent gridRef={gridRef} mainGridRef={mainGridRef} />
    </PositionFavoriteProvider>);
};

//Create a second aggrid empty table to drag data for the first table in it
const PositionFavoriteComponent: FC<PositionFavoriteProps> = ({ gridRef }: PositionFavoriteProps) => {
    const rowData = [{
        "id": "temp-1710768806534",
        "first_name": "a",
        "last_name": "",
        "job_title": "sadsad",
        "order": 1
    },]
    const defaultColDef: ColDef = {
        flex: 1,
        editable: true,
        resizable: true,
        sortable: true,
        filter: true,
    };


    return (
        <div
            className="ag-theme-alpine"
            style={{
                height: "100%",
                width: "100%",
            }}
        >
            <AgGridReact
                ref={gridRef}
                rowData={rowData}
                columnDefs={columnFavoriteDefs()}
                onGridReady={onGridReady}
                defaultColDef={defaultColDef}
                rowDragManaged={true}
                suppressRowClickSelection={true}
                suppressMoveWhenRowDragging={true}
                suppressTouch={true}
                onRowDragEnter={(e) => onRowDragEnter(e, 'favorite')}
                onRowDragEnd={(e) => onRowDragEnd(e, 'favorite')}
                onRowDragMove={(e) => onRowDragMove(e, 'favorite')}
                onRowDragLeave={(e) => onRowDragLeave(e, 'favorite')}
                onDragStarted={(e) => onDragStarted(e, 'favorite')}
                onDragStopped={(e) => onDragStopped(e, 'favorite')}
            />
        </div>
    );
}
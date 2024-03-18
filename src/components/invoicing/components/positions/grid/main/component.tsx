import { Card } from "@/components/ui/card";
import { ComponentProps, FC, LegacyRef, useRef } from "react";
import { PositionGridProvider } from "./provider";
import { AgGridReact } from "ag-grid-react";
import { IPositionRow } from '@/types/positionTypes';
import { columnDefs, defaultColDef, getRowId, isRowSelectable, onDragStopped, onGridReady, onDragStarted, onRowDragEnter, onRowDragEnd, onRowDragMove, onRowDragLeave } from "@/utils/grid";


type CardProps = ComponentProps<typeof Card>

interface ActionsHandler {
    rowData: IPositionRow[];
    loading: boolean;
    error: string | null;
    addRow: (append: boolean, data: IPositionRow) => Promise<void>;
    removeSelected: (selectedIds: string[]) => Promise<void>;
    gridRef: LegacyRef<AgGridReact<IPositionRow>>;
}

type PositionGridProps = CardProps & ActionsHandler;

export const PositionGrid: FC<PositionGridProps> = ({ rowData, loading, error, addRow, removeSelected, gridRef }: PositionGridProps) => {
    return (<PositionGridProvider>
        <PositionGridComponent rowData={rowData} loading={loading} error={error} addRow={addRow} removeSelected={removeSelected} gridRef={gridRef} />
    </PositionGridProvider>);
};

//Create a second aggrid empty table to drag data for the first table in it
const PositionGridComponent: FC<PositionGridProps> = ({
    rowData,
    loading,
    error,
    addRow,
    removeSelected,
    gridRef

}: PositionGridProps) => {
    return (
        <div
            className="ag-theme-alpine"
            style={{
                height: "100%",
                width: "100%",
            }}
        >
            {loading ? <p>Loading...</p> :
                error ? <p>{error}</p> :
                    //add a basic text to see that it prints

                    <AgGridReact
                        ref={gridRef}
                        rowData={rowData}
                        columnDefs={columnDefs(removeSelected)}
                        defaultColDef={defaultColDef}
                        getRowId={getRowId}
                        // enableCellChangeFlash={true}
                        suppressMoveWhenRowDragging={true}
                        rowDragManaged={true}
                        rowSelection='multiple'
                        onGridReady={onGridReady}
                        suppressRowClickSelection={true}
                        suppressTouch={true}
                        isRowSelectable={isRowSelectable}
                        enableCellTextSelection={true}
                        clipboardDelimiter=','
                        onDragStarted={(e)=>onDragStarted(e,'main')}
                        onDragStopped={(e)=>onDragStopped(e,'main')}
                        onRowDragEnter={(e) => onRowDragEnter(e, 'main')}
                        onRowDragEnd={(e) => onRowDragEnd(e, 'main')}
                        onRowDragMove={(e) => onRowDragMove(e, 'main')}
                        onRowDragLeave={(e) => onRowDragLeave(e, 'main')}
                        ></AgGridReact>
            }
        </div>
    );
}
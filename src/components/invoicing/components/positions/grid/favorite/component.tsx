import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { IPositionRow } from "@/types/positionTypes";
import { columnFavoriteDefs, onGridReady } from "@/utils/grid";
import { ComponentProps, FC, LegacyRef, useContext, useRef, useState } from "react";
import { PositionFavoriteProvider } from "./provider";
import { GridOptions, GridApi } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";

type CardProps = ComponentProps<typeof Card>



interface ActionsHandler {
    gridRef: LegacyRef<AgGridReact<IPositionRow>>;
}

type PositionFavoriteProps = CardProps & ActionsHandler;

export const PositionFavorite: FC<PositionFavoriteProps> = ({  gridRef}: PositionFavoriteProps) => {
    return (<PositionFavoriteProvider>
        <PositionFavoriteComponent gridRef={gridRef} />
    </PositionFavoriteProvider>);
};

//Create a second aggrid empty table to drag data for the first table in it
const PositionFavoriteComponent: FC<PositionFavoriteProps> = ({gridRef }: PositionFavoriteProps) => {
    // const { rowData, removeSelected } = useContext(PositionFavoriteContext);
    // const { addRow } = useContext(PositionFavoriteContext);
    const rowData=[    {
        "id": "temp-1710768806534",
        "first_name": "a",
        "last_name": "",
        "job_title": "sadsad",
        "order": 1
      },]
    const [gridOptions, setGridOptions] = useState<GridOptions>({
        columnDefs: columnFavoriteDefs(),
        // rowData: rowData,
        onRowDragEnd: (event) => {
            const selectedNodes = event.api.getSelectedNodes();
            if (selectedNodes.length > 0) {

            }
        }
    });
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
                gridOptions={gridOptions}
                onGridReady={onGridReady}
            />
        </div>
    );
}
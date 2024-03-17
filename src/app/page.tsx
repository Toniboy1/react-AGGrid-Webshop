"use client";

import { PositionsContext } from "@/components/invoicing/components/positions/context";
import { PositionsProvider } from "@/components/invoicing/components/positions/provider";
import { PositionController } from "@/components/invoicing/components/positions/controller";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { columnDefs, defaultColDef, getRowId, isRowSelectable, onCellKeyDown, onGridReady, handleCopy, handlePaste } from "@/utils/grid";
import { AgGridReact } from "ag-grid-react";
import { useContext, useRef } from "react";
import { TPositionRow } from "@/types/positionTypes";

export default function Home() {
  return (
    <PositionsProvider>
      <HomeContent />
    </PositionsProvider>
  );
}


function HomeContent() {
  const context = useContext(PositionsContext);
  if (!context) {
    return <div>Context not available</div>;
  }
  const { rowData, loading, error, addRow, removeSelected } = context;
  const gridRef = useRef<AgGridReact>(null);
  return (
    <div className="grid grid-cols-3 grid-rows-3 h-screen">
      <div className="border border-gray-200 flex justify-center items-center">
        <p>Square 1</p>
      </div>
      <div className="border border-gray-200 flex justify-center items-center">
        <p>Square 2</p>
      </div>
      <div className="border border-gray-200 flex justify-center items-center">
        <p>Square 3</p>
      </div>
      <div className="border border-gray-200 flex justify-center items-center">
        <p>Square 4</p>
      </div>
      <div className="border border-gray-200 flex justify-center items-center ">
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
                enableCellChangeFlash={true}
                rowDragManaged={true}
                rowSelection='multiple'
                onGridReady={onGridReady}
                suppressRowClickSelection={true}
                isRowSelectable={isRowSelectable}
                enableCellTextSelection={true}
                clipboardDelimiter=','
                onCellKeyDown={(e) => onCellKeyDown(e, addRow)}
              ></AgGridReact>
          }
        </div>
      </div>
      <div className="border border-gray-200 flex justify-center items-center">
        <p>Square 6</p>
      </div>
      <div className="border border-gray-200 flex justify-center items-center">
        <p>Square 7</p>
      </div>
      <div className="border border-gray-200 flex justify-center items-center">
        {!gridRef.current ? <p>Api loading</p> :
          <PositionController
            removeSelected={() => {
              if (gridRef.current) {
                const selectedRows = gridRef.current.api.getSelectedRows();
                removeSelected(selectedRows.map((row: TPositionRow) => row.id));
              }
            }}
            addEmptyRow={() => {
              addRow(true, {
                id: 'temp-' + Date.now(),
                first_name: '',
                last_name: '',
                job_title: '',
                order: rowData.length + 1
              })
            }}
            onCopy={() => handleCopy(gridRef.current!.api)}
            onPaste={() => handlePaste(gridRef.current!.api, addRow)}
          ></PositionController>
        }

      </div>
      <div className="border border-gray-200 flex justify-center items-center">
        <p>Square 9</p>
      </div>
    </div>
  );

}

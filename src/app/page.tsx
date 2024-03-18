"use client";

import { PositionsContext } from "@/components/invoicing/components/positions/controlPanel/context";
import { PositionsProvider } from "@/components/invoicing/components/positions/controlPanel/provider";
import { PositionController } from "@/components/invoicing/components/positions/controlPanel/component";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { handleCopy, handlePaste } from "@/utils/grid";
import { AgGridReact } from "ag-grid-react";
import { useContext, useRef } from "react";
import { IPositionRow } from "@/types/positionTypes";
import { PositionsSearch } from "@/components/invoicing/components/positions/search/controller";
import { PositionFavorite } from "@/components/invoicing/components/positions/grid/favorite/component";
import { PositionGrid } from "@/components/invoicing/components/positions/grid/main/component";
;

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
  const mainGridRef = useRef<AgGridReact<IPositionRow>>(null);
  const favoriteGridRef = useRef<AgGridReact<IPositionRow>>(null);
  return (
    <div className="grid grid-cols-3 grid-rows-3 h-screen">
      <div className="border border-gray-200 flex justify-center items-center">
        <p>Square 1</p>
      </div>
      <div className="border border-gray-200 flex justify-center items-center">
        <PositionsSearch addRow={addRow} rowData={rowData}></PositionsSearch>
      </div>
      <div className="border border-gray-200 flex justify-center items-center">
        <p>Square 3</p>
      </div>
      <div className="border border-gray-200 flex justify-center items-center">
        <p>Square 4</p>
      </div>
      <div className="border border-gray-200 flex justify-center items-center ">
        <PositionGrid
          rowData={rowData}
          loading={loading}
          error={error}
          addRow={addRow}
          removeSelected={removeSelected}
          gridRef={mainGridRef}
        ></PositionGrid>
      </div>
      <div className="border border-gray-200 flex justify-center items-center">
        <PositionFavorite gridRef={favoriteGridRef} mainGridRef={mainGridRef}> </PositionFavorite>
      </div>
      <div className="border border-gray-200 flex justify-center items-center">
        <p>Square 7</p>
      </div>
      <div className="border border-gray-200 flex justify-center items-center">
        <PositionController api={mainGridRef.current?.api}
          removeSelected={removeSelected}
          addRow={addRow}
          rowData={rowData}
          handleCopy={handleCopy}
          handlePaste={handlePaste}
        ></PositionController>

      </div>
      <div className="border border-gray-200 flex justify-center items-center">
        <p>Square 9</p>
      </div>
    </div>
  );

}

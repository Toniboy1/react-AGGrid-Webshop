"use client";
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useEffect, useMemo, useState, useRef } from 'react';
import { ColDef, GetRowIdFunc, GetRowIdParams } from 'ag-grid-community';
import { TPositionRow, ValueSetterFunc } from '@/types/positionTypes';
import { updatePosition } from './api/positions';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
    };
  }, []);
  const getRowId = useMemo<GetRowIdFunc>(() => {
    return (params: GetRowIdParams) => {
      return params.data.id;
    };
  }, []);
  const gridRef = useRef<AgGridReact>(null);
  const valueSetter: ValueSetterFunc<TPositionRow, string> = params => {
    console.log(params);
    if (params.newValue == null) {
      return false;
    }
    params.data.job_title = params.newValue;
    updatePosition(params.data.id, params.data)
      .then(response => {
        console.log(response);
        return true;
      })
      .catch(error => {
        console.error(error);
        return false;
      });


    return true;
  };
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { headerName: 'ID', field: 'id' },
    { headerName: 'First Name', field: 'first_name' },
    { headerName: 'Last Name', field: 'last_name' },
    {
      headerName: 'Job Title', field: 'job_title', cellEditor: 'agTextCellEditor', cellEditorParams: { maxLength: 20 },
      // valueGetter: params => {
      //   console.log("Getter : ",params);
      //   return params.data.job;
      // },
      valueSetter: valueSetter
    }]);

  const [rowData, setRowData] = useState<TPositionRow[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('http://localhost:3001/positions');
        if (!response.ok) {
          setError(await response.text());
          setLoading(false);
          return;
        }
        const data: TPositionRow[] = await response.json();
        setRowData(data);
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <div
      className="ag-theme-alpine"
      style={{ height: '600px' }}
    >
      {loading ? <p>Loading...</p> :
        error ? <p>{error}</p> :
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            getRowId={getRowId}
            enableCellChangeFlash={true}
          ></AgGridReact>
      }
    </div>
  );
}

"use client";
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useEffect, useMemo, useState, useRef, useCallback } from 'react';
import { ColDef, GetRowIdFunc, GetRowIdParams, GridReadyEvent, IRowNode, IsRowSelectable } from 'ag-grid-community';
import { TPositionRow, ValueSetterFunc } from '@/types/positionTypes';
import { createPosition, deletePosition, getPositions, updatePosition } from './api/positions';
import DeleteRow from './components/cells/renderer/deleteRow';

export default function Home() {
  const isRowSelectable = useMemo<IsRowSelectable>(() => {
    return (params: IRowNode<TPositionRow>) => {
      return !!params.data && params.data.job_title != "2";
    };
  }, []);
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
  const onGridReady = useCallback((params: GridReadyEvent) => {
  }, []);

  const onSelectionChanged = useCallback(() => {
    const selectedRows = gridRef.current!.api.getSelectedRows();
  }, []);
  const getRowId = useMemo<GetRowIdFunc>(() => {
    return (params: GetRowIdParams) => {
      return params.data.id;
    };
  }, []);
  const gridRef = useRef<AgGridReact>(null);
  const valueSetter: ValueSetterFunc<TPositionRow, string> = params => {
    if (params.newValue == null) {
      return false;
    }
    params.data.job_title = params.newValue;
    updatePosition(params.data.id, params.data)
      .then(response => {
        return true;
      })
      .catch(error => {
        console.error(error);
        return false;
      });


    return true;
  };
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    {
      headerName: 'ID', field: 'id', rowDrag: true,
      headerCheckboxSelection: true,
      checkboxSelection: true,
      showDisabledCheckboxes: true
    },
    { headerName: 'First Name', field: 'first_name' },
    { headerName: 'Last Name', field: 'last_name' },
    {
      headerName: 'Job Title', field: 'job_title', cellEditor: 'agTextCellEditor', cellEditorParams: { maxLength: 20 },
      valueSetter: valueSetter
    },
    { headerName: 'Order', field: 'order' },
    { headerName: 'Actions', field: 'id', cellRenderer: DeleteRow, cellRendererParams: { onClick: (id: string) => removeRowAction(id) } },
  ]);

  const [rowData, setRowData] = useState<TPositionRow[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getPositions();
        if (await response.status != 200) {
          setError(await response.data.text());
          setLoading(false);
          return;
        }
        const data: TPositionRow[] = await response.data;
        setRowData(data);
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const removeSelected = useCallback(
    async () => {
      const selectedRowNodes = gridRef.current!.api.getSelectedNodes();
      const selectedIds = selectedRowNodes.map((rowNode: IRowNode) => {
        deletePosition(rowNode.data.id)
        return rowNode.id;
      });
      const filteredData = rowData.filter((data: TPositionRow) => {
        return selectedIds.indexOf(data.id) < 0;
      });
      setRowData(filteredData);
    }, [rowData]);
    const rowDataRef = useRef(rowData);
    useEffect(() => {
      rowDataRef.current = rowData;
    }, [rowData]);
  const removeRowAction = useCallback(
    async (id: string) => {
      const rowNode = gridRef.current!.api.getRowNode(id);
      if (!rowNode) return;
      const selectedIds = [rowNode].map((rowNode: IRowNode) => {
        deletePosition(rowNode.data.id)
        return rowNode.id;
      });
      const filteredData = rowDataRef.current.filter((data: TPositionRow) => {
        return selectedIds.indexOf(data.id) < 0;
      });
      setRowData(filteredData);
    }, [rowData]);
  async function createItem(data: TPositionRow[]): Promise<TPositionRow> {
    let response = await createPosition({ first_name: 'New', last_name: 'New', job_title: 'New', order: data.length + 1 })
    if (await response.status != 201) {
      setError(await response.data.text());
    }
    return await response.data;
  }
  const addFiveItems = useCallback(
    async (append: boolean) => {
      const newStore = rowData.slice();
      for (let i = 0; i < 5; i++) {
        const newItem = await createItem(newStore);
        if (append) {
          newStore.push(newItem);
        } else {
          newStore.splice(0, 0, newItem);
        }
      }
      setRowData(newStore);
    },
    [rowData]
  );

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
            rowDragManaged={true}
            rowSelection='multiple'
            onGridReady={onGridReady}
            onSelectionChanged={onSelectionChanged}
            suppressRowClickSelection={true}
            isRowSelectable={isRowSelectable}
          ></AgGridReact>
      }
      <button onClick={removeSelected}>Remove</button>
      <button onClick={() => addFiveItems(true)}>Add 5 items to the end</button>
    </div>
  );
}

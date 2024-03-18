import { ColDef, IsRowSelectable, GetRowIdFunc, GridReadyEvent, IRowNode, CellKeyDownEvent, FullWidthCellKeyDownEvent, GridApi } from 'ag-grid-community';
import { IPositionRow, ValueSetterFunc } from '@/types/positionTypes';
import { updatePosition } from '@/services/positions';
import DeleteRow from '@/components/invoicing/components/positions/grid/cells/renderer/deleteRow';
export const getAllRows = (api: GridApi<any>): IRowNode[] => {
    const rowNodes: IRowNode[] = [];
    api.forEachNode(node => rowNodes.push(node.data));
    return rowNodes;
}
// Default column definitions for the grid
export const defaultColDef: ColDef = {
    flex: 1,
    editable: true,
    resizable: true,
    sortable: true,
    filter: true,
};

const valueSetter: ValueSetterFunc<IPositionRow, string> = params => {
    if (params.newValue == null) {
        return false;
    }
    params.data.job_title = params.newValue;
    updatePosition(params.data.id, params.data)
        .then(response => {
            return true;
        })
        .catch(error => {
            console.log(error.message);
            return false;
        });


    return true;
};

// Specific column definitions for your positions data
export const columnDefs = (removeSelected: (selectedIds: string[]) => Promise<void>) => {
    return [
        {
            headerName: 'ID', 
            field: 'id', 
            rowDrag: true,
            dndSource:true,
            headerCheckboxSelection: true,
            checkboxSelection: true,
            showDisabledCheckboxes: true,
            editable: false,
        },
        { headerName: 'First Name', field: 'first_name', editable: false },
        { headerName: 'Last Name', field: 'last_name', editable: false },
        {
            headerName: 'Job Title', field: 'job_title', cellEditor: 'agTextCellEditor', cellEditorParams: { maxLength: 20 },
            valueSetter: valueSetter
        },
        { headerName: 'Order', field: 'order', editable: false },
        { headerName: 'Actions', editable: false, field: 'id', cellRenderer: DeleteRow, cellRendererParams: { onClick: (id: string) => removeSelected([id]) } },
    ]
};

export const isRowSelectable: IsRowSelectable = (params) => {
    return !!params.data && params.data.job_title !== "2";
};

export const getRowId: GetRowIdFunc = (params) => {
    return params.data.id;
};
export const onGridReady = (params: GridReadyEvent) => {
    window.onresize = () => {
        params.api.sizeColumnsToFit();
    };
};


export const onCellKeyDown = (e: CellKeyDownEvent<IPositionRow> | FullWidthCellKeyDownEvent<IPositionRow>, addRow: (append: boolean, data: IPositionRow) => Promise<void>) => {
    if (!e.event) return;
    const browserEvent: KeyboardEvent = e.event as KeyboardEvent;
    if ((browserEvent.ctrlKey || browserEvent.metaKey) && browserEvent.keyCode === 67) {
        navigator.clipboard.writeText(
            e.api.getSelectedNodes()
                .map((node: IRowNode<IPositionRow>) => {
                    if (!node.data) return '' // Skip the header row (if present
                    return `${node.data.first_name},${node.data.last_name},${node.data.job_title},${node.data.order}`
                })
                .join('\n')
        ).then(() => {
        }).catch((err: any) => console.log('Could not copy text: ' + err.message));
    }
    else if ((browserEvent.ctrlKey || browserEvent.metaKey) && browserEvent.keyCode === 86) {
        navigator.clipboard.readText().then(async text => {
            const rows = text.split('\n');
            for (const row of rows) {
                const cells = row.split(',');
                let data: IPositionRow = {
                    id: 'temp-' + Date.now(), // Generate a temporary ID
                    first_name: cells[0] || '',
                    last_name: cells[1] || '',
                    job_title: cells[2] || '',
                    order: parseInt(cells[3]) || getAllRows(e.api).length + 1,
                };
                addRow(true, data);
            }
        });
    }

}
export const handleCopy = (api: GridApi<any>) => {
    navigator.clipboard.writeText(
        api.getSelectedNodes()
            .map((node: IRowNode<IPositionRow>) => {
                if (!node.data) return ''; // Skip the header row (if present)
                return `${node.data.first_name},${node.data.last_name},${node.data.job_title},${node.data.order}`;
            })
            .join('\n')
    ).then(() => {
    }).catch((err: any) => console.log('Could not copy text: ' + err.message));
};

export const handlePaste = (api: GridApi<any>, addRow: (append: boolean, data: IPositionRow) => Promise<void>) => {
    navigator.clipboard.readText().then(async text => {
        const rows = text.split('\n');
        for (const row of rows) {
            const cells = row.split(',');
            let data: IPositionRow = {
                id: 'temp-' + Date.now(), // Generate a temporary ID
                first_name: cells[0] || '',
                last_name: cells[1] || '',
                job_title: cells[2] || '',
                order: parseInt(cells[3], 10) || getAllRows(api).length + 1,
            };
            await addRow(true, data);
        }
    }).catch((err: any) => console.log('Could not paste text: ' + err.message));
};

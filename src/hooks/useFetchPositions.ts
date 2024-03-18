import { useState, useEffect, useCallback, useRef } from 'react';
import { createPosition, deletePosition, getPositions } from '@/services/positions';
import { TPosition, IPositionRow } from '@/types/positionTypes';
import { AgGridReact } from 'ag-grid-react';

export const useFetchPositions = () => {
    const gridRef = useRef<AgGridReact>(null);
    const [rowData, setRowData] = useState<IPositionRow[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Fetch positions from the API
    const fetchPositions = async () => {
        try {
            setLoading(true);
            const response = await getPositions();
            if (response.status !== 200) {
                throw new Error(await response.data.text());
            }
            setRowData(await response.data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPositions();
    }, []);

    // Function to add a new row
    const addRow = async (append: boolean, data: TPosition) => {
        try {
            //add random string id to data
            let id = Math.random().toString(36).substring(7);
            const newItem = { id, ...data };
            const response = await createPosition(newItem);
            if (response.status !== 201) {
                throw new Error(await response.data.text());
            }
            setRowData(prev => append ? [...prev, response.data] : [response.data, ...prev]);
        } catch (err: any) {
            setError(err.message);
        }
    };

    // Function to remove selected rows
    const removeSelected = useCallback(async (selectedIds: string[]) => {
        try {
            // Your logic to remove selected rows
            const remainingRows = rowData.filter(row => !selectedIds.includes(row.id));
            setRowData(remainingRows);
            // Call deletePosition for each selected ID (you might want to adjust this)
            selectedIds.forEach(id => deletePosition(id));
        } catch (err: any) {
            setError(err.message);
        }
    }, [rowData]);

    return { rowData, loading, error, addRow, removeSelected, gridRef };
};



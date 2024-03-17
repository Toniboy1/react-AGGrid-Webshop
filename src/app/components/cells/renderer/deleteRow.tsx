import React from 'react';
import { TrashIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import { IPositionButtonRow } from '@/types/positionTypes';

export default (props: IPositionButtonRow) => {
    const { onClick } = props;
    const handleDelete = () => {
         onClick(props.data.id);
    }
    return (
        <Button variant="outline" size="icon" onClick={handleDelete}>
            <TrashIcon className="h-4 w-4" />
        </Button>
    );
};        

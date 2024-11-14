"use client";

import React, { useState } from 'react';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { createNewDocument } from '@/actions/actions';

function NewDocumentButton() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleCreateNewDocument = async () => {
        setIsLoading(true);
        
        const { docId } = await createNewDocument();
        router.push(`/doc/${docId}`);

        setIsLoading(false);
    };

    return (
        <Button onClick={handleCreateNewDocument} disabled={isLoading}>
            {isLoading ? "Creating..." : "New Document"}
        </Button>
    );
}

export default NewDocumentButton;

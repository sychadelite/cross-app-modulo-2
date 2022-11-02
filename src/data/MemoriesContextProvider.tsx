import React, {ReactNode, useCallback, useEffect, useState} from "react";
import { Directory, Filesystem } from '@capacitor/filesystem';

import MemoriesContext, {Memory} from "./memories-context";

interface BaseLayoutProps {
    children?: ReactNode;
}

const MemoriesContextProvider: React.FC<BaseLayoutProps> = (props) => {
    const [memories, setMemories] = useState<Memory[]>([]);
    const addMemory = (path: string, base64Data: string, title: string, type: 'good' | 'bad') => {
        const newMemory: Memory = {
            id: Math.random().toString(),
            title,
            type,
            imagePath: path,
            base64Url: base64Data
        }
        setMemories(curMemories => {
            return [...curMemories, newMemory];
        });
    };

    useEffect(() => {
        const storableMemories = memories.map(memory => {
            return {
                id: memory.id,
                title: memory.title,
                imagePath: memory.imagePath,
                type: memory.type
            }
        });
        // Storage.set({key: 'memories', value: JSON.stringify(storableMemories)});
        localStorage.setItem('memories', JSON.stringify(storableMemories));
    }, [memories]);

    const initContext = useCallback(async () => {
        // const memoriesData = await Storage.length({key: 'memories'});
        // const storedMemories = memoriesData.value ? JSON.parse(memoriesData.value) : [];
        const memoriesData = await localStorage.getItem('memories');
        const storedMemories = memoriesData ? JSON.parse(memoriesData) : [];
        const loadedMemories: Memory[] = [];
        for(const storedMemory of storedMemories) {
            const file = await Filesystem.readFile({
                path: storedMemory.imagePath,
                directory: Directory.Data
            });
            
            loadedMemories.push({
                id: storedMemory.id,
                title: storedMemory.title,
                imagePath: storedMemory.imagePath,
                type: storedMemory.type,
                base64Url: 'data:image/jpeg;base64,' + file.data
            });
        }
        setMemories(loadedMemories);
    }, [])


    return (
        <MemoriesContext.Provider value={{memories, addMemory, initContext}}>
            {props.children}
        </MemoriesContext.Provider>
    );
}

export default MemoriesContextProvider;
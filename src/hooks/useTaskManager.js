import { useState, useMemo } from 'react';
import { useQueryClient } from '@tanstack/react-query';

const useTaskManager = (queryKey) => {
    const queryClient = useQueryClient();
    const [searchQuery, setSearchQuery] = useState('');

    const tasks = queryClient.getQueryData(queryKey) || [];

    const filteredTasks = useMemo(() => {
        return tasks.filter(task =>
            task.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [tasks, searchQuery]);

    const columns = useMemo(() => ({
        todo: filteredTasks.filter(task => !task.completed),
        done: filteredTasks.filter(task => task.completed),
    }), [filteredTasks]);

    const addTask = (newTask) => {
        const updatedTasks = [{ ...newTask, id: Date.now() }, ...tasks];
        queryClient.setQueryData(queryKey, updatedTasks);
    };

    const updateTask = (updatedTask) => {
        const updatedTasks = tasks.map(task =>
            task.id === updatedTask.id ? { ...task, ...updatedTask } : task
        );
        queryClient.setQueryData(queryKey, updatedTasks);
    };

    return {
        tasks,
        setSearchQuery,
        addTask,
        updateTask,
        columns,
    };
};

export default useTaskManager;

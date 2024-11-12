import { useQuery } from '@tanstack/react-query';
import { Row, Col, Button, Spin } from 'antd';
import TaskList from '../components/TaskList';
import SearchBar from '../components/SearchBar';
import TaskModal from '../components/TaskModal';
import useTaskManager from '../hooks/useTaskManager';
import { useState } from 'react';

function fetchTasks() {
    return fetch('https://jsonplaceholder.typicode.com/todos').then(res => res.json());
}

const Dashboard = () => {
    const { isLoading } = useQuery({
        queryKey: ['tasks'],
        queryFn: fetchTasks,
    });

    const { columns, addTask, updateTask, setSearchQuery } = useTaskManager(['tasks']);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    const handleEditTask = (task) => {
        setSelectedTask(task);
        setIsModalOpen(true);
    };

    const handleSaveTask = (task) => {
        if (selectedTask) {
            updateTask(task);
        } else {
            addTask(task);
        }
        setIsModalOpen(false);
        setSelectedTask(null);
    };

    return (
        <>
            <Row
                align="middle"
                justify="space-between"
                style={{ marginBottom: '16px' }}
            >
                <Col span={12}>
                    <SearchBar onSearch={setSearchQuery} />
                </Col>
                <Col span={12} style={{ textAlign: 'right' }}>
                    <Button type="primary" onClick={() => setIsModalOpen(true)}>
                        Create Task
                    </Button>
                </Col>
            </Row>

            <TaskModal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveTask}
                data={selectedTask}
            />

            {isLoading ? (
                <Row justify="center" style={{ height: '300px' }}>
                    <Col>
                        <Spin size="large" />
                    </Col>
                </Row>
            ) : (
                <Row gutter={16}>
                    <Col span={12}>
                        <TaskList
                            title="To-Do"
                            tasks={columns.todo}
                            onEditTask={handleEditTask}
                        />
                    </Col>
                    <Col span={12}>
                        <TaskList
                            title="Done"
                            tasks={columns.done}
                            onEditTask={handleEditTask}
                        />
                    </Col>
                </Row>
            )}
        </>
    );
};

export default Dashboard;

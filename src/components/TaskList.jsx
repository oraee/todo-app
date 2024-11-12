import { Typography } from 'antd';
import TaskCard from './TaskCard';

const { Title } = Typography;

const TaskList = ({ title, tasks, onEditTask }) => {
    return (
        <div>
            <Title level={4} style={{ marginBottom: 16 }}>{title}</Title>
            {tasks.map((task) => (
                <TaskCard key={task.id} task={task} onEdit={onEditTask} />
            ))}
        </div>
    );
};

export default TaskList;

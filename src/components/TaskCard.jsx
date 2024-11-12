import { Card, Space, Typography, Tag, Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';

const { Text } = Typography;

const TaskCard = ({ task, onEdit }) => {
    return (
        <Card
            title={<Text strong>{task.title}</Text>}
            extra={
                <Button
                    icon={<EditOutlined />}
                    onClick={() => onEdit(task)}
                    type="text"
                >
                    Edit
                </Button>
            }
            style={{ marginBottom: 16 }}
        >
            <Space direction="vertical">
                <Tag color={task.completed ? 'green' : 'red'}>
                    {task.completed ? 'Completed' : 'To-Do'}
                </Tag>
                <Tag color="blue">Assigned to User {task.userId}</Tag>
            </Space>
        </Card>
    );
};

export default TaskCard;

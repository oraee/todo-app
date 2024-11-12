import { Modal, Form, Input, Select, Button } from 'antd';
import { useEffect } from 'react';

const TaskModal = ({ open, onClose, onSave, data }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (data) {
            form.setFieldsValue({
                title: data.title,
                status: data.completed ? 'done' : 'todo',
                userId: data.userId,
            });
        } else {
            form.resetFields();
        }
    }, [data, form]);

    const handleSave = () => {
        form.validateFields().then((values) => {
            const newTask = {
                id: data?.id || Math.floor(Math.random() * 1000),
                title: values.title,
                completed: values.status === 'done',
                userId: values.userId,
            };
            onSave(newTask);
        });
    };

    return (
        <Modal
            title={data ? 'Edit Task' : 'Create Task'}
            open={open}
            onCancel={() => {
                form.resetFields();
                onClose();
            }}
            footer={[
                <Button key="close" onClick={onClose}>
                    Close
                </Button>,
                <Button key="save" type="primary" onClick={handleSave}>
                    Save
                </Button>,
            ]}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    name="title"
                    label="Title"
                    rules={[{ required: true, message: 'Please enter a title' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="status"
                    label="Status"
                    rules={[{ required: true, message: 'Please select a status' }]}
                >
                    <Select>
                        <Select.Option value="todo">To-Do</Select.Option>
                        <Select.Option value="done">Done</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name="userId"
                    label="Assign to User"
                    rules={[{ required: true, message: 'Please select a user' }]}
                >
                    <Select>
                        {Array.from({ length: 10 }, (_, i) => (
                            <Select.Option key={i + 1} value={i + 1}>
                                User {i + 1}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default TaskModal;

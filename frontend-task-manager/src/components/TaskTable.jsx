import { useEffect, useState } from 'react';
import { getTasks } from '../services/api';
import { useAuth } from '../context/AuthContext';
import TaskList from './TaskList';
import AssignTaskForm from './AssignTaskForm';

const TaskTable = () => {
    const { user } = useAuth();
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await getTasks();
                setTasks(res.data);
            } catch (err) {
                console.error('Failed to fetch tasks', err);
            }
        };
        fetch();
    }, []);

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Task List</h2>
            {user.role === 'manager' && (
                <div className="mb-6">
                    <AssignTaskForm setTasks={setTasks} />
                </div>
            )}
            <TaskList tasks={tasks} setTasks={setTasks} />
        </div>
    );
};

export default TaskTable;

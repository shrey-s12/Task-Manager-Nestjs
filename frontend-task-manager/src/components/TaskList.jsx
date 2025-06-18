import { useAuth } from '../context/AuthContext';
import { updateTaskStatus } from '../services/api';

const TaskList = ({ tasks, setTasks }) => {
    const { user } = useAuth();

    const handleStatusChange = async (taskId, newStatus) => {
        try {
            const updated = await updateTaskStatus(taskId, newStatus);
            setTasks(prev =>
                prev.map(t => (t.id === taskId ? { ...t, status: updated.data.status } : t))
            );
        } catch (err) {
            alert('Failed to update status');
        }
    };

    const getStatusBadge = (status) => {
        const base = "px-2 py-1 rounded text-xs font-medium";
        if (status === 'pending') return `${base} bg-yellow-100 text-yellow-700`;
        if (status === 'in_progress') return `${base} bg-blue-100 text-blue-700`;
        if (status === 'completed') return `${base} bg-green-100 text-green-700`;
        return base;
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left border border-gray-300">
                <thead className="bg-gray-200 text-gray-700">
                    <tr>
                        <th className="border px-4 py-2">Title</th>
                        <th className="border px-4 py-2">Description</th>
                        <th className="border px-4 py-2">Status</th>
                        {user.role === 'manager' && <th className="border px-4 py-2">Assigned To</th>}
                        {user.role === 'employee' && <th className="border px-4 py-2">Action</th>}
                    </tr>
                </thead>
                <tbody>
                    {tasks.length === 0 ? (
                        <tr>
                            <td colSpan={user.role === 'manager' ? 4 : 4} className="text-center py-4 text-gray-500">
                                No tasks found.
                            </td>
                        </tr>
                    ) : (
                        tasks.map((task) => (
                            <tr key={task.id} className="hover:bg-gray-50 transition">
                                <td className="border px-4 py-2">{task.title}</td>
                                <td className="border px-4 py-2">{task.description}</td>
                                <td className="border px-4 py-2">
                                    <span className={getStatusBadge(task.status)}>
                                        {task.status.replace('_', ' ').toUpperCase()}
                                    </span>
                                </td>
                                {user.role === 'manager' && (
                                    <td className="border px-4 py-2">{task.assignedTo?.name || 'N/A'}</td>
                                )}
                                {user.role === 'employee' && (
                                    <td className="border px-4 py-2">
                                        <select
                                            className="border rounded p-1"
                                            value={task.status}
                                            onChange={(e) => handleStatusChange(task.id, e.target.value)}
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="in-progress">In Progress</option>
                                            <option value="completed">Completed</option>
                                        </select>
                                    </td>
                                )}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default TaskList;

import { useEffect, useState } from 'react';
import { assignTask, getAllEmployees } from '../services/api';

const AssignTaskForm = ({ setTasks }) => {
    const [form, setForm] = useState({ title: '', description: '', employeeId: '' });
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const res = await getAllEmployees();
                setEmployees(res.data);
            } catch (err) {
                console.error('Failed to fetch employees');
            }
        };
        fetchEmployees();
    }, []);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async () => {
        try {
            console.log("Form data being submitted:", form);
            const res = await assignTask(form);
            setTasks(prev => [...prev, res.data]);
            setForm({ title: '', description: '', employeeId: '' });
            alert('Task assigned!');
        } catch (err) {
            alert('Failed to assign task');
        }
    };

    return (
        <div className="bg-gray-50 p-4 rounded border">
            <h3 className="text-lg font-medium mb-2">Assign New Task</h3>
            <input
                className="w-full p-2 mb-2 border rounded"
                name="title"
                placeholder="Task Title"
                value={form.title}
                onChange={handleChange}
            />
            <input
                className="w-full p-2 mb-2 border rounded"
                name="description"
                placeholder="Task Description"
                value={form.description}
                onChange={handleChange}
            />
            <select
                name="employeeId"
                value={form.employeeId}
                onChange={handleChange}
                className="w-full p-2 mb-2 border rounded"
            >
                <option value="">Select Employee</option>
                {employees.map(emp => (
                    <option key={emp.id} value={emp.id}>{emp.name}</option>
                ))}
            </select>
            <button
                onClick={handleSubmit}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Assign
            </button>
        </div>
    );
};

export default AssignTaskForm;

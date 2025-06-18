import Header from '../components/Header';
import TaskTable from '../components/TaskTable';

const Dashboard = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            <div className="p-4 max-w-6xl mx-auto">
                <TaskTable />
            </div>
        </div>
    );
};

export default Dashboard;

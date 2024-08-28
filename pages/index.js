import { useState } from 'react';
import CampaignsForm from '../components/CampaignsForm';
import UsersTable from '../components/UsersTable';
import '../app/globals.css';


export default function Home() {
  const [activeTab, setActiveTab] = useState('campaigns');

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 h-screen bg-blue-900 text-white flex flex-col fixed">
        <div className="p-6">
          <h2 className="text-2xl font-bold">GrowwPaisa Dashboard</h2>
        </div>
        <nav className="flex-1 p-4 space-y-4">
          <button
            className={`w-full text-left p-3 rounded-lg font-semibold ${activeTab === 'campaigns' ? 'bg-blue-700' : ''}`}
            onClick={() => setActiveTab('campaigns')}
          >
            Create Campaigns
          </button>
          <button
            className={`w-full text-left p-3 rounded-lg font-semibold ${activeTab === 'users' ? 'bg-blue-700' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            Users
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 ml-64">
        {activeTab === 'campaigns' && <CampaignsForm />}
        {activeTab === 'users' && <UsersTable />}
      </div>
    </div>
  );
}

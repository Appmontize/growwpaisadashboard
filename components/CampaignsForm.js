import { useState, useEffect } from 'react';

export default function CampaignsForm() {
  const [campaign, setCampaign] = useState({
    title: '',
    text: '',
    link: '',
    image: '',
    coins: '',
    isActive: true,
  });
  const [campaigns, setCampaigns] = useState([]);
  const [editingCampaignId, setEditingCampaignId] = useState(null);

  // Fetch campaigns from the backend
  const fetchCampaigns = async () => {
    try {
      const response = await fetch('http://localhost:3001/campaign/fetch');
      const data = await response.json();
      if (Array.isArray(data)) {
        setCampaigns(data);
      } else {
        console.error('Unexpected data structure:', data);
        setCampaigns([]); // Default to an empty array
      }
    } catch (error) {
      console.error('Error fetching campaigns:', error);
      setCampaigns([]); // Default to an empty array in case of error
    }
  };
  
  

  useEffect(() => {
    fetchCampaigns();
  }, []);

  // Handle form submission
  const handleCampaignSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = editingCampaignId ? 'PUT' : 'POST';
      const endpoint = editingCampaignId
        ? `http://localhost:3001/campaign/campaign/${editingCampaignId}`
        : 'http://localhost:3001/campaign/create/';
        
      const response = await fetch(endpoint, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(campaign),
      });

      if (!response.ok) {
        throw new Error('Failed to save campaign');
      }

      const data = await response.json();
      console.log('Campaign saved:', data);
      setCampaign({ title: '', text: '', link: '', image: '', coins: '', isActive: true });
      setEditingCampaignId(null);
      fetchCampaigns(); // Refresh campaigns list
    } catch (error) {
      console.error('Error saving campaign:', error);
    }
  };

  // Handle editing of a campaign
  const handleEditCampaign = (campaign) => {
    setCampaign({
      title: campaign.title,
      text: campaign.text,
      link: campaign.link,
      image: campaign.image,
      coins: campaign.coins,
      isActive: campaign.isActive,
      
    });
    setEditingCampaignId(campaign.id);
  };

  // Handle deletion of a campaign
  const handleDeleteCampaign = async (id) => {
    try {
      await fetch(`http://localhost:3001/campaign/campaigns/${id}`, {
        method: 'DELETE',
      });
      fetchCampaigns();
    } catch (error) {
      console.error('Error deleting campaign:', error);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">{editingCampaignId ? 'Edit Campaign' : 'Create a Campaign'}</h2>
      <form onSubmit={handleCampaignSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            value={campaign.title}
            onChange={(e) => setCampaign({ ...campaign, title: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Text</label>
          <textarea
            value={campaign.text}
            onChange={(e) => setCampaign({ ...campaign, text: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Link</label>
          <input
            type="text"
            value={campaign.link}
            onChange={(e) => setCampaign({ ...campaign, link: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Image URL</label>
          <input
            type="text"
            value={campaign.image}
            onChange={(e) => setCampaign({ ...campaign, image: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Coins</label>
          <input
            type="number"
            value={campaign.coins}
            onChange={(e) => setCampaign({ ...campaign, coins: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            checked={campaign.isActive}
            onChange={(e) => setCampaign({ ...campaign, isActive: e.target.checked })}
            className="mr-2"
          />
          <label className="text-gray-700">Active</label>
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          {editingCampaignId ? 'Update Campaign' : 'Add Campaign'}
        </button>
      </form>

      <h3 className="text-xl font-bold mt-10 mb-4">Campaigns List</h3>
<ul>
  {Array.isArray(campaigns) ? (
    campaigns.map((campaign) => (
      <li key={campaign.id} className="mb-4">
        <div className="p-4 border border-gray-300 rounded">
          <h4 className="text-lg font-bold">{campaign.title}</h4>
          <p>{campaign.text}</p>
          <p>Link: <a href={campaign.link} className="text-blue-600">{campaign.link}</a></p>
          <p>Coins: {campaign.coins}</p>
          <p>Status: {campaign.isActive ? 'Active' : 'Inactive'}</p>
          <button
            onClick={() => handleEditCampaign(campaign)}
            className="bg-green-600 text-white px-2 py-1 rounded mr-2"
          >
            Edit
          </button>
          <button
            onClick={() => handleDeleteCampaign(campaign.id)}
            className="bg-red-600 text-white px-2 py-1 rounded"
          >
            Delete
          </button>
        </div>
      </li>
    ))
  ) : (
    <p>No campaigns found.</p>
  )}
</ul>

    </div>
  );
}

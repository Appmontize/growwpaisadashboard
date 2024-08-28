let campaigns = [];

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { title, text, link, image } = req.body;
    const newCampaign = { title, text, link, image };
    campaigns.push(newCampaign);
    res.status(201).json({ message: 'Campaign created successfully', campaign: newCampaign });
  } else if (req.method === 'GET') {
    res.status(200).json(campaigns);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

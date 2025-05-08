import fs from 'fs';
const videosData = JSON.parse(fs.readFileSync('./data/videos.json', 'utf-8'));

let videos = videosData;

export const getPendingVideos = (req, res) => {
  const pending = videos.filter(v => v.status === 'Pending');
  res.json({ message: 'Pending videos fetched successfully', success: true, videos: pending });
};

export const approveVideo = (req, res) => {
  const video = videos.find(v => v.id === req.params.id);
  if (!video) {
    return res.status(404).json({ message: 'Video not found', success: false });
  }

  videos = videos.map(v => v.id === req.params.id ? { ...v, status: 'Approved' } : v);
  fs.writeFileSync('./data/videos.json', JSON.stringify(videos, null, 2));
  res.json({ message: 'Video approved successfully', success: true });
};

export const rejectVideo = (req, res) => {
  const video = videos.find(v => v.id === req.params.id);
  if (!video) {
    return res.status(404).json({ message: 'Video not found', success: false });
  }

  videos = videos.map(v => v.id === req.params.id ? { ...v, status: 'Rejected' } : v);
  fs.writeFileSync('./data/videos.json', JSON.stringify(videos, null, 2));
  res.json({ message: 'Video rejected successfully', success: true });
};

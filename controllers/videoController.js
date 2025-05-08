import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const videosPath = path.join(__dirname, '../data/videos.json');
const videosData = JSON.parse(fs.readFileSync(videosPath, 'utf-8'));
let videos = videosData;

export const uploadVideo = async (req, res) => {
  try {
    const cloudinary = (await import('../config/cloudinaryConfig.js')).default;

    const { title, description, category, genre, version } = req.body;

    if (!title || !description || !category || !genre || !version) {
      return res.status(400).json({ message: 'All fields are required', success: false });
    }

    if (!req.files || !req.files.video || !req.files.thumbnail) {
      return res.status(400).json({ message: 'Video and Thumbnail files are required', success: false });
    }

    const videoFile = req.files.video[0];
    const thumbnailFile = req.files.thumbnail[0];

    const videoRes = await cloudinary.uploader.upload(videoFile.path, {
      resource_type: 'video'
    });

    const thumbRes = await cloudinary.uploader.upload(thumbnailFile.path);

    const newVideo = {
      id: Date.now().toString(),
      title,
      description,
      category,
      genre,
      version,
      videoURL: videoRes.secure_url,
      thumbnailURL: thumbRes.secure_url,
      artistId: req.user.id,
      status: 'Pending'
    };

    videos.push(newVideo);
    fs.writeFileSync(videosPath, JSON.stringify(videos, null, 2));

    fs.unlinkSync(videoFile.path);
    fs.unlinkSync(thumbnailFile.path);

    res.json({ message: 'Video uploaded and pending approval', success: true, video: newVideo });

  } catch (error) {
    console.error('Upload Error:', error);
    res.status(500).json({ message: 'Error uploading video to Cloudinary or saving to database', success: false });
  }
};

export const getAllVideos = (req, res) => {
  if (videos.length === 0) {
    return res.json({ message: 'No videos uploaded till now', success: false });
  } 
  res.json({ message: 'Videos fetched successfully', success: true, videos });
};


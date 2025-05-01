export default async function handler(req, res) {
    const { file } = req.query;
  
    if (!file) {
      return res.status(400).json({ error: 'Missing file parameter' });
    }
  
    const firebaseUrl = `https://firebasestorage.googleapis.com/v0/b/mov-upload-web.appspot.com/o/${file}?alt=media`;
  
    try {
      const response = await fetch(firebaseUrl);
  
      if (!response.ok) {
        return res.status(404).json({ error: 'File not found' });
      }
  
      res.setHeader('Content-Type', 'video/mp4');
      res.setHeader('Content-Disposition', `attachment; filename="${decodeURIComponent(file)}"`);
  
      response.body.pipe(res);
    } catch (error) {
      console.error('Download error:', error);
      res.status(500).json({ error: 'Download failed' });
    }
  }
  
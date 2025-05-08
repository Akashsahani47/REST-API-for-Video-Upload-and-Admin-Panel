SELECT * FROM videos WHERE status = 'Pending';


UPDATE videos SET status = 'Approved' WHERE id = 'vid001';


UPDATE videos SET status = 'Rejected' WHERE id = 'vid001';


SELECT * FROM videos WHERE artistId = '1';

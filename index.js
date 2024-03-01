import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import charAi from './lib/chara.js'
const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000; // Choose the port you prefer
const htmlPath = path.resolve(__dirname, 'public');
app.use(express.static(htmlPath));

app.use(express.json());

app.get('/', (req, res) => {
 res.sendFile(path.join(htmlPath, 'index.html'));
});
app.get('/chara', async (req, res) => {
  const message= req.query.message

  if (!message) {
    return res.status(400).json({ success: false, message: 'Missing required parameters' });
  }

  try {
    const characterId = 'qonOr4R68VjtwG_HZ0uH6o5FJTVspHmkXukYUtODR-M';
    let userMessage = `${message}`
    charAi.sendMessage(characterId, userMessage)
    .then((response) => {
      console.log("AI:", response.text);
      //reply(response.text)
      const result = response.text
      res.status(200).json({ success: true, result });
    })
    /*const response = await Test.sendMessage(String(characterid), String(message));
    res.status(200).json({ success: true, response });*/
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
                  

import { useState } from 'react';
import './App.css';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Card,
  CardContent,
} from '@mui/material';
import { FaGithub } from 'react-icons/fa';
import axios from 'axios';

function App() {
  const [emailContent, setEmailContent] = useState('');
  const [tone, setTone] = useState('');
  const [generatedReply, setGeneratedReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('https://emailassistantbackend-production-315a.up.railway.app/api/email/generate', {



        emailContent,
        tone
      });
      setGeneratedReply(typeof response.data === 'string' ? response.data : JSON.stringify(response.data));
    } catch (error) {
      setError('Failed to generate email reply. Please try again');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const cardColor1 = '#ffffff';
  const cardColor2 = '#f9f9ff';

  const usageCards = [
    { title: '⚡ Save Time', desc: 'No more overthinking replies. Generate them instantly.' },
    { title: '🧠 Intelligent Replies', desc: 'Understands the tone and context of the email to respond appropriately.' },
    { title: '🎯 Custom Tones', desc: 'Respond in a tone that fits your relationship with the recipient—Professional, Friendly, or Casual.' },
    { title: '🖱️ One Click Access', desc: 'Access the assistant directly inside Gmail with a pinned extension.' },
    { title: '🛠️ No Setup Hassle', desc: 'Just install the extension, open Gmail, and you’re ready to go.' },
    { title: '🌐 Open Source', desc: 'Explore and contribute on GitHub.' }
  ];

  const stepsCards = [
    { title: '1. Download Extension', desc: 'Download the ZIP file from the GitHub repo and unzip it locally.' },
    { title: '2. Load in Chrome', desc: 'Go to chrome://extensions → Enable Developer Mode → Load Unpacked → Select the unzipped folder.' },
    { title: '3. Open Gmail', desc: 'Pin the extension and click it while inside Gmail. It reads your email content to generate a smart reply.' },
    { title: '4. Get Your Reply', desc: 'Choose a tone (optional), click generate, and copy the smart reply back to Gmail.' }
  ];

  return (
    <Box sx={{ background: 'linear-gradient(to bottom, #e3e9f7, #d6e0f5)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Container maxWidth="lg" sx={{ flex: 1 }}>
        <Typography
          variant='h2'
          align='center'
          gutterBottom
          sx={{ fontWeight: 800, color: '#1a237e', mt: 5 }}
        >
          Smart Email Assistant
        </Typography>

        <Typography align='center' sx={{ fontSize: '1.2rem', color: '#3949ab', mb: 4 }}>
          ✨ Say goodbye to writer’s block. Draft the perfect email reply in seconds—powered by AI, tuned to your tone.
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 5 }}>
          <Button
            variant='contained'
            startIcon={<FaGithub />}
            href='https://github.com/DakshitaSingh/Email_Assistant'
            target='_blank'
            sx={{ backgroundColor: '#1f2937', '&:hover': { backgroundColor: '#111827' } }}
          >
            View on GitHub
          </Button>
        </Box>

        <Box sx={{ my: 8 }}>
          <Typography variant="h4" gutterBottom sx={{ color: '#1e3a8a' }}>
            Why Use Smart Email Assistant?
          </Typography>
          <Box display="grid" gap={3} gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }}>
            {usageCards.map((item, i) => (
              <Card
                key={i}
                sx={{
                  backgroundColor: i % 2 === 0 ? cardColor1 : cardColor2,
                  borderRadius: 3,
                  p: 2,
                  border: '1px solid #d1d5db',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    transition: '0.3s ease-in-out'
                  }
                }}
              >
                <CardContent>
                  <Typography variant="h6" sx={{ color: '#1e293b', fontWeight: 600 }}>{item.title}</Typography>
                  <Typography variant="body2" sx={{ color: '#4b5563' }}>{item.desc}</Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>

        <Box sx={{ my: 8 }}>
          <Typography variant='h4' gutterBottom sx={{ color: '#1e3a8a' }}>How to Use the Extension</Typography>
          <Box display="grid" gap={3} gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }}>
            {stepsCards.map((item, i) => (
              <Card
                key={i}
                sx={{
                  backgroundColor: i % 2 === 0 ? cardColor2 : cardColor1,
                  borderRadius: 3,
                  p: 2,
                  border: '1px solid #d1d5db',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
                    transition: '0.3s ease-in-out'
                  }
                }}
              >
                <CardContent>
                  <Typography variant="h6" sx={{ color: '#1e293b', fontWeight: 600 }}>{item.title}</Typography>
                  <Typography sx={{ color: '#475569' }}>{item.desc}</Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>

        <Box sx={{ my: 8 }}>
          <Typography variant='h4' gutterBottom sx={{ color: '#1e3a8a' }}>Generate a Smart Reply</Typography>
          <Box sx={{ mx: 1, mt: 3 }}>
            <TextField
              fullWidth
              multiline
              rows={6}
              variant='outlined'
              label="Paste your email here"
              value={emailContent}
              onChange={(e) => setEmailContent(e.target.value)}
              sx={{ mb: 3 }}
            />

            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Tone (Optional)</InputLabel>
              <Select
                value={tone}
                label="Tone (Optional)"
                onChange={(e) => setTone(e.target.value)}
              >
                <MenuItem value="">None</MenuItem>
                <MenuItem value="professional">Professional</MenuItem>
                <MenuItem value="casual">Casual</MenuItem>
                <MenuItem value="friendly">Friendly</MenuItem>
              </Select>
            </FormControl>

            <Button
              variant='contained'
              onClick={handleSubmit}
              disabled={!emailContent || loading}
              fullWidth
              sx={{ py: 1.2 }}
            >
              {loading ? <CircularProgress size={24} /> : "Generate Reply"}
            </Button>
          </Box>

          {error && (
            <Typography color='error' sx={{ mt: 3 }}>
              {error}
            </Typography>
          )}

          {generatedReply && (
            <Box sx={{ mt: 4 }}>
              <Typography variant='h6' gutterBottom>
                Generated Reply:
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={6}
                variant='outlined'
                value={generatedReply}
                inputProps={{ readOnly: true }}
              />
              <Button
                variant='outlined'
                sx={{ mt: 2 }}
                onClick={() => navigator.clipboard.writeText(generatedReply)}
              >
                Copy to Clipboard
              </Button>
            </Box>
          )}
        </Box>
      </Container>

      {/* Footer */}
      <Box sx={{ backgroundColor: '#1f2937', color: 'white', py: 3, mt: 'auto' }}>
        <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            © {new Date().getFullYear()} Smart Email Assistant — Made with ❤️ by Dakshita
          </Typography>
          <Button
            variant="text"
            href="https://github.com/DakshitaSingh/Email_Assistant"
            target="_blank"
            sx={{ color: '#9ca3af' }}
            startIcon={<FaGithub />}
          >
            GitHub Repo
          </Button>
        </Container>
      </Box>
    </Box>
  );
}

export default App;

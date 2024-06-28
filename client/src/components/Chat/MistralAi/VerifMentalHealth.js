import MistralClient from '@mistralai/mistralai';
import reportService from '../../../services/reportService';
import GetAdvice from './Advice';
import io from 'socket.io-client';

const socket = io('http://localhost:8000'); 

const apiKey = 'Jb1Pf2nx0UVg9DPXQVi70wFTiTguJP2a';
const client = new MistralClient(apiKey);

async function VerifMentalHealth(message, setMessages, messages) {
  if (message && message.trim() === '') {
    alert('Please enter a message');
    return null;
  }

  try {
    const chatResponse = await client.chat({
      model: 'mistral-large-latest',
      messages: [
        {
          role: 'system',
          content: 'You are an AI trained to analyze text and categorize the mental state of the author into four categories: "Rien à signaler" (no issues detected), "Urgent" (depression, burnout, etc.), "Très urgent" (suicidal tendencies, etc.) in french. Additionally, provide a brief description (in French, 255 characters max) of the mental state based on the following message. Structure the response as follows: Category : <category here> Practical "Description : <description here>"'
        },
        { role: 'user', content: message }
      ],
    });

    const responseContent = chatResponse.choices[0].message.content;
    console.log("Content: " + responseContent);
    let category;
    let description = extractDescription(responseContent);

    if (responseContent.includes('Très urgent')) {
      await giveAdvice(message, setMessages);
      category = 'Très urgent';
      const newReport = { userId: 2, description: description, category: category, title: "Rapport du patient", status: "SMS" };
      const createdReport = await reportService.createReport(newReport);
      return { reportId: createdReport.id };

    } else if (responseContent.includes('Urgent')) {
      await giveAdvice(message, setMessages);
      category = 'Urgent';
      const newReport = { userId: 2, description: description, category: category, title: "Rapport du patient", status: "SMS" };
      const createdReport = await reportService.createReport(newReport);
      return { reportId: createdReport.id };

    } else if (responseContent.includes('Rien à signaler')) {
      category = 'Rien à signaler';
      return { reportId: null };
    }

  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

function extractDescription(responseContent) {
  const descriptionMarker = 'Description :';
  const descriptionStart = responseContent.indexOf(descriptionMarker);

  if (descriptionStart !== -1) {
    return responseContent.substring(descriptionStart + descriptionMarker.length).trim();
  }
  return 'No specific description provided.';
}

async function giveAdvice(message, setMessages) {
  const advice = await GetAdvice(message);
  const urgentMessage = { userId: 1, content: `AI Generated: \n ${advice}`, reportId: null };
  socket.emit('message', urgentMessage);
  try {

    //const updatedMessages = await messageService.getMessages();
    //setMessages(updatedMessages);

  } catch (error) {
    console.error('Failed to create urgent message', error);
  }
}

export default VerifMentalHealth;

import MistralClient from '@mistralai/mistralai';
import reportService from '../../../services/reportService';
import GetAdvice from './Advice';
import io from 'socket.io-client';

const socket = io('http://localhost:8000'); 

const createReports = async (category, type, description) => {
  if (type === "Physique - Psychologique") {
    const physiqueReport = { userId: 2, description: description, category: category, title: "Rapport du patient", status: "SMS", type: "physique" };
    const psychologiqueReport = { userId: 2, description: description, category: category, title: "Rapport du patient", status: "SMS", type: "psychologique" };

    const [phisicalCreatedReport, psychologiqueCreatedReport] = await Promise.all([
      reportService.createReport(physiqueReport),
      reportService.createReport(psychologiqueReport)
    ]);

    return { reportId: phisicalCreatedReport.id };
  } else {
    const newReport = { userId: 2, description: description, category: category, title: "Rapport du patient", status: "SMS", type };
    const createdReport = await reportService.createReport(newReport);
    return { reportId: createdReport.id };
  }
};

async function VerifMentalHealth(message, setMessages, messages) {
  if (message && message.trim() === '') {
    alert('Please enter a message');
    return null;
  }

  try {
    const res = await fetch('http://localhost:8000/api/chat-mistral-bot', {
      method: 'POST',
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify({
        message
      })
    });
    const responseContent = await res.text();
    let category;
    let description = extractDescription(responseContent);
    let type = extractType(responseContent)

    if (responseContent.includes('Très urgent')) {
      await giveAdvice(message, setMessages);
      category = 'Très urgent';
      return await createReports(category, type, description);
    } else if (responseContent.includes('Urgent')) {
      await giveAdvice(message, setMessages);
      category = 'Urgent';
      return await createReports(category, type, description);
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

function extractType(responseContent) {
  const typeMarker = 'Type :';
  const typeStart = responseContent.indexOf(typeMarker);

  if (typeStart !== -1) {
    let type = responseContent.substring(typeStart + typeMarker.length).trim();
    type = type.replace(/["}]/g, '').trim();
    return type;
  }
  return 'No specific Type provided.';
}

async function giveAdvice(message, setMessages) {
  const advice = await GetAdvice(message);
  const urgentMessage = { userId: 1, content: `Généré par une IA: ${advice}`, reportId: null };
  socket.emit('message', urgentMessage);
  try {

    //const updatedMessages = await messageService.getMessages();
    //setMessages(updatedMessages);

  } catch (error) {
    console.error('Failed to create urgent message', error);
  }
}

export default VerifMentalHealth;

import MistralClient from '@mistralai/mistralai';
import reportService from '../../../services/reportService';

const apiKey = 'Jb1Pf2nx0UVg9DPXQVi70wFTiTguJP2a';
const client = new MistralClient(apiKey);

async function VerifMentalHealth(message) {
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

    let category;
    let description = extractDescription(responseContent);

    if (responseContent.includes('Très urgent')) {
      category = 'Très urgent';
      const newReport = { userId: 2, description: description, category: category, title: "Rapport du patient", status: "SMS" };
      const createdReport = await reportService.createReport(newReport);
      return { reportId: createdReport.id };

    } else if (responseContent.includes('Urgent')) {
      category = 'Urgent';
      const newReport = { userId: 2, description: description, category: category, title: "Rapport du patient", status: "SMS" };
      const createdReport = await reportService.createReport(newReport);
      return { reportId: createdReport.id};

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


export default VerifMentalHealth;

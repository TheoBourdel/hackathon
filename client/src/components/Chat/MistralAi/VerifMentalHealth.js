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
          content: 'You are an AI trained to analyze text and categorize the mental state of the author into four categories: "nothing to report" (no issues detected), "alarming state" (depression, burnout, etc.), "very alarming state" (suicidal tendencies, etc.). Please provide your analysis and categorization based on the following message.'
        },
        { role: 'user', content: message }
      ],
    });

    const responseContent = chatResponse.choices[0].message.content;

    let category;
    if (responseContent.includes('very alarming state')) {
      category = 'Très urgent';
      const newReport = { userId: 2, description: "Etat mentale du patient très urgent, nécessite une prise en charge", category: category, title: "Rapport du patient", status: "status" };
      const createdReport = await reportService.createReport(newReport);
      return createdReport.id;

    } else if (responseContent.includes('alarming state')) {
      category = 'urgent';
      const newReport = { userId: 2, description: "Etat mentale du patient urgent, à surveiller", category: category, title: "Rapport du patient", status: "status" };
      const createdReport = await reportService.createReport(newReport);
      return createdReport.id;

    } else if (responseContent.includes('nothing to report')) {
      category = 'Rien à signaler';
      return null;
    }

  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export default VerifMentalHealth;

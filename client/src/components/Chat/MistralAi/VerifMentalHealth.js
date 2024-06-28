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
          // content: `You are an AI trained to analyze text and categorize the mental state of the author into four categories: 
          // "Rien à signaler" (no issues detected), "Urgent" (depression, burnout, etc.), "Très urgent" (suicidal tendencies, etc.) 
          // in french. Additionally, provide a brief description (in French, 255 characters max) of the mental state based on the following 
          // message. Structure the response as follows: Category : <category here> Practical "Description : <description here>"`
          content: `You are an AI trained to analyze text and categorize both the mental and physical state of the author into four categories:
                    "Rien à signaler" (no issues detected), "Urgent" (depression, burnout, etc.), "Très urgent" (suicidal tendencies, etc.)
                    in french. Additionally, provide a brief description (in French, 255 characters max) of the mental or physical state based on 
                    the following message. Structure the response as follows:
                    Catégorie : <category here> 
                    Description : <description here> 
                    Type : <physique/psychologique>
                    Detect if the problem is psychological (trauma, depression) by labeling it "psychologique," 
                    or if the problem is physical (broken bone, stomach ache) by labeling it "physique."`
                          
        },
        { role: 'user', content: message }
      ],
    });

    const responseContent = chatResponse.choices[0].message.content;

    let category;
    let description = extractDescription(responseContent);
    let type = extractType(responseContent)

    if (responseContent.includes('Très urgent')) {
      category = 'Très urgent';
      const newReport = { userId: 2, description: description, category: category, title: "Rapport du patient", status: "SMS", type };
      const createdReport = await reportService.createReport(newReport);
      return { reportId: createdReport.id };

    } else if (responseContent.includes('Urgent')) {
      category = 'Urgent';
      const newReport = { userId: 2, description: description, category: category, title: "Rapport du patient", status: "SMS", type };
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

function extractType(responseContent) {
  const typeMarker = 'Type :';
  const typeStart = responseContent.indexOf(typeMarker);

  if (typeStart !== -1) {
    return responseContent.substring(typeStart + typeMarker.length).trim();
  }
  return 'No specific Type provided.';
}



export default VerifMentalHealth;

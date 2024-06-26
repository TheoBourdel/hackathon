import MistralClient from '@mistralai/mistralai';

const apiKey = 'Jb1Pf2nx0UVg9DPXQVi70wFTiTguJP2a';
const client = new MistralClient(apiKey);

async function VerifMentalHealth(message) {
  if (message.trim() === '') {
    alert('Please enter a message');
    return;
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
    console.log("Content: " + responseContent);

    let category;
    if (responseContent.includes('very alarming state')) {
      category = 'Très urgent';
    } else if (responseContent.includes('alarming state')) {
      category = 'urgent';
    } else if (responseContent.includes('nothing to report')) {
      category = 'Rien à signaler';
    }

    console.log("Category: " + category);

    if (category === 'Very alarming state') {
      alert('The message indicates a very alarming mental state. Please seek professional help immediately.');
    }

  } catch (error) {
    console.error('Error:', error);
  }
}

export default VerifMentalHealth;

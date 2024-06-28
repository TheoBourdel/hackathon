import MistralClient from '@mistralai/mistralai';

const apiKey = 'Jb1Pf2nx0UVg9DPXQVi70wFTiTguJP2a';
const client = new MistralClient(apiKey);

async function GetAdvice(message) {
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
          content: 'on a detecter ce message anormale,donne moi trois conseille pour ce probleme mentale (50 caratere max) :'+message
        },
        { role: 'user', content: message }
      ],
    });

    const responseContent = chatResponse.choices[0].message.content;
    console.log("Content: " + responseContent);
    return responseContent;

  } catch (error) {
    console.error('Error:', error);
  }
}

export default GetAdvice;

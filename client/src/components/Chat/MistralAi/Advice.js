async function GetAdvice(message) {
  if (message.trim() === '') {
    alert('Please enter a message');
    return;
  }

  try {
    const res = await fetch('http://localhost:8000/api/message-mistral-bot', {
      method: 'POST',
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify({
        message
      })
    });
    const responseContent = await res.text();
    const data = parseMessage(responseContent)
    return data;

  } catch (error) {
    console.error('Error:', error);
  }
}

function parseMessage(jsonString) {
  try {
    const data = JSON.parse(jsonString);

    if (data.message) {
      const steps = data.message.split('\n');
      const parsedSteps = steps.map(step => step.trim());

      return parsedSteps;
    } else {
      throw new Error("The provided JSON does not contain a 'message' key.");
    }
  } catch (error) {
    console.error("Failed to parse the message:", error);
    return null;
  }
}

export default GetAdvice;

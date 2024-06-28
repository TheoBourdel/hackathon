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
    console.log("Content_______: " + responseContent);
    return responseContent;

  } catch (error) {
    console.error('Error:', error);
  }
}

export default GetAdvice;

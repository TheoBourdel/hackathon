import { Button } from "flowbite-react";

function App() {

  async function apiCall() {
    try {
      const response = await fetch('http://localhost:8000/api');
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Button color='success' onClick={() => apiCall()}>Click me</Button>
  );
}

export default App;

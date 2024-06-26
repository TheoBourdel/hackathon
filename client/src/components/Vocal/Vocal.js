import React, { useState } from 'react';
import axios from 'axios';

const Vocal = () => {
  const [files, setFiles] = useState([]);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fonction pour gérer le changement de fichier
  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  // Fonction pour envoyer les fichiers à l'API
  const uploadFiles = async (formData) => {
    const url = 'https://api.hume.ai/v0/batch/jobs';
    const apiKey = 'oJeRhCaUXpg18g2NZC0yKouNoOurmfoTXNkPSHFEnw9hi9dR';

    try {
      setLoading(true);
      setError(null);

      const result = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-Hume-Api-Key': apiKey
        }
      });

      setResponse(result.data);
      return result.data.job_id;
    } catch (err) {
      setError('Error uploading files');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getPredictions = async (jobId) => {
    try {
      const predictionsUrl = `https://api.hume.ai/v0/batch/jobs/${jobId}/predictions`;
      const apiKey = 'oJeRhCaUXpg18g2NZC0yKouNoOurmfoTXNkPSHFEnw9hi9dR';

      const predictions = await axios.get(predictionsUrl, {
        headers: {
          'X-Hume-Api-Key': apiKey
        }
      });

      console.log(predictions.data[0].results.predictions[0].models.burst.grouped_predictions[0].predictions);
    } catch (err) {
      setError('Error fetching predictions');
      console.error(err);
    }
  };

  const handleUpload = async () => {
    try {
        if (files.length === 0) {
            setError('Please select files first');
            return;
        }

        const formData = new FormData();
        formData.append('json', JSON.stringify({
            models: {
            burst: {}
            }
        }));

        for (let i = 0; i < files.length; i++) {
            formData.append('file', files[i]);
        }

        const jobId = await uploadFiles(formData);
        if (jobId) {
                await new Promise(resolve => setTimeout(resolve, 10000));
                await getPredictions(jobId);
        }
    } catch (err) {
        setError('Error handling upload');
        console.error(err);
    }
  };

  return (
    <div>
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? 'Uploading...' : 'Upload Files'}
      </button>
      {error && <p>{error}</p>}
      {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
    </div>
  );
};

export default Vocal;

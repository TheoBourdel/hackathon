import React, { useState } from 'react';
import axios from 'axios';
import MistralClient from '@mistralai/mistralai';
import { Button, FileInput } from "flowbite-react";
import reportService from '../../services/reportService';

const Vocal = () => {
  const [files, setFiles] = useState([]);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

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

      if(predictions.data[0].results.predictions[0].models.burst.grouped_predictions.length === 0) {
        setError('Nous n\'avons pas pu détecter d\'émotions dans votre fichier audio. Veuillez réessayer.');
        setLoading(false);
        return;
      }
      const humeReport = predictions.data[0].results.predictions[0].models.burst.grouped_predictions[0].predictions

      const average = calculateAverageEmotions(humeReport);
      verifyMentalHealth(average);
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

  const verifyMentalHealth = async (humeReport) => {
    const apiKey = 'Jb1Pf2nx0UVg9DPXQVi70wFTiTguJP2a';
    const client = new MistralClient(apiKey);

    const chatResponse = await client.chat({
        model: 'mistral-large-latest',
        messages: [
          {
            role: 'system',
            content: `Je vais te fournir un rapport d'émotion sous forme de chaîne de caractères. Ce rapport contient le nom de chaque émotion accompagné d'un score. En fonction des scores des émotions les plus élevés, j'aimerais que tu détermines si l'état émotionnel général est "nothing to report", "alarming state" ou "very alarming state". Je souhaite également que tu me fournisses une description détaillée de l'état mental de la personne basée sur ces émotions. Ne mentionne pas "alarming state" si tu détermines que c'est un "very alarming state".`
          },
          { role: 'user', content: "Voici le rapport d'émotion : " + JSON.stringify(humeReport) }
        ],
    });
    setLoading(false);
    const responseContent = chatResponse.choices[0].message.content;
    console.log("Content: " + responseContent);
    let category;

    if (responseContent.includes('very alarming state')) {
      category = 'Très urgent';
      const newReport = { userId: 2, description: "Etat mentale du patient très urgent, nécessite une prise en charge", category: category, title: "Rapport du patient", status: "Audio" };
      const createdReport = await reportService.createReport(newReport);
      return createdReport.id;

    } else if (responseContent.includes('alarming state')) {
      category = 'Urgent';
      const newReport = { userId: 2, description: "Etat mentale du patient urgent, à surveiller", category: category, title: "Rapport du patient", status: "Audio" };
      const createdReport = await reportService.createReport(newReport);
      return createdReport.id;

    } else if (responseContent.includes('nothing to report')) {
      category = 'Rien à signaler';
      return null;
    }
    console.log("Category: " + category);
  }

  const calculateAverageEmotions = (report) => {
    const averageEmotions = {};
  
    report.forEach((item) => {
      item.emotions.forEach((emotion) => {
        const { name, score } = emotion;
  
        if (!averageEmotions[name]) {
          averageEmotions[name] = {
            totalScore: 0,
            count: 0,
            averageScore: 0
          };
        }

        averageEmotions[name].totalScore += score;
        averageEmotions[name].count++;
      });
    });
  
    Object.keys(averageEmotions).forEach((emotionName) => {
      const { totalScore, count } = averageEmotions[emotionName];
      averageEmotions[emotionName].averageScore = totalScore / count;
    });
  
    return averageEmotions;
  };
    

  return (
    <>
      <div className='w-max flex flex-row gap-2'>
        <FileInput id="file-upload" onChange={handleFileChange} />
          {
            files.length > 0 && (
              <Button color='gray' onClick={handleUpload} disabled={loading}>
                {loading ? 'Détection des émotions...' : 'Upload Files'}
              </Button>
            )
          }
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </>
  );
};

export default Vocal;

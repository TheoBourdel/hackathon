import React, { useEffect, useState } from 'react'
import { Select } from "flowbite-react";
import ReportList from './ReportList';

export default function Report() {

  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('--Tous--');

  useEffect(() => {
    getAllReports();
  }, [])

  const getAllReports = async () => {
    try {
      const reports = await fetch('http://localhost:8000/api/reports');
      const reportsJson = await reports.json();
      setReports(reportsJson);
      setFilteredReports(reportsJson);
    } catch (error) {
      console.log(error);
    }
  }

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    filterReportsByCategory(category);
  }

  const filterReportsByCategory = (category) => {
    if (category === '--Tous--') {
      setFilteredReports(reports);
    } else {
      const filtered = reports.filter(report => report.category === category);
      setFilteredReports(filtered);
    }
  }
  
  return (
    <>
      <div>
        <h1 className='text-custom-black text-xl font-semibold'>Rapports</h1>
        <p>Liste des rapports de santé mentale</p>
      </div>

      <div className='mt-6 mb-4 flex flex-row gap-6'>
        <Select id="categories" className='w-40' onChange={handleCategoryChange} value={selectedCategory}>
          <option>--Tous--</option>
          <option>Très urgent</option>
          <option>Urgent</option>
        </Select>
      </div>

      <div className="overflow-x-auto">
        <ReportList reports={filteredReports} />
      </div>
    </>
    )
  }
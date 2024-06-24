import React from 'react'
import { Select, Datepicker } from "flowbite-react";
import ReportList from './ReportList';

export default function Report() {
  return (
    <>
      <div>
        <h1 className='text-custom-black text-xl font-semibold'>Rapports</h1>
        <p>Liste des rapports de santé mentale</p>
      </div>

      <div className='mt-6 mb-4 flex flex-row gap-6'>
        <Select id="categories" className='w-40'>
          <option>--Tous--</option>
          <option>Très Urgent</option>
          <option>Urgent</option>
          <option>Normal</option>
        </Select>

        <Datepicker className='w-40' />

        <button>RESET FILTER</button>
      </div>

      <div className="overflow-x-auto">
        <ReportList />
      </div>
    </>
    )
  }
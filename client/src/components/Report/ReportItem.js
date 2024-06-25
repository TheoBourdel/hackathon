import React from 'react'
import { Table, Badge } from "flowbite-react";
import { Link } from 'react-router-dom'

function formatDateTime(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}h${minutes}`;
}

function getBadgeColor(category) {
    switch (category) {
        case 'Très urgent':
            return 'failure';
        case 'Urgent':
            return 'warning';
        case 'Normal':
            return 'info';
        default:
            return 'gray';
    }
  }

export default function ReportItem({ report }) {
  return (
    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            {report.User.lastname} {report.User.firstname}
        </Table.Cell>
        <Table.Cell><Badge className='w-max' color={getBadgeColor(report.category)}>{report.category}</Badge></Table.Cell>
        <Table.Cell>{formatDateTime(report.date)}</Table.Cell>
        <Table.Cell>{report.status}</Table.Cell>
        <Table.Cell>
            <Link to="/" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                DOCUMENT
            </Link>
        </Table.Cell>
    </Table.Row>
  )
}

import React from 'react'
import { Table } from "flowbite-react";
import ReportItem from './ReportItem';

export default function ReportList({ reports }) {
  return (
    <Table>
        <Table.Head>
            <Table.HeadCell>Nom / Prenom</Table.HeadCell>
            <Table.HeadCell>Catégorie</Table.HeadCell>
            <Table.HeadCell>Date</Table.HeadCell>
            <Table.HeadCell>Source</Table.HeadCell>
            <Table.HeadCell>Rapport</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
            {reports.map(
                (report, index) => (
                    <ReportItem key={index} report={report} />
                )
            )}
            {/* if reports is empty */}
            {reports.length === 0 && (
                <Table.Row>
                    <Table.Cell colSpan={5} className="text-center">Aucun rapport trouvé</Table.Cell>
                </Table.Row>
            )}
        </Table.Body>
    </Table>
  )
}

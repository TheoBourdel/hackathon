import React from 'react'
import { Table } from "flowbite-react";

export default function ReportList() {
  return (
    <Table>
        <Table.Head>
            <Table.HeadCell>Nom / Prenom</Table.HeadCell>
            <Table.HeadCell>Catégorie</Table.HeadCell>
            <Table.HeadCell>Date</Table.HeadCell>
            <Table.HeadCell>...</Table.HeadCell>
            <Table.HeadCell>Rapport</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
            
        </Table.Body>
    </Table>
  )
}

'use client'
import * as React from 'react'
import Box from '@mui/material/Box'
import BusinessRelationFrame from './BusinessRelationFrame'
import YouAreAgentFrame from './YouAreAgentFrame'
import ResignationFrame from './ResignationFrame'
import { Container } from '@mui/material'
import BillAcceptReportFrame from './BillAcceptReportFrame'
import BusinessRelationAcceptedFrame from './BusinessRelationAcceptedFrame'
import BillReportFrame from './BillReportFrame'
import JobOfferFrame from './JobOfferFrame'

export default function ReportFrame({ user, report, handleClose }) {
  return (
    <Container sx={{ maxWidth: '500px' }}>
      {report.title == 'bill' && <BillReportFrame handleClose={handleClose} />}
      {report.title == 'billAccept' && <BillAcceptReportFrame report={report} />}
      {report.title == 'businessRelation' && <BusinessRelationFrame report={report} />}
      {report.title == 'RelationAccepted' && <BusinessRelationAcceptedFrame report={report} />}
      {report.title == 'jobOffer' && <JobOfferFrame report={report} />}
      {report.title == 'resignation' && <ResignationFrame report={report} />}
      {report.title == 'YouAreAgent' && <YouAreAgentFrame />}
    </Container>
  )
}

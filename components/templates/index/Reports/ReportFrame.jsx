"use client"
import * as React from 'react';
import Box from '@mui/material/Box';
import BillReportFrame from './billReportFrame';
import BusinessRelationFrame from './BusinessRelationFrame';
import DismissalFrame from './dismissalFrame';
import JobOfferFrame from './jobOfferFrame';
import YouAreAgentFrame from './YouAreAgentFrame';
import ResignationFrame from './resignationFrame';
import { Container } from '@mui/material';


export default function ReportFrame({ user, report }) {
    return (
        <Container sx={{maxWidth:"500px"}}>
            {report.title == "bill" && <BillReportFrame report={report} />}
            {report.title == "businessRelation" && <BusinessRelationFrame report={report} />}
            {report.title == "dismissal" && <DismissalFrame />}
            {report.title == "jobOffer" && <JobOfferFrame />}
            {report.title == "resignation" && <ResignationFrame user={user} />}
            {report.title == "YouAreAgent" && <YouAreAgentFrame />}
        </Container>
    );
}

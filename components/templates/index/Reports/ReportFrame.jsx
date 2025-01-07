"use client"
import * as React from 'react';
import Box from '@mui/material/Box';
import BusinessRelationFrame from './BusinessRelationFrame';
// import DismissalFrame from './dismissalFrame';
import JobOfferFrame from './jobOfferFrame';
import YouAreAgentFrame from './YouAreAgentFrame';
import ResignationFrame from './resignationFrame';
import { Container } from '@mui/material';
import BillAcceptReportFrame from './BillAcceptReportFrame';
import BusinessRelationAcceptedFrame from './BusinessRelationAcceptedFrame';
import BillReportFrame from './BillReportFrame';


export default function ReportFrame({ user, report }) {
    return (
        <Container sx={{ maxWidth: "500px" }}>
            {report.title == "bill" && <BillReportFrame />}
            {report.title == "billAccept" && <BillAcceptReportFrame report={report} />}
            {report.title == "businessRelation" && <BusinessRelationFrame report={report} />}
            {report.title == "RelationAccepted" && <BusinessRelationAcceptedFrame report={report} />}
            {/* {report.title == "dismissal" && <DismissalFrame />} */}
            {report.title == "jobOffer" && <JobOfferFrame />}
            {report.title == "resignation" && <ResignationFrame user={user} />}
            {report.title == "YouAreAgent" && <YouAreAgentFrame />}
        </Container>
    );
}

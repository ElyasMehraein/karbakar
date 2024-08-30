import React from 'react'
import ThirdTabFrame from './ThirdTabFrame'
import { Container } from '@mui/material'

export default function ThirdTab() {
    const [requests, setRequests] = React.useState([]);

    React.useEffect(() => {
        const getRequests = async () => {
            try {
                const res = await fetch("/api/requests/myRequests/", { method: "GET" });
                if (res.status === 200) {
                    const data = await res.json();
                    const requests = data.data;
                    setRequests(requests);
                    console.log("requestrequest", requests)
                }
            } catch (error) {
                console.error("Error fetching reports:", error);
            } finally {
                //    setIsLoading(false);
            }
        };
        getRequests();
    }, []);

    return (
        <Container maxWidth="md" className="inMiddle" display="flex" align='center'>
            {/* {requests.map((request) => (
            !request.acceptedBy[0] &&
            <ThirdTabFrame request={request} key={request._id} />
            "sallllaaammmm"
          ))} */}
            "sss"
        </Container>
    )
}

import { Box, Card, CardContent, Divider } from "@material-ui/core";
import React from "react";
import ServiceAPI from '../../api/ServiceAPI';
import EnlacesListComponent from './FAQ/EnlacesListComponent';
import FAQListComponent from './FAQ/FAQListComponent';

const FAQEnlacesComponent = () => {
    const [links, setLinks] = React.useState([]);
    const [faqs, setFaqs] = React.useState([]);
    const api = new ServiceAPI();

    const fetchFAQs = async () => {
        const res = await api.createRequest().get('faq');
        
        setFaqs(res.data);
    }

    const fetchLinks = async () => {
        const res = await api.createRequest().get('links');
        
        setLinks(res.data);
    }
    React.useEffect(() => {
        fetchFAQs();
        fetchLinks();
    }, []);

    return (
        <Box pr={4} data-testid="panel_faq_enlaces">
            <Card>
                <CardContent>
                    <FAQListComponent faqs={faqs}/>

                    <Divider/>

                    <EnlacesListComponent links={links}/>
                </CardContent>
            </Card>
        </Box>
    );
}

export default FAQEnlacesComponent;
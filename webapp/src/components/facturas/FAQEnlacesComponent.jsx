import { Box, Card, CardContent, Divider } from "@material-ui/core";
import React from "react";
import { FAQService, LinksService } from '../../api/';
import EnlacesListComponent from './FAQ/EnlacesListComponent';
import FAQListComponent from './FAQ/FAQListComponent';

const faqService = new FAQService();
const linksService = new LinksService();

const FAQEnlacesComponent = () => {
    const [links, setLinks] = React.useState([]);
    const [faqs, setFaqs] = React.useState([]);

    const fetchFAQs = async () => {
        const faqsServiceResponse = await faqService.make(); 
        setFaqs(faqsServiceResponse);
    }

    const fetchLinks = async () => {
        const linksServiceResponse = await linksService.make(); 
        setLinks(linksServiceResponse);
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
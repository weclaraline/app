import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import propTypes from "prop-types";
import React from "react";

const FAQListComponent = ({ faqs }) => {
    const listContent = (
        <div data-testid='faqs-list'>
             {faqs.map(faq => (
                <Accordion key={faq.id}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                    >
                        <Typography variant="subtitle1">
                            {faq.question}
                        </Typography>
                    </AccordionSummary>

                    <AccordionDetails>
                        <Typography variant="body2">
                            {faq.answer}
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            ))}
        </div>
    );
    const noContent = (
        <Typography variant="h6" align="left" gutterBottom>
            No se encontraron resultados
        </Typography>
    );

    const mainContent = faqs.length ? listContent : noContent;

    return (
        <Box mb={2}>
            <Typography variant="h5" align="left" gutterBottom>
                Preguntas frecuentes
            </Typography>

            {mainContent}
        </Box>
    );
}

FAQListComponent.propTypes = {
    faqs: propTypes.array
}

export default FAQListComponent;
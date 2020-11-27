import React from "react";
import propTypes from "prop-types";
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import LinkIcon from '@material-ui/icons/Link';

const EnlacesListComponent = ({ links }) => {
    const listContent = (
        <List disablePadding  data-testid='links-list'>
            {links.map(link => (
                <ListItem key={link.id} >
                    <ListItemIcon>
                        <LinkIcon />
                    </ListItemIcon>
                    <ListItemText>
                        <Link href={link.link}>
                            {link.description || "Link"}
                        </Link>
                    </ListItemText>
                </ListItem>
            ))}
        </List>
    );
    const noContent = (
        <Typography variant="h6" align="left" gutterBottom>
            No se encontraron resultados
        </Typography>
    );

    const mainContent = links.length ? listContent : noContent;

    return (
        <Box mt={1}>
            <Typography variant="h5" align="left" gutterBottom>
                Links de soporte
            </Typography>

            {mainContent}
        </Box>
    );
}


EnlacesListComponent.propTypes = {
    links: propTypes.array
}

export default EnlacesListComponent;
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Chip from '@material-ui/core/Chip';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {ThumbUp, Star} from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';

let tags;
const useStyles = theme => ({
    card: {
        maxWidth: 345,
        margin: '50px auto',
        justifyContent: "space-around",
    },
    media: {
        height: 200,
    },
    cardActions: {
        justifyContent: "center",
    },
    button: {
        minWidth: "100%",
        fontSize: "1.2em",
        borderBottom: "1px solid #eee",
    },
    iconSection: {
        display: "inline-flex",
        justifyContent: "center",
    },
    h6: {
        marginRight: "5px",
    }
});

class SearchResults extends Component {

    updateSavedResultsC2 = (event, res) => {
        this.props.updateSavedResultsC1(event, res);
    }

    updateTags(res) {
        tags = res.tags.split(',');
    }

    render() {
        let imageListContent;

        const {results, classes} = this.props;

        if (results){
            imageListContent = (
                results.map((res, i) => (
                    <Card key={`${i}-result`} className={classes.card}>
                        <CardMedia
                            className={classes.media}
                            image={res.webformatURL}
                            title={`used from ${res.webformatURL}`}
                        />
                        <Button onClick={(event) => this.updateSavedResultsC2(event, res)} className={classes.button} color="primary">
                            Save
                        </Button>
                        <CardActions>
                            <Grid item xs={6} className={classes.iconSection}>
                                <Typography variant="h6" gutterBottom className={classes.h6}>{res.likes}</Typography>
                                <ThumbUp></ThumbUp>
                            </Grid>
                            <Grid item xs={6} className={classes.iconSection}>
                                <Typography variant="h6" gutterBottom className={classes.h6}>{res.favorites}</Typography>
                                <Star></Star>
                            </Grid>
                        </CardActions>
                        <CardActions className={classes.cardActions}>
                            {this.updateTags(res)}
                            {tags.map((tag, i) => (
                                <Chip key={`${tag}-${i}`} label={tag} color="primary"/>
                            ))}
                        </CardActions>
                    </Card>
                ))
            )

        }else{
            imageListContent = null;
        }

        return (
        <div>
            {imageListContent}
        </div>
        )
    }
}

SearchResults.propTypes = {
    results:PropTypes.array.isRequired
}

export default withStyles(useStyles)(SearchResults);
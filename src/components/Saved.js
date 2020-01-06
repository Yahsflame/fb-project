import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { withStyles } from '@material-ui/core/styles';

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

class Saved extends Component {
    state = {
        newSaves: this.props.savedResults
    }

    componentDidUpdate(nextProps) {
        if(this.props !== nextProps){
            this.setState(prevState => ({
                newSaves: [...prevState.newSaves.concat(this.props.savedResults)]
            }))
        }
    }

    render() {
        let savedContent;

        savedContent = (
            this.state.newSaves.map((result, i) => (
                <div key={`result-${i}`}>
                    <Typography>
                        <Link target="_blank" href={result.largeImageURL}>
                            #ID {result.id}
                        </Link>
                    </Typography>
                </div>
            ))
        )

        return (
        <div>
            <Typography variant="h5" gutterBottom>Your saved images</Typography>
            {savedContent}
        </div>
        )
    }
}

Saved.propTypes = {
    savedResults:PropTypes.array.isRequired
}

export default withStyles(useStyles)(Saved);
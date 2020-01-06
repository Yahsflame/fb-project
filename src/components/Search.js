import React,  { Component } from 'react';
import SearchResults from './SearchResults';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';

const useStyles = theme => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: 200,
      },
    },
    button: {
        margin: 'auto',
        fontSize: '1em',
        padding: '20px 60px',
    },
});

class Search extends Component {
    constructor(props){
        super(props);
        this.state = {
            searchText:'',
            amount:10,
            apiUrl: 'https://pixabay.com/api',
            apiKey: '13136421-266c28a6d61717bc2e4e6a83e',
            images:[],
            categories: [
                {
                value: 'fashion',
                label: 'fashion',
                },
                {
                value: 'nature',
                label: 'nature',
                },
                {
                value: 'backgrounds',
                label: 'backgrounds',
                },
                {
                value: 'science',
                label: 'science',
                },
                {
                    value: 'education',
                    label: 'education',
                },
                {
                    value: 'people',
                    label: 'people',
                },
                {
                    value: 'feelings',
                    label: 'feelings',
                },
                {
                    value: 'religion',
                    label: 'religion',
                },
                {
                    value: 'health',
                    label: 'health',
                },
                {
                    value: 'places',
                    label: 'places',
                },
                {
                    value: 'animals',
                    label: 'animals',
                },
                {
                    value: 'industry',
                    label: 'industry',
                },
                {
                    value: 'food',
                    label: 'food',
                },
                {
                    value: 'computer',
                    label: 'computer',
                },
                {
                    value: 'sports',
                    label: 'sports',
                },
                {
                    value: 'transportation',
                    label: 'transportation',
                },
                {
                    value: 'travel',
                    label: 'travel',
                },
                {
                    value: 'buildings',
                    label: 'buildings',
                },
                {
                    value: 'business',
                    label: 'business',
                },
                {
                    value: 'music',
                    label: 'music',
                },
            ],
            categorySelection: '',
            isDisabled: true,
        };
        
        this.sortCategories();
    }

    sortCategories = () => {
        this.setState.categories = this.state.categories.sort((a, b) => (a.value > b.value) ? 1 : (a.value === b.value) ? ((a.label > b.label) ? 1 : -1) : -1 );
    };

    updateSavedResultsC1 = (event, res) => {
        this.props.updateSavedResults(event, res);
    }

    handleChange = (e) => {
        const lowercaseKeyword = e.target.value.toLowerCase();
        this.setState({searchText: lowercaseKeyword});
    };

    handleSelect = (e) => {
        this.setState({categorySelection: e.target.value});
    };

    handleSubmit = () => {
        axios.get(`${this.state.apiUrl}/?key=${this.state.apiKey}&q=${this.state.searchText}&category=${this.state.categorySelection}&image_type=photo&per_page=${this.state.amount}`)
        .then(res =>this.setState({images:res.data.hits}))
        .catch(err=> console.log(err));
    };

    componentDidUpdate(prevProps, prevState, snapshot){
        if(this.state.searchText !== prevState.searchText || this.state.categorySelection !== prevState.categorySelection){
            if(this.state.searchText !== '' && this.state.categorySelection !== ''){
                this.setState({isDisabled: false});
            } else {
                this.setState({isDisabled: true});
            }
        }
    };

    render() {
        const { classes } = this.props;
        return (
            <div className='Search'>
                <form className={classes.root} noValidate autoComplete="off">
                    <Grid container >
                        <Grid item xs={12}>
                            <TextField 
                            id="outlined-basic" 
                            label="Keyword..." 
                            variant="outlined"
                            onChange={this.handleChange}
                            value={this.state.searchText.trim()} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                            id="outlined-select-currency"
                            select
                            label="Select"
                            value={this.state.categorySelection}
                            onChange={this.handleSelect}
                            helperText={this.state.categorySelection !== '' ? "" : "Please select your category"}
                            variant="outlined"
                            >
                            {this.state.categories.map(option => (
                                <MenuItem key={option.value} value={option.value}>
                                {option.label}
                                </MenuItem>
                            ))}
                            </TextField>
                        </Grid>
                        <Button disabled={this.state.isDisabled} onClick={this.handleSubmit} className={classes.button} variant="contained" color="primary">
                            Search
                        </Button>
                    </Grid>
                </form>
                {this.state.images.length > 0 ? (<SearchResults updateSavedResultsC1={this.updateSavedResultsC1.bind(this)} results={this.state.images}/>) : null}
            </div>
        );
    }
}

export default withStyles(useStyles)(Search);
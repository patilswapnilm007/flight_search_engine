import React, { useState } from 'react';
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import TextField from '@material-ui/core/TextField';
import Slider from '@material-ui/core/Slider';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
const useStyles = makeStyles((theme) => ({
    root: {
        margin: '5px 5px',
        '& > *': {
            margin: '5px 5px',
            width: '100%',
        },
    },
    sliderClass: {
        margin: '36px 10px',
        width: '90%'
    }
}));
export default function SearchForm(props) {
    const [source, setSource] = useState('');
    const [destination, setDestination] = useState('');
    const [deprtDate, setDeprtDate] = useState(null);
    const [price, setPrice] = useState([0, 10000]);
    const [passengers, setPassengers] = useState(1);


    const classes = useStyles();
    const handleChange = (event) => {
        if (event.target.id === 'source')
            setSource(event.target.value);
        else if (event.target.id === 'destination')
            setDestination(event.target.value);
    }
    const handleSeachAction = () => {
        props.onSearch({ src: source, dest: destination, departdate: deprtDate && deprtDate.toLocaleDateString(), price: price, passengers: passengers })
    }
    const handleReset = () => {
        setSource('');
        setDestination('');
        setDeprtDate(null);
        setPrice([0, 10000]);
        setPassengers(1);
        props.onSearch({ src: '', dest: '', departdate: null, price: [0, 10000], passengers: 1 })
    }
    const createMenuItems = () => {
        return Array.from(Array(11).keys()).map((val) => {
            return val <= 0 ? null : (<MenuItem value={val}>{val}</MenuItem>);
        });
    }

    return (
        <>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField id="source" value={source} label="Source City" placeholder="Enter Origin City" onChange={handleChange} />
                <TextField id="destination" value={destination} label="Destination City" placeholder="Enter Destination City" onChange={handleChange} />
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DatePicker
                        label="Departure Date"
                        value={deprtDate}
                        onChange={(date) => { setDeprtDate(date); }}
                        animateYearScrolling
                        variant='inline'
                        format="dd/MM/yyyy"
                        minDate={new Date()}
                    />
                </MuiPickersUtilsProvider>

                <InputLabel id="passengers">Passengers</InputLabel>
                <Select
                    labelId="passengers"
                    id="passengers-select"
                    value={passengers}
                    onChange={(event) => setPassengers(event.target.value)}
                    variant={'outlined'}
                >
                    {createMenuItems()}
                </Select>

                <Button variant="outlined" color="primary" onClick={handleSeachAction}>
                    Search
                </Button>
                <Button variant="outlined" color="primary" onClick={handleReset}>
                    Reset Search
                </Button>
            </form>
            <div className='Refine-Search' style={{
                margin: '45px 5px 0px 0px',
                border: '2px solid #cec9c9',
                borderRadius: '12px',
                boxSizing: 'border-box'
            }}>
                <h3 style={{
                    textAlign: 'left',
                    margin: '0px 14px'
                }}>Refine flight search</h3>
                <Slider
                    className={classes.sliderClass}
                    value={price}
                    onChange={(e, priceRange) => {
                        setPrice(priceRange);
                        handleSeachAction();
                    }}
                    valueLabelDisplay="auto"
                    max={15000}
                    min={0}
                    step={500}
                    marks={true}
                />
            </div>
        </>
    )

}
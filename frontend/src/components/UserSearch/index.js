import React from 'react';
import PropTypes from 'prop-types';
import { Paper, Input } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Box from "@material-ui/core/Box";



const SearchInput = props => {
    const { className, onChange, style, ...rest } = props;


    return (
        <Box boxShadow={3}>
        <Paper
            {...rest}

        >
            <SearchIcon  />
            <Input
                {...rest}

                disableUnderline
                onChange={onChange}
            />
        </Paper></Box>
    );
};

SearchInput.propTypes = {
    className: PropTypes.string,
    onChange: PropTypes.func,
    style: PropTypes.object
};

export default SearchInput;

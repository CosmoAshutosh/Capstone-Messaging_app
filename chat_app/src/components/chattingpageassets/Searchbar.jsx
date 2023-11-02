import React from "react";
import { InputBase, styled } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

function Searchbar() {
     const Search = styled('div')(({ theme }) => ({
          position: 'relative',
          backgroundColor: 'white',
          borderRadius: '10px',
          marginLeft: 0,
          marginRight: '5px',
          width: '100%',
     }));

     const SearchIconWrapper = styled('div')(({ theme }) => ({
          padding: theme.spacing(0, 2),
          height: '100%',
          position: 'absolute',
          pointerEvents: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
     }));

     const StyledInputBase = styled(InputBase)(({ theme }) => ({
          color: 'inherit',
          '& .MuiInputBase-input': {
               padding: theme.spacing(1, 1, 1, 0),
               // vertical padding + font size from searchIcon
               paddingLeft: `calc(1em + ${theme.spacing(4)})`,
               // transition: theme.transitions.create('width'),
               width: '100%',
               [theme.breakpoints.up('sm')]: {
                    width: '100%',
                    '&:focus': {
                         width: '100%',
                    },
               },
          },
     }));

     return (
          <Search>
               <SearchIconWrapper>
                    <SearchIcon />
               </SearchIconWrapper>
               <StyledInputBase
                    placeholder="Search for user or rooms"
                    inputProps={{ 'aria-label': 'search' }}
                    id="Searcharea"
               />
          </Search>
     );

}

export default Searchbar;
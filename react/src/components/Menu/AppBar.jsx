import React, { useState, useEffect } from 'react';
import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';
import Drawer from '@mui/joy/Drawer';
import Input from '@mui/joy/Input';
import List from '@mui/joy/List';
import ListItemButton from '@mui/joy/ListItemButton';
import Typography from '@mui/joy/Typography';
import ModalClose from '@mui/joy/ModalClose';
import Search from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../Redux/reducers/ItemReducer';

export default function MyMenu() {
  const categories = useSelector((state) => state.categories.ListCategories);
  const dispatch = useDispatch();
  const nav = useNavigate();

  const handleCategoryClick = async (categoryId) => {
    dispatch({ type: 'GET_CATEGORY', payload: { categoryId } });
    setOpen(false);
  };

  const [open, setOpen] = useState(false);

  return (
    <>
      <React.Fragment>
        <IconButton variant="outlined" color="neutral" onClick={() => {
          dispatch({ type: 'GET_CATEGORY' });
          setOpen(true);
        }}>
          <img src="/icons-menu-16.png" />
        </IconButton>
        <Drawer open={open} onClose={() => setOpen(false)}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              ml: 'auto',
              mt: 1,
              mr: 2,
            }}
          >
            <Typography
              component="label"
              htmlFor={<img src="/icons-x.gif" />}
              fontSize="sm"
              fontWeight="lg"
              sx={{ cursor: 'pointer' }}
            >
              Close
            </Typography>
            <ModalClose id="close-icon" sx={{ position: 'initial' }} />
          </Box>
          <Input
            size="sm"
            placeholder="Search"
            variant="plain"
            endDecorator={<img src="/icons-search-32.png"  />}
            slotProps={{
              input: {
                'aria-label': 'Search anything',
              },
            }}
            sx={{
              m: 3,
              borderRadius: 0,
              borderBottom: '2px solid',
              borderColor: 'neutral.outlinedBorder',
              '&:hover': {
                borderColor: 'neutral.outlinedHoverBorder',
              },
              '&::before': {
                border: '1px solid var(--Input-focusedHighlight)',
                transform: 'scaleX(0)',
                left: 0,
                right: 0,
                bottom: '-2px',
                top: 'unset',
                transition: 'transform .15s cubic-bezier(0.1,0.9,0.2,1)',
                borderRadius: 0,
              },
              '&:focus-within::before': {
                transform: 'scaleX(1)',
              },
            }}
          />
          <List
            size="lg"
            component="nav"
            sx={{
              flex: 'none',
              fontSize: 'xl',
              '& > div': { justifyContent: 'center' },
            }}
          >
            {categories.map((category) => (
              <Button
                key={category.id}
                variant="text"
                onClick={() => handleCategoryClick(category.id)}
              >
                <span className="material-symbols-outlined">{category.icon}</span>
                <ListItemButton sx={{ textAlign: 'left' }}>{category.name}</ListItemButton>
              </Button>
            ))}
          </List>
        </Drawer>
      </React.Fragment>
    </>
  );
}

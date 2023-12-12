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
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useNavigate, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Cards from '../Useful/Cards';

export default function MyMenu() {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [projects, setProjects] = useState([]);
  const nav = useNavigate();

  const fetchProjectsByCategory = async (categoryId) => {
    try {
      const response = await axios.get(`http://localhost:8585/api/projects/getByCategory/${categoryId}`);
      console.log('Projects Response:', response);
      setProjects(response.data);
      nav(`/Cards/${categoryId}`);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8585/api/categories/getCategoris');
        console.log('Categories Response:', response);
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      <React.Fragment>
        <IconButton variant="outlined" color="neutral" onClick={() => setOpen(true)}>
          <span className="material-symbols-outlined">menu_open</span>
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
              htmlFor="close-icon"
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
            endDecorator={<Search />}
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
                onClick={() => {
                  setSelectedCategory(category.id);
                  fetchProjectsByCategory(category.id);
                }}
              >
                <span className="material-symbols-outlined">{category.icon}</span>
                <ListItemButton>{category.name}</ListItemButton>
              </Button>
            ))}
          </List>
        </Drawer>
      </React.Fragment>

      <Routes>
        <Route path="/Cards/:categoryId" element={<Cards projects={projects} />} />
      </Routes>
    </>
  );
}

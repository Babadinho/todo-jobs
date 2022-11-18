import axios from 'axios';

export const addNote = async (userId: any, noteDetails: any, token: any) =>
  await axios.post(
    `${process.env.REACT_APP_URL}/add-note/${userId}`,
    noteDetails,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const deleteNote = async (userId: any, noteDetails: any, token: any) =>
  await axios.post(
    `${process.env.REACT_APP_URL}/delete-note/${userId}`,
    noteDetails,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );

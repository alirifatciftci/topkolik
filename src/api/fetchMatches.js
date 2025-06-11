import axios from 'axios';

const API_KEY = '8z7CqxaM83SxXKxjn2CLPMjuhPWnFGi5PuALZgqJ5c2U4tAo26ynoHhxLbjh';
const today = new Date().toISOString().slice(0, 10);

// include=participants;league ile takım ve lig detaylarını çekiyoruz
const API_URL = `https://api.sportmonks.com/v3/football/fixtures?api_token=${API_KEY}&leagues=600&date=${today}&include=participants;league;scores;events`;

export const fetchMatches = async () => {
  try {
    const response = await axios.get(API_URL, {
      headers: { 'Accept': 'application/json' },
    });
    return response.data.data;
  } catch (error) {
    console.error('Maç verisi alınamadı:', error.response?.data || error.message);
    return [];
  }
};
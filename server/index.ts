import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';

const app = express();
app.use(cors());
app.use(express.json());

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials. Please set SUPABASE_URL and SUPABASE_ANON_KEY.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Helper to transform car from DB to API format
const transformCar = (car: any) => ({
  id: car.id,
  name: car.name,
  ownerId: car.owner_id,
  roundtripCost: parseFloat(car.roundtrip_cost)
});

// Helper to transform commute from DB to API format
const transformCommute = (c: any) => ({
  id: c.id,
  date: c.date,
  tripType: c.trip_type,
  selectedCars: c.selected_cars,
  selectedPersons: c.selected_persons,
  drivers: c.drivers,
  pricePerPerson: parseFloat(c.price_per_person)
});

// Cars API
app.get('/api/cars', async (req, res) => {
  const { data, error } = await supabase.from('cars').select('*').order('id');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data.map(transformCar));
});

app.post('/api/cars', async (req, res) => {
  const { name, ownerId, roundtripCost } = req.body;
  const { data, error } = await supabase
    .from('cars')
    .insert([{ name, owner_id: ownerId, roundtrip_cost: roundtripCost }])
    .select()
    .single();
  if (error) return res.status(500).json({ error: error.message });
  res.json(transformCar(data));
});

app.delete('/api/cars/:id', async (req, res) => {
  const { error } = await supabase.from('cars').delete().eq('id', parseInt(req.params.id));
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true });
});

// Persons API
app.get('/api/persons', async (req, res) => {
  const { data, error } = await supabase.from('persons').select('*').order('id');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.post('/api/persons', async (req, res) => {
  const { name } = req.body;
  const { data, error } = await supabase
    .from('persons')
    .insert([{ name }])
    .select()
    .single();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.delete('/api/persons/:id', async (req, res) => {
  const { error } = await supabase.from('persons').delete().eq('id', parseInt(req.params.id));
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true });
});

// Commutes API
app.get('/api/commutes', async (req, res) => {
  const { data, error } = await supabase.from('commutes').select('*').order('date', { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  res.json(data.map(transformCommute));
});

app.post('/api/commutes', async (req, res) => {
  const { date, tripType, selectedCars, selectedPersons, drivers, pricePerPerson } = req.body;
  const { data, error } = await supabase
    .from('commutes')
    .insert([{
      date,
      trip_type: tripType,
      selected_cars: selectedCars,
      selected_persons: selectedPersons,
      drivers,
      price_per_person: pricePerPerson
    }])
    .select()
    .single();
  if (error) return res.status(500).json({ error: error.message });
  res.json(transformCommute(data));
});

app.delete('/api/commutes/:id', async (req, res) => {
  const { error } = await supabase.from('commutes').delete().eq('id', parseInt(req.params.id));
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true });
});

const PORT = 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

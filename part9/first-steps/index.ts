import express from 'express';
const app = express();
import calculateBmi from './bmiCalculator';
import calculateExercise from './exerciseCalculator';

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full stack');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (!height || !weight) {
    res.send({ error: 'parameter missing' }).status(400);
  }

  if (isNaN(weight) || isNaN(weight)) {
    res.send({ error: 'malformated parameters' }).status(400);
  }
  const bmi = calculateBmi(height, weight);
  res.send({
    height,
    weight,
    bmi
  });
});

app.post('/exercises', (req, res) => {
  const target: number = req.body.target;
  const dailyExercises: number[] = req.body.daily_exercises;

  if (!target || !dailyExercises) {
    res.send({ error: 'parameter missing' }).status(400);
  }

  if (isNaN(target) || dailyExercises.some(isNaN)) {
    res.send({ error: 'malformated parameter' });
  }

  const exercise = calculateExercise(target, dailyExercises);
  res.send(exercise);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

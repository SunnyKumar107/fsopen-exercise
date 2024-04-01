interface CalculateExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercise = (
  target: number,
  dailyExercises: number[]
): CalculateExerciseResult => {
  const periodLength = dailyExercises.length;
  const trainingDays = dailyExercises.filter((val) => val !== 0).length;
  const average = dailyExercises.reduce((a, b) => a + b) / periodLength;
  const success = average >= target;

  const rates = (average: number, target: number): number => {
    const myRating = average / target;
    if (myRating >= 1) {
      return 3;
    } else if (myRating >= 0.9) {
      return 2;
    } else {
      return 1;
    }
  };
  const rating = rates(average, target);

  const description = (rating: number): string => {
    if (rating === 1) {
      return 'bad';
    } else if (rating === 2) {
      return 'not too bad but could be better';
    } else if (rating === 3) {
      return 'Excellent';
    } else {
      return 'something gone wrong!';
    }
  };
  const ratingDescription = description(rating);

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  const target: number = Number(process.argv[2]);
  const dailyExercises: number[] = process.argv
    .slice(3, process.argv.length)
    .map((val) => Number(val));
  console.log(dailyExercises);
  console.log(calculateExercise(target, dailyExercises));
} catch (error: unknown) {
  let errorMessage = 'someting bad happend';
  if (error instanceof Error) {
    errorMessage += 'error' + error.message;
  }
  console.log(errorMessage);
}

export default calculateExercise;

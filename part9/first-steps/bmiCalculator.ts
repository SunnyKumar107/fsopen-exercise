const calculateBmi = (height: number, weigth: number) => {
  const CM_TO_INCHES = 0.394;
  const KG_TO_POUNDS = 2.205;

  if (height === 0) {
    throw new Error(
      'Height cannot be less than 1. Please provide a valid height value.'
    );
  }

  const heightInInches: number = height * CM_TO_INCHES;
  const weigthInPounds: number = weigth * KG_TO_POUNDS;

  const bmi: number = (weigthInPounds / heightInInches ** 2) * 703;

  const UNDERWEIGHT_THRESHOLD = 19;
  const NORMAL_THRESHOLD = 25;
  const OVERWEIGHT_THRESHOLD = 30;

  let bmiCategory: string;

  if (bmi < UNDERWEIGHT_THRESHOLD) {
    bmiCategory = 'Underweight';
  } else if (bmi < NORMAL_THRESHOLD) {
    bmiCategory = 'Normal (healtyhy weight)';
  } else if (bmi < OVERWEIGHT_THRESHOLD) {
    bmiCategory = 'Overweight';
  } else {
    bmiCategory = 'Obese';
  }

  return bmiCategory;
};

try {
  const heightInCm: number = Number(process.argv[2]);
  const weightInKg: number = Number(process.argv[3]);
  console.log(calculateBmi(heightInCm, weightInKg));
} catch (error: unknown) {
  let errorMessage = 'something wrong happend';
  if (error instanceof Error) {
    errorMessage += 'Error:' + error.message;
  }
  console.log(errorMessage);
}

export default calculateBmi;

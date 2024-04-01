import Part from "./Part";

const Content = ({ parts }) => {
  const sumExercises = parts.reduce((total, part) => total + part.exercises, 0);

  //   const arr = parts.map((part) => part.exercises);
  //   let exer = 0;
  //   for (let i = 0; i < arr.length; i++) {
  //     exer += arr[i];
  //   }

  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
      <h3>total of {sumExercises} exercises</h3>
    </div>
  );
};

export default Content;

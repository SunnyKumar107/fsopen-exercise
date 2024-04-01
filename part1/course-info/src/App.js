const Header = ({ course }) => {
  return <h1>{course}</h1>;
};

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercise}
    </p>
  );
};

const Content = ({ part }) => {
  return (
    <>
      <Part part={part[0]} />
      <Part part={part[1]} />
      <Part part={part[2]} />
    </>
  );
};

const Total = ({ part }) => {
  return (
    <p>
      Number of exercises{" "}
      {part[0].exercise + part[1].exercise + part[2].exercise}
    </p>
  );
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    part: [
      {
        name: "Fundamentals of React",
        exercise: 10,
      },
      {
        name: "Using props to pass data",
        exercise: 7,
      },
      {
        name: "State of a component",
        exercise: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course.name} />
      <Content part={course.part} />
      <Total part={course.part} />
    </div>
  );
};

export default App;

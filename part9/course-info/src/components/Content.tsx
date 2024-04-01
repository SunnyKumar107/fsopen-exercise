import Part from "./Part";
import { CoursePart } from "../types";

interface ContentProps {
  courseParts: CoursePart[];
}

const Content = (props: ContentProps): JSX.Element => {
  return (
    <div>
      {props.courseParts.map((part, id) => (
        <Part key={id} part={part} />
      ))}
    </div>
  );
};

export default Content;

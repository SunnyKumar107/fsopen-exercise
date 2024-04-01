import { CoursePart } from "../types";

interface PartProps {
  part: CoursePart;
}

const Part = (props: PartProps): JSX.Element | undefined => {
  switch (props.part.kind) {
    case "basic":
      return (
        <div>
          <b>
            {props.part.name} {props.part.exerciseCount}
          </b>{" "}
          <br />
          <i>{props.part.description}</i>
          <br />
          <br />
        </div>
      );
    case "background":
      return (
        <div>
          <b>
            {props.part.name} {props.part.exerciseCount}
          </b>
          <br />
          <i>{props.part.description}</i>
          <br />
          <span>
            submit to{" "}
            <a href={props.part.backgroundMaterial}>
              {props.part.backgroundMaterial}
            </a>
          </span>
          <br />
          <br />
        </div>
      );
    case "group":
      return (
        <div>
          <b>
            {props.part.name} {props.part.exerciseCount}
          </b>
          <br />
          <span>Project exercises {props.part.groupProjectCount}</span>
          <br />
          <br />
        </div>
      );
    case "special":
      return (
        <div>
          <b>
            {props.part.name} {props.part.exerciseCount}
          </b>
          <br />
          <i>P {props.part.description}</i>
          <br />
          required skills:{" "}
          {props.part.requirements.map((skill) => (
            <span key={skill}>{skill}, </span>
          ))}
          <br />
          <br />
        </div>
      );
    default:
      break;
  }
};

export default Part;

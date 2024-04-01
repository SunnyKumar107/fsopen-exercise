interface WelcomeProps {
  name: string;
}

const Header = (props: WelcomeProps): JSX.Element => {
  return <h1>{props.name}</h1>;
};

export default Header;

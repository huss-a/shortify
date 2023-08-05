import ShotifySvg from "../assets/shortify-logo.svg";

const Header = () => {
    return (
        <div className="header">
            <img className="logo" src={ShotifySvg} />
            <h4>Shorten URLs on the go!</h4>
        </div>
    );
};
export default Header;

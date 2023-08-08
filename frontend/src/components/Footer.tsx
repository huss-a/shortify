import shortifySvg from "../assets/shortify-logo.svg";
import githubSvg from "../assets/icon_github.svg";
import twtrSvg from "../assets/icon_twitter.svg";

const Footer = () => {
    return (
        <div className="footer">
            <img src={shortifySvg} className="logo" />
            <div className="info">
                <h4>Developed by Hussain Akil</h4>
                <span>
                    <a href="https://github.com/huss-a" target="_blank">
                        <img src={githubSvg} />
                    </a>{"|"}
                    <a href="https://twitter.com/huss_aq" target="_blank">
                        <img src={twtrSvg} />{" "}
                    </a>
                </span>
            </div>
        </div>
    );
};
export default Footer;

import { MouseEvent, useRef, useState } from "react";
import { toast } from "react-toastify";
import CopyIcon from "../assets/icon_copy.svg";
import axios from "axios";
import Loader from "./Loader";

const InputBox = () => {
    const [link, setLink] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isUrlValid, setIsUrlValid] = useState(false);

    const inputBoxRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleGetLink = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const urlToShorten = inputRef.current?.value;
        if (urlToShorten) {
            setIsLoading(true);
            const res = await axios
                .post(`${import.meta.env.VITE_SERVER_URL}/shorten`, {
                    url: urlToShorten,
                })
                .catch(err => {
                    toast.error(err.message, { autoClose: 900 });
                    setIsLoading(false);
                });
            const urlUid: string = res!.data.urlUid;
            setLink(`${import.meta.env.VITE_SERVER_URL}/${urlUid}`);
            setIsLoading(false);
        }
    };

    const copyToClipboard = async () => {
        await navigator.clipboard.writeText(link).catch(toast.error);
    };

    const checkUrlValidity = () => {
        const urlRegExp =
            /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z0]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/gm;
        if (urlRegExp.test(inputRef.current?.value || "")) setIsUrlValid(true);
        else setIsUrlValid(false);
    };

    return (
        <div className="input-box" ref={inputBoxRef}>
            <div className="input-button-container">
                <input
                    ref={inputRef}
                    type="url"
                    onChange={checkUrlValidity}
                    placeholder="https://youtu.be/dQw4w9WgXcQ"
                />
                <button
                    disabled={!isUrlValid}
                    className={isLoading ? "get-link-btn-ld" : "get-link-btn"}
                    onClick={!isLoading ? handleGetLink : undefined}
                >
                    {isLoading ? <Loader /> : <>Get Link</>}
                </button>
            </div>

            <div>
                <h2>
                    {link && (
                        <>
                            <a href={link} target="_blank">
                                {link}
                            </a>{" "}
                            <img
                                onClick={copyToClipboard}
                                id="icon-copy"
                                src={CopyIcon}
                            />
                        </>
                    )}
                </h2>
            </div>
        </div>
    );
};
export default InputBox;

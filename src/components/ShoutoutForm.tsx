import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { FormEvent, useContext, useRef, useState } from "react";
import AuthContext from "../context/AuthContext";
import { storage } from "../firebaseConfig";
import Shoutout from "../models/Shoutout";
import "./ShoutoutForm.css";

interface Props {
  onAddShoutout: (shoutout: Shoutout) => void;
  name: string;
}

const ShoutoutForm = ({ onAddShoutout, name }: Props) => {
  const { user } = useContext(AuthContext);

  const [to, setTo] = useState(name);
  const [from, setFrom] = useState(user?.displayName || "");
  const [text, setText] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const submitHandler = (e: FormEvent): void => {
    e.preventDefault();
    const shoutout: Shoutout = {
      to,
      from,
      text,
      ...(user?.photoURL ? { avatar: user.photoURL } : {}), // this is called the optional chaining operator
    };
    const files = fileInputRef.current?.files;
    if (files && files[0]) {
      const file = files[0];
      const storageRef = ref(storage, file.name);
      uploadBytes(storageRef, file).then((snapshot) => {
        //uploads the image
        getDownloadURL(snapshot.ref).then((url) => {
          //then downloads the url
          shoutout.image = url;
          onAddShoutout(shoutout);
        });
      });
    } else {
      onAddShoutout(shoutout);
    }
    setTo("");
    setFrom("");
    setText("");
    formRef.current?.reset(); //this function cannot clear state
  };

  return (
    <form
      ref={formRef}
      className="ShoutoutForm"
      onSubmit={(e) => submitHandler(e)}
    >
      <label htmlFor="to">To</label>
      <input
        type="text"
        name="to"
        id="to"
        value={to}
        onChange={(e) => setTo(e.target.value)}
      />
      <label htmlFor="from">From</label>
      <input
        type="text"
        name="from"
        id="from"
        value={from}
        disabled
        onChange={(e) => setFrom(e.target.value)}
      />
      <label htmlFor="text">Shoutout</label>
      <textarea
        name="text"
        id="text"
        cols={30}
        rows={10}
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <input ref={fileInputRef} type="file" />
      <button>Submit Shoutout!</button>
    </form>
  );
};

export default ShoutoutForm;

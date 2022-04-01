import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { signInWithGoogle } from "../firebaseConfig";
import QueryStringParams from "../models/QueryStringParam";
import Shoutout from "../models/Shoutout";
import {
  addShoutout,
  deleteShoutout,
  getShoutouts,
} from "../services/shoutoutService";
import Card from "./Card";
import "./HomeRoute.css";
import ShoutoutForm from "./ShoutoutForm";

const HomeRoute = () => {
  const { user } = useContext(AuthContext);
  const [shoutouts, setShoutouts] = useState<Shoutout[]>([]);

  const [searchParams] = useSearchParams();
  const to: string | null = searchParams.get("to");

  const queryStringParams: QueryStringParams = {
    ...(to ? { to } : {}),
  };

  const getAndSetShoutouts = () => {
    getShoutouts({}).then((response) => {
      setShoutouts(response);
    });
  };

  const addShoutoutHandler = (shoutout: Shoutout): void => {
    addShoutout(shoutout).then(() => {
      getAndSetShoutouts();
    });
  };

  const deleteShoutoutHandler = (id: string): void => {
    deleteShoutout(id).then(() => {
      getAndSetShoutouts();
    });
  };

  useEffect(() => {
    //mayhap the useEffect be the first thing you put here, to see if things work at all here
    getShoutouts({}).then((response) => {
      //   console.log(response);//should just see entire array if getShoutouts is an empty object
      setShoutouts(response);
    });
  }, [to]); // useEffect takes in a callback function and a dependency list

  return (
    <div className="HomeRoute">
      <h2>All Shoutouts</h2>
      {user ? (
        <ShoutoutForm onAddShoutout={addShoutoutHandler} name="" />
      ) : (
        <div>
          <p>Sign in to leave a shoutout</p>
          <button onClick={signInWithGoogle}>Sign In</button>
        </div>
      )}

      <ul>
        {shoutouts.map((shoutout) => {
          return (
            <Card
              key={shoutout._id}
              shoutout={shoutout}
              onDeleteShoutout={deleteShoutoutHandler}
            />
          );
        })}
      </ul>
    </div>
  ); //ask about what the key prop is for later.
}; //on the .map return, the shoutout on left of = means thats the property of the card which needs to be passed down as a prop on the card
//remember to pass down props here in their respective return tags to be caught in the Props in their component

export default HomeRoute;

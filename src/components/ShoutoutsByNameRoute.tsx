import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import QueryStringParams from "../models/QueryStringParam";
import Shoutout from "../models/Shoutout";
import {
  addShoutout,
  deleteShoutout,
  getShoutouts,
} from "../services/shoutoutService";
import Card from "./Card";
import ShoutoutForm from "./ShoutoutForm";
import "./ShoutoutsByNameRoute.css";

const ShoutoutsByNameRoute = () => {
  const [shoutouts, setShoutouts] = useState<Shoutout[]>([]);

  const name: string | undefined = useParams().name; //to search by the name NOT id

  const getAndSetShoutouts = (params: QueryStringParams): void => {
    getShoutouts(params).then((response) => {
      setShoutouts(response);
    });
  };

  const addShoutoutHandler = (shoutout: Shoutout): void => {
    addShoutout(shoutout).then(() => {
      getAndSetShoutouts({ to: name });
    });
  };

  const deleteShoutoutHandler = (id: string): void => {
    deleteShoutout(id).then(() => {
      getAndSetShoutouts({ to: name });
    });
  };

  useEffect(() => {
    getAndSetShoutouts({ to: name });
  }, [name]);

  return (
    <div className="ShoutoutsByNameRoute">
      <h2>Shoutouts By {name}</h2>
      <Link to="/">back to all Shoutouts</Link>
      <ShoutoutForm onAddShoutout={addShoutoutHandler} name={name!} />
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
  ); //name! in the name prop implies that the name will always be truthy
};

export default ShoutoutsByNameRoute;

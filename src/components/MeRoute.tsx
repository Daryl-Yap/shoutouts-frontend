import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import Shoutout from "../models/Shoutout";
import { deleteShoutout, getShoutouts } from "../services/shoutoutService";
import Card from "./Card";
import "./MeRoute.css";

const MeRoute = () => {
  const { user } = useContext(AuthContext);
  const [shoutouts, setShoutouts] = useState<Shoutout[]>([]);
  const navigate = useNavigate();

  const deleteShoutoutHandler = (id: string): void => {
    deleteShoutout(id).then(() => {
      getShoutouts({ me: user?.displayName! }).then((response) => {
        setShoutouts(response);
      });
    });
  };

  useEffect(() => {
    if (user) {
      getShoutouts({ me: user.displayName! }).then(
        //the user is in the If, so we can say displayname! to assure it will be there
        (response) => {
          setShoutouts(response);
        }
      );
    } else {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="MeRoute">
      <ul>
        {shoutouts.map((shoutout) => (
          <Card
            key={shoutout._id}
            shoutout={shoutout}
            onDeleteShoutout={deleteShoutoutHandler}
          />
        ))}
      </ul>
    </div>
  );
};

export default MeRoute;

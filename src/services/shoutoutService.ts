import axios from "axios";
import QueryStringParams from "../models/QueryStringParam";
import Shoutout from "../models/Shoutout";

export const baseURL: string = process.env.REACT_APP_API_URL || "";

export const getShoutouts = async (
  params: QueryStringParams
): Promise<Shoutout[]> => {
  return (await axios.get(baseURL, { params })).data;
}; //look to the baseURL and also any querystring params that come after it

export const addShoutout = async (shoutout: Shoutout): Promise<Shoutout> => {
  return (await axios.post(baseURL, shoutout)).data;
}; //the shoutout here is the req.body in the router

export const deleteShoutout = async (id: string): Promise<void> => {
  return (await axios.delete(`${baseURL}/${encodeURIComponent(id)}`)).data;
};

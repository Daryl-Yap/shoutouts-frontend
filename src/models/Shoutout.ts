export default interface Shoutout {
  _id?: string;
  to: string;
  from: string;
  text: string;
  avatar?: string;
  image?: string; //string representations of the image and avatar pic
}

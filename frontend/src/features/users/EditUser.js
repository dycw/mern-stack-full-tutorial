import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import EditUserForm from "./EditUserForm";
import { selectUserById } from "./usersApiSlice";

export default function EditUser() {
  const { id } = useParams();
  const user = useSelector((state) => selectUserById(state, id));
  return user ? <EditUserForm user={user} /> : <p>Loading...</p>;
}

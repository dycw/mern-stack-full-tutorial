import PulseLoader from "react-spinners/PulseLoader";
import EditUserForm from "./EditUserForm";
import { useGetUsersQuery } from "./usersApiSlice";

import { useParams } from "react-router-dom";

export default function EditUser() {
  const { id } = useParams();
  const { user } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[id],
    }),
  });
  if (!user) {
    return <PulseLoader color={"#FFF"} />;
  }
  return <EditUserForm user={user} />;
}

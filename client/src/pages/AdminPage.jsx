import { useContext, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import { AdminContext } from "../AdminContext.jsx";
import HostsPage from "./HostsPage.jsx";
import TenantsPage from "./TenantsPage.jsx";
import UsersPage from "./UsersPage.jsx";

export default function AdminPage() {
  const [redirect, setRedirect] = useState(false);
  const { ready, admin, setAdmin } = useContext(AdminContext);

  let { subpage } = useParams();

  if (subpage === undefined) {
    subpage = "users";
  }
  
  if (!ready) {
    return "Loading...";
  }

  async function logout() {
    await axios.post("/logout");
    setAdmin(null);
    setRedirect(true);
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div>
      {subpage === "users" && <UsersPage />}
      <div className="text-center ">
        Logged in as {admin.username} ({}) <br />
        <button onClick={logout} className="primary max-w-xs mt-10">
            {" "}
            Logout{" "}
        </button>
      </div>
      {subpage === "hosts" && <HostsPage />}
      {subpage === "tenants" && <TenantsPage />}
    </div>
  );
}

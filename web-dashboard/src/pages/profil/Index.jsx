import { Button, TextInput } from "@mantine/core";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../middleware/DashboardMiddleware";
import { useUpdateProfil } from "../../utils/fetch/useProfil";
export default function ProfilPage() {
  const { updateData } = useUpdateProfil();
  const { user } = useContext(UserContext);
  const [showFormEdit, setShowFormEdit] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    setForm({
      email: user.email,
      password: "",
    });
  }, []);
  const handleUpdate = (event) => {
    event.preventDefault();
    updateData(form);
    window.location.reload();
  };

  return (
    <div className="w-full p-4 bg-white">
      <div className="w-[100px] h-[100px] bg-slate-200 rounded-full"></div>
      <p className="mt-4">Email {user.email}</p>
      <p>Password *****</p>
      <Button
        className="mt-4"
        color={"green"}
        onClick={() => setShowFormEdit(!showFormEdit)}
      >
        Ubah Profil
      </Button>
      {showFormEdit ? (
        <form action="" className="w-full mt-4" onSubmit={handleUpdate}>
          <div className="my-4">
            <TextInput
              label="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div className="my-4">
            <TextInput
              label="Ubah Password"
              onChange={(e) =>
                setForm({ ...form, password: e.target.password })
              }
            />
          </div>
          <div className="my-4">
            <Button type="submit">Save</Button>
          </div>
        </form>
      ) : null}
    </div>
  );
}

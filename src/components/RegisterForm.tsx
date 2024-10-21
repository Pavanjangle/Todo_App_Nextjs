import { emailValidation } from "@/utlis/dataValidation";
import { useUserStore } from "@/utlis/useUserStore";
import { Button, TextInput } from "@mantine/core";
import { useState } from "react";

const RegisterForm: React.FC = () => {
  const { setUser, clearUser, user } = useUserStore();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [errors, setErrors] = useState([]);

  const handleSubmit =  (e: React.FormEvent) => {
    e.preventDefault();
 emailValidation.validate({'email':email}).then(() => {
  setUser({ name, email });
  setErrors([]);
})
.catch((err) => {
  setErrors(err.errors); 
});
  };
  const handleLogout = () => {
    clearUser();
    setName("");
    setEmail("");
  };

  return (
    <div className="p-4 bg-gray-100 rounded shadow-md w-full mb-6">
      {!user ? (
        <>
          <h2 className="text-xl font-bold mb-4">Register</h2>
          <form onSubmit={handleSubmit}>
            <TextInput
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mb-4 "
            />
            <TextInput
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mb-4 "
            />
            {(errors && errors.length) ? (
              <p className="text-red-400">{errors[0]}</p>
            ): null}
            <Button type="submit" className="bg-blue-500 hover:bg-blue-600 w-full">
              Submit
            </Button>
          </form>
        </>
      ) : (
        <div>
          <h2 className="text-xl font-bold mb-4">Welcome, {user.name}!</h2>
          <p className="font-bold" >Email : {user.email}</p>

          <Button onClick={handleLogout} color="red" className="bg-red-500 hover:bg-red-600 w-full mt-2" >
            Logout
          </Button>
        </div>
      )}
    </div>
  );
};

export default RegisterForm;

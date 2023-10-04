import React from "react";

export default function Signup() {
  return (
    <div className="form-container sign-in w-full flex-col-center">
      <form className=" flex-col-center w-full">
        <h1>Sign Up</h1>
        <input type="email" placeholder="Email" className="w-70 p-2" />
        <input type="password" placeholder="Password" className="w-70 p-2" />
        <a href="#">Alredy Signup</a>
        <button>Create An Account</button>
      </form>
    </div>
  );
}

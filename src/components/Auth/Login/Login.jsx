import React from "react";

export default function Login() {
  return (
    <div className="form-container sign-in w-full flex-col-center">
      <form className=" flex-col-center w-full">
        <h1>Sign In</h1>
        <input type="email" placeholder="Email" className="w-70 p-2" />
        <input type="password" placeholder="Password" className="w-70 p-2" />
        <a href="#">Create An Account?</a>
        <button>Sign In</button>
      </form>
    </div>
  );
}

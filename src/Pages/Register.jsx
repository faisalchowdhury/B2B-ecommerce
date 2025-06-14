import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import Lottie from "lottie-react";
import registerAnimation from "../assets/Lottie-animation/register.json";

const Register = () => {
  const { registerUser, updateUserProfile, loginWithGoogle } =
    useContext(AuthContext);

  const navigate = useNavigate();

  const handleRegisterUser = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const { email, password, ...restField } = Object.fromEntries(
      formData.entries()
    );

    const regEx = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    if (!regEx.test(password)) {
      toast.error(
        "Must have an Uppercase letter one Lowercase letter and Length must be at least 6 character"
      );
    } else {
      registerUser(email, password).then((result) => {
        if (result.user) {
          updateUserProfile(restField).then(() => {
            toast.success("Account Created Successfully");
            navigate("/");
          });
        }
      });
    }
  };

  const googleLogin = () => {
    loginWithGoogle()
      .then((result) => {
        toast.success("Successfully logged in");
        navigate("/");
      })
      .catch((err) => console.dir(err));
  };
  return (
    <>
      <title>Register</title>
      <div className="md:flex justify-evenly">
        <title>Register</title>
        <div className="flex justify-center items-center">
          <Lottie
            animationData={registerAnimation}
            style={{
              width: "400px",
            }}></Lottie>
        </div>
        <div className="">
          <div className="lg:w-xl   p-8 space-y-3 rounded-xl dark:bg-gray-50 dark:text-gray-800 my-10 mx-auto">
            <h1 className="text-2xl font-bold text-center">Register Here</h1>
            <form onSubmit={handleRegisterUser} className="space-y-6">
              <div className="grid grid-cols-2 gap-5">
                <div className="space-y-1 text-sm">
                  <label className="block dark:text-gray-600">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Write Your Fullname"
                    className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600 border border-slate-500"
                  />
                </div>

                <div className="space-y-1 text-sm">
                  <label className="block dark:text-gray-600">Email</label>
                  <input
                    type="text"
                    name="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600 border border-slate-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div className="space-y-1 text-sm">
                  <label className="block dark:text-gray-600">Photo Url</label>
                  <input
                    type="text"
                    name="photo_url"
                    placeholder="Photo Url"
                    className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600 border border-slate-500"
                  />
                </div>
                <div className="space-y-1 text-sm">
                  <label
                    htmlFor="password"
                    className="block dark:text-gray-600">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600 border border-slate-500"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="block w-full p-3 text-center rounded-sm dark:text-gray-50 bg-primary">
                Register
              </button>
            </form>
            <div className="flex items-center pt-4 space-x-1">
              <div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
              <p className="px-3 text-sm dark:text-gray-600">
                Login with social accounts
              </p>
              <div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
            </div>
            <div className="flex justify-center space-x-4">
              {/* Google */}
              <button
                onClick={googleLogin}
                className="btn bg-white w-full text-black border-[#e5e5e5]">
                <svg
                  aria-label="Google logo"
                  width="16"
                  height="16"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512">
                  <g>
                    <path d="m0 0H512V512H0" fill="#fff"></path>
                    <path
                      fill="#34a853"
                      d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path>
                    <path
                      fill="#4285f4"
                      d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path>
                    <path
                      fill="#fbbc02"
                      d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path>
                    <path
                      fill="#ea4335"
                      d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path>
                  </g>
                </svg>
                Login with Google
              </button>
            </div>
            <p className="text-lg text-center sm:px-6 dark:text-gray-600">
              Already have an account?
              <Link to={"/login"} className="underline dark:text-gray-800">
                Login Here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;

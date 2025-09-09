const LoginForm = () => {
  return (
    <div className="grid grid-cols-2  items-center justify-center px-15 ">
      <div className="flex flex-col items-center p-20 h-fit m-10  justify-center gap-5 bg-gradient-to-br from-white via-gray-50 to-blue-50 shadow-md shadow-[#10172a] rounded-2xl">
        <form className="w-full" method="post">
          <div className="flex flex-col w-full items-center justify-center gap-8">
            <p className="text-3xl font-bold font-sans text-[#10172a]">
              Welcome Back
            </p>
            {/* {info && <h3 className={` text-red-600 font-sans`}>{info}</h3>} */}

            <input
              type="email"
              className="h-10 w-full disabled:bg-blue-100 py-2 px-4 border-1 rounded-md border-[#10172a]"
              placeholder="example@gmail.com"
              disabled={status === "submitting"}
              readOnly
              required
              name="email"
            />

            <input
              type="password"
              className="h-10 w-full disabled:bg-blue-100 py-2 px-4 border-1 rounded-md"
              placeholder="password"
              disabled={status === "submitting"}
              required
              name="password"
            />
            <button
              disabled={status === "submitting"}
              className=" text-white text-center w-full disabled:bg-gray-500 bg-[#10172a] hover:from-blue-950 transition duration-300 hover:animate-none hover:to-blue-950 hover:border-2 hover:border-white shadom-md p-[10px] rounded-md font-bold cursor-pointer"
            >
              {status == "idle" ? "Login" : "Submitting..."}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;

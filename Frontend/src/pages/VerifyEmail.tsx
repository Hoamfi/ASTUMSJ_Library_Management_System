import logo from "../assets/logo.png";

interface Props {
  email: string;
}

const VerifyEmail = ({ email }: Props) => {
  const otp: string[] = [];

  return (
    <div className="flex flex-col items-center m-5 h-screen relative">
      <img src={logo} width={90} alt="" />
      <h1
        style={{ fontFamily: "'Libre Baskerville', serif" }}
        className="text-2xl font-semibold my-2"
      >
        Verify your email
      </h1>
      <div className="mt-5">
        <h3>
          we've sent you a verification code to <strong>{email}</strong>
        </h3>
        <div className="mt-5">
          <form onSubmit={() => {}} className="flex flex-col">
            <div className="py-2 self-center">
              <label htmlFor="otp" className="block mb-2  text-sm font-medium">
                Enter code
              </label>
              <span>
                <input
                  type="text"
                  className="border-2 border-gray-300 m-1 px-2 py-2 w-8 h-12 rounded-lg"
                  id="otp1"
                  maxLength={1}
                  required
                  onChange={(e) => (otp[0] = e.target.value)}
                />
                <input
                  type="text"
                  className="border-2 border-gray-300 m-1 px-2 py-2 w-8 h-12 rounded-lg"
                  id="otp2"
                  maxLength={1}
                  required
                  onChange={(e) => (otp[1] = e.target.value)}
                />
                <input
                  type="text"
                  className="border-2 border-gray-300 m-1 px-2 py-2 w-8 h-12 rounded-lg"
                  id="otp3"
                  maxLength={1}
                  required
                  onChange={(e) => (otp[2] = e.target.value)}
                />
                <input
                  type="text"
                  className="border-2 border-gray-300 m-1 px-2 py-2 w-8 h-12 rounded-lg"
                  id="otp4"
                  maxLength={1}
                  required
                  onChange={(e) => (otp[3] = e.target.value)}
                />
                <input
                  type="text"
                  className="border-2 border-gray-300 m-1 px-2 py-2 w-8 h-12 rounded-lg"
                  id="otp5"
                  maxLength={1}
                  required
                  onChange={(e) => (otp[4] = e.target.value)}
                />
                <input
                  type="text"
                  className="border-2 border-gray-300 m-1 px-2 py-2 w-8 h-12 rounded-lg"
                  id="otp6"
                  maxLength={1}
                  required
                  onChange={(e) => (otp[5] = e.target.value)}
                />
              </span>
            </div>
          </form>

          <div className="flex justify-end">
            <button
              className="py-2 px-2 bg-black rounded-lg text-white font-sans hover:bg-black/80 cursor-pointer"
              onClick={() => console.log({ OTP: otp.join("") })}
            >
              Verify
            </button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-8">
        <p>&copy; 2025 ASTUMSJ library</p>
      </div>
    </div>
  );
};

export default VerifyEmail;

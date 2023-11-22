import '../../css/login/Login.css';

function Login() {
  return (
    <div className='flex flex-col lg:flex-row relative h-screen'>
      <img
        className='object-cover lg:w-1/2 googleIcon.svg'
        src='loginImage.png'
        alt=''
      />
      <div className='absolute top-10 left-10 bg-white p-1 rounded-md'>
        <img src='ivovasi-Logo.png' alt='' />
      </div>
      <div className='absolute top-[50%] h-1/2 lg:h-full lg:static flex flex-col justify-center  bg-white px-12 w-full lg:w-1/2 py-10'>
        <h1 className='text-2xl px-3 font-semibold '>Login</h1>
        <form className='py-5 px-3 pr-8 flex flex-col gap-4' action=''>
          <input type='email' name='' id='' placeholder='Email' />
          <input type='password' name='' placeholder='Password' id='' />

          <button className='text-center my-5 px-12 py-2 text-white bg-black border w-2/3 border-blue-700 rounded-sm'>
            Login
          </button>
          <h1>
            or Quick Sign-up with :
            <span>
              <img className='inline px-3' src='googleIcon.svg' alt='' />
            </span>
          </h1>
        </form>
      </div>
    </div>
  );
}
export default Login;

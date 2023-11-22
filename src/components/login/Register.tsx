import '../../css/login/Login.css';

function Register() {
  return (
    <div className='h-screen flex justify-center items-center bg-zinc-700'>
      <div className='flex relative'>
        <img
          className='object-fit w-1/2 googleIcon.svgblock'
          src='registerImage.png'
          alt=''
        />
        <div className='absolute top-10 left-10 bg-white p-1 rounded-md'>
          <img src='ivovasi-Logo.png' alt='' />
        </div>
        <div className='flex flex-col  bg-white px-10 w-full lg:w-1/2 py-10'>
          <h1 className='text-2xl px-3 font-semibold '>Register</h1>
          <form className='py-4 px-3 pr-8 flex flex-col gap-4' action=''>
            <input type='text' name='' id='' placeholder='Full Name' />
            <input type='email' name='' id='' placeholder='Email' />
            <input type='text' name='' placeholder='Company' id='' />
            <input
              type='password'
              name=''
              placeholder='Password(6 digits at least, case sensitive)'
              id=''
            />
            <input
              type='password'
              name=''
              placeholder='Confirm Password'
              id=''
            />
            <div className='relative '>
              <div className='w-36 h-36 bg-gray-100 cursor-pointer flex justify-center items-center border-2 border-gray-200'>
                <div className='text-center space-y-2'>
                  <p>+</p>
                  <p>Upload</p>
                </div>
                <input className='hidden' type='file' name='' id='' />
              </div>
              <div className='absolute bottom-0 left-40 flex justify-center '>
                <img
                  className=' h-6 aspect-square inline'
                  src='fileUpload.svg'
                  alt=''
                />
                <div className='flex gap-1'>
                  <span className='pl-2 text-blue-500'>Image.png</span>
                  <span> Uploaded</span>
                </div>
              </div>
            </div>
            <button className='text-center my-5 px-12 py-2 text-white bg-black border w-2/3 border-blue-700 rounded-sm'>
              Register
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
    </div>
  );
}
export default Register;

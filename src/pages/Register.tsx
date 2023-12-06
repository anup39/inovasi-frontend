import { Checkbox } from '@mui/material';
import '../css/login/Login.css';
import { Link } from 'react-router-dom';

function Register() {
  return (
    <div className=' flex '>
      <div className='w-3/4 '>
        <img className='scale-75 pt-4 pl-5' src='inovasilogo.svg' alt='' />
        <h2 className='text-footerHeading text-center font-bold'>Welcome!</h2>
        <h1 className='text-[24px] text-center font-bold'>Create an account</h1>
        <div className='bg-lightGray mx-11 mt-6 mb-[50px]'>
          <div className='flex justify-center pt-12'>
            <label className='w-24 h-24 lg:w-36 lg:h-36 bg-gray-100 cursor-pointer flex justify-center items-center border-2 border-gray-200 rounded-full'>
              <div className='text-center space-y-2'>
                <p>+</p>
                <p>Upload</p>
              </div>
            </label>
          </div>
          <form className=' flex flex-col pl-10 '>
            <label className='font-semibold mb-2'> Name </label>
            <input placeholder='Full name' className='rounded-lg' />
            <label className='font-semibold mb-2 mt-4'> Company </label>
            <input placeholder='Company Name' className='rounded-lg' />
            <label className='font-semibold mb-2 mt-4'> Email </label>
            <input placeholder='you@company.com' className='rounded-lg' />
            <label className='font-semibold mb-2 mt-4'> Phone Number </label>
            <input placeholder='123456789' className='rounded-lg' />
            <label className='font-semibold mb-2 mt-4'> Confirm Passwod </label>
            <input placeholder='Confirm Password' className='rounded-lg' />
            <div className='flex items-center pt-8'>
              <Checkbox />
              <p>
                I agree to the{' '}
                <span
                  style={{
                    background:
                      'linear-gradient(90deg, #02C685 0%, #8ADF5E 97.40%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Terms & condition
                </span>{' '}
                and{' '}
                <span
                  style={{
                    background:
                      'linear-gradient(90deg, #02C685 0%, #8ADF5E 97.40%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Privacy Policy
                </span>
              </p>
            </div>
            <button className='mr-[60px] h-[40px] text-white mt-4 rounded-sm bg-gradient-to-r from-footerHeading to-parrot'>
              Confirm
            </button>
            <button className='border mt-4 mr-[60px] h-[50px]'>
              <div className='flex justify-center'>
                <img
                  className='inline px-3'
                  src='public\googleIcon.svg'
                  alt=''
                />
                <h1 className='font-bold'> Continue with Google </h1>
              </div>
            </button>
            <h1 className='my-8'>
              Already have an account?{' '}
              <Link to='/login' className='text-footerHeading'>
                Log in
              </Link>
            </h1>
            <hr className='border-t-2 border-gray-200 mb-[30px]  mr-[60px]'></hr>
          </form>
        </div>
      </div>
      <div className='flex-shrink-0 w-1/4 bg-gradient-to-r from-footerHeading to-parrot'></div>
    </div>
  );
}
export default Register;
{
}
//  <div className="flex flex-col lg:flex-row relative h-screen">
//       <img
//         className="object-cover lg:w-1/2  googleIcon.svg"
//         src="registerImage.png"
//         alt=""
//       />
//       <div className="absolute top-10 left-10 bg-white p-1 rounded-md">
//         <img src="inovasilogo.svg" alt="" />
//       </div>
//       <div className="absolute top-56 lg:static flex flex-col  bg-white px-10 w-full lg:w-1/2 py-10">
//         <h1 className="text-2xl px-3 font-semibold ">Register</h1>
//         <form className="py-4 px-3 pr-8 flex flex-col gap-4" action="">
//           <input type="text" name="" id="" placeholder="Full Name" />
//           <input type="email" name="" id="" placeholder="Email" />
//           <input type="text" name="" placeholder="Company" id="" />
//           <input
//             type="password"
//             name=""
//             placeholder="Password(6 digits at least, case sensitive)"
//             id=""
//           />
//           <input type="password" name="" placeholder="Confirm Password" id="" />

//           <div className="relative">
//             <input
//               className="hidden"
//               type="file"
//               name="fileInput"
//               id="fileInput"
//             />
//             <label
//               className="w-24 h-24 lg:w-36 lg:h-36 bg-gray-100 cursor-pointer flex justify-center items-center border-2 border-gray-200"
//               htmlFor="fileInput"
//             >
//               <div className="text-center space-y-2">
//                 <p>+</p>
//                 <p>Upload</p>
//               </div>
//             </label>
//           </div>
//           <button className="text-center my-5 px-12 py-2 text-white bg-black border w-2/3 border-blue-700 rounded-sm">
//             Register
//           </button>
//           <h1>
//             or Quick Sign-up with :
//             <span>
//               <img className="inline px-3" src="public\googleIcon.svg" alt="" />
//             </span>
//           </h1>
//         </form>
//       </div>
//     </div>

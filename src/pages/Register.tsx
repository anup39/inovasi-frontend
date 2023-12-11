import { Checkbox } from '@mui/material';
import '../css/login/Login.css';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import PhoneInput from 'react-phone-number-input';
import flags from 'react-phone-number-input/flags';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function Register() {
  const [phone, setPhone] = useState('');
  return (
    <div className=' flex max-w-[1920px] m-auto'>
      <div className='sm:w-3/4'>
        <img className='scale-75 pt-4 pl-5' src='inovasilogo.svg' alt='' />
        <h2 className='text-footerHeading text-center mt-6 sm:mt-0 font-bold'>
          Welcome!
        </h2>
        <h1 className='text-[24px] text-center font-bold mt-6 sm:mt-0'>
          Create an account
        </h1>
        <div className='bg-lightGray mt-6 mb-[50px] max-w-[300] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[700px] xl:max-w-[750px] 2xl:max-w-[826px] m-auto'>
          <form>
            <div className='flex relative justify-center pt-12 '>
              <input
                type='file'
                accept='image'
                className='border rounded-full w-32 h-32'
              />
              <button
                type='button'
                className='absolute top ml-20 w-10 h-10 rounded-full bottom-1  cursor-pointer bg-lightGray shadow-md '
              >
                <AddAPhotoIcon />
              </button>
            </div>
            <div className='flex flex-col px-[34px] gap-4 sm:gap-1.5'>
              <label className='font-semibold'> Name </label>
              <input placeholder='Full name' className='p-[10px] rounded-md' />
              <label className='font-semibold'> Company </label>
              <input
                placeholder='Company Name'
                className='p-[10px] rounded-md'
              />
              <label className='font-semibold '> Email </label>
              <input
                placeholder='you@company.com'
                className='p-[10px] rounded-sm'
              />
              <label className='font-semibold'> Phone Number </label>
              <PhoneInput
                className=' bg-white'
                flags={flags}
                country={'us'}
                value={phone}
                onChange={(phone: string) => setPhone(phone)}
              />
              <label className='font-semibold'> Confirm Passwod </label>
              <input
                placeholder='Confirm Password'
                className='p-[10px] rounded-sm'
              />
              <div className='flex items-center'>
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
              <button className='mr-[60px] h-[40px] text-white w-full rounded-md bg-gradient-to-r from-footerHeading to-parrot'>
                Confirm
              </button>
              <button className='border w-full h-[50px] rounded-md'>
                <div className='flex justify-center'>
                  <img
                    className='inline px-3'
                    src='public\googleIcon.svg'
                    alt=''
                  />
                  <h1 className='font-bold'> Continue with Google </h1>
                </div>
              </button>
              <h1 className='my-5'>
                Already have an account?{' '}
                <Link to='/login' className='text-footerHeading'>
                  Log in
                </Link>
              </h1>
              <hr className='border-t-2 border-gray-200 mb-[30px]'></hr>
            </div>
          </form>
        </div>
      </div>
      <div className='flex-shrink-0 w-1/4 bg-gradient-to-r from-footerHeading to-parrot sm:block hidden'></div>
    </div>
  );
}
export default Register;

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

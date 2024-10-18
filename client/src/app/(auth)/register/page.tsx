'use client';
import React, { useState } from 'react';
import axios from 'axios'; 

const Register = () => {

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const data = {
        email: email,
        username: username,
        password: password,
        role: 'patient',
      };

      const response = await axios.post(
        'http://localhost:4200/api/v1/auth/register',
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(response.data);
      if (response.status === 201) {
        alert('Register successful !');
        localStorage.setItem('userID', response.data.userID);
        window.location.href = '/digital-card-issuance'; 
      } else {
        alert('Invalid credentials !');
      }
    } catch (error) {
      console.error('Error : ', error);
    }
  };

  return (
    <section className="bg-gray-1 py-10 dark:bg-dark lg:py-[60px]">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="relative mx-auto max-w-[525px] overflow-hidden rounded-lg bg-white px-10 py-16 text-center dark:bg-dark-2 sm:px-12 md:px-[60px]">
              <div className="mb-10 text-center md:mb-16">
                <a href="/#" className="mx-auto inline-block max-w-[160px]">
                  <img
                    src="https://cdn.tailgrids.com/2.0/image/assets/images/logo/logo-primary.svg"
                    alt="logo"
                  />
                </a>
              </div>
              <form onSubmit={handleRegister}>
                <InputBox
                  type="username"
                  name="username"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <InputBox
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <InputBox
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div>
                  <button
                    type="submit"
                    className="w-full p-3 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
                  >
                    Sign Up
                  </button>
                </div>
              </form>

              <a
                href="/#"
                className="mb-2 inline-block text-base text-dark hover:text-primary hover:underline dark:text-white"
              >
                Forget Password?
              </a>
              <p className="text-base text-body-color dark:text-dark-6">
                <span className="pr-0.5">Have an account? </span>
                <a href="/login" className="text-blue-500 font-bold hover:underline">
                 Login
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Register

interface InputBoxProps {
  type: string;
  placeholder: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputBox = ({
  type,
  placeholder,
  name,
  value,
  onChange,
}: InputBoxProps) => {
  return (
    <div className="mb-6">
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:text-black"
      />
    </div>
  );
};
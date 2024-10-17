'use client';
import React, { useState } from 'react';
import axios from 'axios'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const data = {
        email: email,
        password: password,
      };

      const response = await axios.post(
        'http://localhost:4200/api/v1/auth/login',
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.message === 'Login successful') {
        alert('Login successful !');
        // Store the userID in localStorage or sessionStorage
        localStorage.setItem('userID', response.data.user.userID);
        // Redirect to the digital card page without exposing the userID in the URL
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
              <form onSubmit={handleLogin}>
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
                    Login
                  </button>
                </div>
              </form>

              <a
                href="/#"
                className="mb-2 inline-block text-base text-dark hover:text-primary hover:underline dark:text-white"
              >
                Forget Password?
              </a>
                  <p className="text-base text-blue-500 dark:text-dark-6">
                    <span className="pr-0.5">Don't have an account?</span>
                    <a href="/register" className="text-primary font-bold hover:underline">
                      Sign Up
                    </a>
                  </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;

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

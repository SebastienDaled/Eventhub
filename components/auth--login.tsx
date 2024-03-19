import { drupal, getAllUsers } from 'lib/drupal';
import React, { useEffect } from 'react';
import { useState } from 'react';


export function LoginForm () {
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('success');
  
  const [formState, setFormState] = useState({
    username: '',
    password: '',
  });  

  async function handleSubmit(event) {
    event.preventDefault()
    
    const response = await fetch(`/api/auth/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formState,
      }),
    })
    .then((res) => res.json())
    .then((data) => {
      return data;
    })

    console.log(response, 'response');

    if (response.current_user) {
      setMessage('Login successful!');
      setMessageType('success');
      localStorage.setItem('uid', response.uid);
      localStorage.setItem('jwt', response.access_token);
      window.location.assign('/');
    }
    else {
      setMessage(response);
      setMessageType('error');
    }
  }

  return (
   <>
    {message && <div className={`message message--${messageType}`}>{message}</div>}
    <form>
      <div className='form__field'>
        <label htmlFor="username" className='form__label'>Username</label>
        <input type="text" id="username" name="username" onChange={(e) => setFormState({ ...formState, username: e.target.value })} className='form__input'/>
      </div>

      <div className='form__field'>
        <label htmlFor="password" className='form__label'>Password</label>
        <input id="password" type='password' name="password" onChange={(e) => setFormState({ ...formState, password: e.target.value })} className='form__input'/>
      </div>
      
      <button type="submit" className='btn__submit' onClick={handleSubmit}>Submit</button>
    </form>
   </>
  );
};
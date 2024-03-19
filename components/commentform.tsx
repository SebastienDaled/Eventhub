import { set } from 'date-fns';
import { redirect } from 'next/dist/server/api-utils';
import { NextResponse } from 'next/server';
import React, { useEffect } from 'react';
import { useState } from 'react';


export function CommentForm (id) {
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('success');
  const [uid, setUid] = useState('0');

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUid(localStorage.getItem('uid'));
      setFormState({ ...formState, uid: uid });
      console.log(uid, 'uid');
    }
    
  }
  , [uid]);
  
  const [formState, setFormState] = useState({
    entity_id: id.id,
    subject: '',
    comment_body: '',
    uid: uid,
  });  

  async function handleSubmit(event) {
    event.preventDefault()

    if (!formState.subject || !formState.comment_body) {
      setMessage('Please fill in all fields');
      setMessageType('error');
      return;
    }
    
    const response = await fetch(`/api/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formState,
      }),
    }) 
    
    
    if (response.ok) {
      setMessage('Your message has been sent');
      setMessageType('success');

      // reload page to show new comment
      setTimeout(() => {
        location.reload();
      }
      , 200);
    }
    else if (!response.ok) {
      setMessage(response.statusText);
      setMessageType('error');
    }
  }
  
  return (
   <>
    {message && <div className={`message message--${messageType}`}>{message}</div>}
    <form>
      <div className='form__field'>
        <label htmlFor="subject" className='form__label'>Subject</label>
        <input type="text" id="subject" name="subject" onChange={(e) => setFormState({ ...formState, subject: e.target.value })} className='form__input' required/>
      </div>

      <div className='form__field'>
        <label htmlFor="comment_body" className='form__label'>Comment</label>
        <textarea id="comment_body" name="comment_body" onChange={(e) => setFormState({ ...formState, comment_body: e.target.value })} className='form__input' required/>
      </div>
      
      <button type="submit" className='btn__submit' onClick={handleSubmit}>Submit</button>
    </form>
   </>
  );
};
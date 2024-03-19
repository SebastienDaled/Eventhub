import React, { useEffect } from 'react';
import { useState } from 'react';


export function CommentForm (id) {
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('success');
  const [uid, setUid] = useState('0');

  useEffect(() => {
    setUid(localStorage.getItem('uid'));
    setFormState({ ...formState, uid: uid });
    console.log(uid, 'uid');
    
  }
  , []);
  
  const [formState, setFormState] = useState({
    entity_id: id.id,
    subject: '',
    comment_body: '',
    uid: uid,
  });  

  async function handleSubmit(event) {
    event.preventDefault()
    
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
    }
    else if (!response.ok) {
      setMessage('There was an error sending your message');
      setMessageType('error');
    }
  }
  
  return (
   <>
    {message && <div className={`message message--${messageType}`}>{message}</div>}
    <form>
      <div className='form__field'>
        <label htmlFor="subject" className='form__label'>Subject</label>
        <input type="text" id="subject" name="subject" onChange={(e) => setFormState({ ...formState, subject: e.target.value })} className='form__input'/>
      </div>

      <div className='form__field'>
        <label htmlFor="comment_body" className='form__label'>Comment</label>
        <textarea id="comment_body" name="comment_body" onChange={(e) => setFormState({ ...formState, comment_body: e.target.value })} className='form__input'/>
      </div>
      
      <button type="submit" className='btn__submit' onClick={handleSubmit}>Submit</button>
    </form>
   </>
  );
};
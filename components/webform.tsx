import React, { useEffect } from 'react';
import { useState } from 'react';


export function Webform ({ element, id }) {
  const [message, setMessage] = useState('');
  const [massageType, setMessageType] = useState('success');

  const formName = id.toLowerCase().replace(/ /g, '_');
  
  const [formState, setFormState] = useState({
    webform_id: formName,
  });
  
  useEffect(() => {
    Object.keys(element).forEach((key) => {
      if (key !== 'actions') {
        if (element[key]['#type'] === 'checkboxes') {
          setFormState((prevState) => {
            return {
              ...prevState,
              [key]: [],
            };
          });
        } else {
          setFormState((prevState) => {
            return {
              ...prevState,
              [key]: '',
            };
          });
        }
      }
    });
  }, []);
  

  async function handleSubmit(event) {
    event.preventDefault()
    
    const response = await fetch(`/api/webform`, {
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
    }
    else if (!response.ok) {
      setMessage('There was an error sending your message');
      setMessageType('error');
    }
  }

  return (
   <>
    {message && <div className={`message message--${massageType}`}>{message}</div>}
    <form>

      {Object.keys(element).map((fieldName) => {
        const field = element[fieldName];
        return (
          <div key={fieldName} className='form__field'>
            {field['#type'] === 'webform_actions' ? (null) : <label className='form__label'>{field['#title']}</label>}
            
            {field['#type'] === 'textarea' && (
              <textarea placeholder={field["#placeholder"]} onChange={(event) => {
                setFormState((prevState) => {
                  return {
                    ...prevState,
                    [fieldName]: event.target.value,
                  };
                });
              }}/>
              )
            }
            {field['#type'] === 'textfield' && (
              <input type={field["#input_type"]} className='form__input' placeholder={field["#placeholder"]} required={field["#required"]} onChange={(event) => {
                setFormState((prevState) => {
                  return {
                    ...prevState,
                    [fieldName]: event.target.value,
                  };
                });
              }}
              />
              )
            }
            {field['#type'] === 'select' && (
              <select onChange={(event) => {
                setFormState((prevState) => {
                  return {
                    ...prevState,
                    [fieldName]: event.target.value,
                  };
                });
              }} className='form__select'>
                <option selected disabled>Select an option</option>
                {Object.keys(field['#options']).map((option) => {
                  return (
                    <option key={option} value={option}>{option}</option>
                  );
                })}
              </select>
              )
            }


            {field["#type"] === "checkboxes" && (
              Object.keys(field["#options"]).map((option) => {
                return (
                  <div key={option}>
                    <input type="checkbox" id={option} name={option} value={option} onChange={(event) => {
                      setFormState((prevState) => {
                        return {
                          ...prevState,
                          [fieldName]: [...prevState[fieldName], event.target.value],
                        };
                      });
                    }}/>
                    <label htmlFor={option}>{option}</label>
                  </div>
                );
              })
            )}

            {field["#type"] === "radios" && (
              Object.keys(field["#options"]).map((option) => {
                return (
                  <div key={option}>
                    <input type="radio" id={option} name={fieldName} value={option} onChange={(event) => {
                      setFormState((prevState) => {
                        return {
                          ...prevState,
                          [fieldName]: event.target.value,
                        };
                      });
                    }}/>
                    <label htmlFor={option}>{option}</label>
                  </div>
                );
              })
            )}
          </div>
        );
      })}
      <button type="submit" className='btn__submit' onClick={handleSubmit}>Submit</button>
    </form>
   </>
  );
};
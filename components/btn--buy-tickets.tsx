import { useRef, useState } from 'react';

export function BtnTickets({ node_id}) {
  const [tickets, setTickets] = useState("1");
  const [errorMessages, setErrorMessages] = useState(null);
  const [successMessages, setSuccessMessages] = useState(null);

  const inputRef = useRef(null);
  
  const buyTickets = () => {
    const cart = localStorage.getItem('shoppingCart');
    const shoppingCart = JSON.parse(cart);
    const newCart = [...shoppingCart, {
      tickets: parseInt(tickets),
      id: node_id,
    }]

    // newcart has items with the same id, so we need to merge them
    const mergedCart = newCart.reduce((acc, item) => {
      const existingItem = acc.find((i) => i.id === item.id);
      if (existingItem) {
        const number = parseInt(item.tickets);
        
        if (number + existingItem.tickets <= 5) {
          existingItem.tickets += number;
          setSuccessMessages(`Successfully added ${number} tickets.`);
          setErrorMessages(null);
        } else {
          setErrorMessages(`You can't buy more than 5 tickets, you already have ${existingItem.tickets} tickets for this event.`);
          setSuccessMessages(null);
        }


        
      } else {
        setSuccessMessages(`Successfully added tickets.`);
        acc.push(item);
      }
      return acc;
    }, []);

    localStorage.setItem('shoppingCart', JSON.stringify(mergedCart));
    window.dispatchEvent(new Event("storage"));
  }

  return (
    <div>
      <h3>Buy Tickets</h3>
      <button className="btn__buy" onClick={() => buyTickets()}>Buy Tickets</button>

      <input ref={inputRef} type="number" className="input__buy" defaultValue={1} min={1} max={5} onChange={() =>{
        setTickets(inputRef.current.value);
      }}/>

      {errorMessages && <p className="error__message">{errorMessages}</p>}
      {successMessages && <p className="success__message">{successMessages}</p>}
    </div>
  );
};
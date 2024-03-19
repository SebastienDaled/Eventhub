import React, { useEffect } from 'react';
import { useState } from 'react';
import { cookies } from 'next/headers';


export function AccountInfo () {
  const jwt = cookies().get('token');


  console.log('jwt jjjjjjjj', jwt);
  return (
   <>
   </>
  );
};